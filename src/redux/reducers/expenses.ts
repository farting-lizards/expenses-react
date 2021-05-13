import { Expense } from '../../types';
import { ADD_EXPENSE, GET_EXPENSES } from '../actions';
import { createSlice, createAsyncThunk, Action, AnyAction } from '@reduxjs/toolkit';
import { client } from '../../utilities/client';
import { mockExpenses } from '../../utilities/mockData';
import { act } from 'react-dom/test-utils';
import { RootState } from '../store';

export enum Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

const now = new Date();
const FIRST_DAY_OF_MONTH = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
const LAST_DAY_OF_MONTH = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

const initialState = {
    expenses: [] as Expense[],
    status: Status.IDLE,
    error: null,
    fromDate: FIRST_DAY_OF_MONTH,
    toDate: LAST_DAY_OF_MONTH,
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await client.get('/api/expenses');
    return response;
});

export const addExpense = createAsyncThunk('expenses/addExpense', async (expense) => {
    const response = await client.post('/api/expenses', { expense });
    return response.expense;
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expenseUpdated(state, action) {
            let existingExpense = state.expenses.find((expense) => expense.id === action.payload.id);
            if (existingExpense) {
                existingExpense = {
                    ...existingExpense,
                    ...action.payload,
                };
            }
        },
        updateFromDate(state, action: { type: string; payload: string }) {
            console.log('Changing from date ', action.payload);
            state.fromDate = action.payload;
        },
        updateToDate(state, action: { type: string; payload: string }) {
            console.log('Changing to date ', action.payload);
            state.toDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase('expenses/fetchExpenses/pending', (state, action) => {
            state.status = Status.LOADING;
        });
        builder.addCase('expenses/fetchExpenses/fulfilled', (state, action: AnyAction) => {
            state.status = Status.COMPLETED;
            state.expenses = state.expenses.concat(action.payload);
        });
        builder.addCase('expenses/fetchExpenses/rejected', (state, action: AnyAction) => {
            state.status = Status.FAILED;
            state.error = action.error.message;
        });
        builder.addCase('expenses/addExpense/fulfilled', (state, action: AnyAction) => {
            state.expenses.push(action.payload);
        });
    },
});

export const { expenseUpdated, updateFromDate, updateToDate } = expensesSlice.actions;

export default expensesSlice.reducer;

export const selectAllExpenses = (state: RootState): Expense[] => state.expenses.expenses;

export const selectExpensesInRange = (state: RootState): Expense[] => {
    const allExpenses = selectAllExpenses(state);
    return allExpenses.filter(
        (expense) =>
            new Date(expense.timestamp) >= new Date(state.expenses.fromDate) &&
            new Date(expense.timestamp) <= new Date(state.expenses.toDate)
    );
};
