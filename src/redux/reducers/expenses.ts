import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Expense, ExpenseToReview, NewExpense, Summary } from '../../types';
import { client } from '../../utilities/client';
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

    expensesToReview: [] as ExpenseToReview[],
    importExpensesStatus: Status.IDLE,
    latestImportedExpenseCount: 0,
    importExpensesError: null,

    expensesToReviewCount: 0,
    expensesToReviewCountStatus: Status.IDLE,
    expensesToReviewCountError: null,

    fromDate: FIRST_DAY_OF_MONTH,
    toDate: LAST_DAY_OF_MONTH,
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await client.get('/api/expenses');
    return response;
});

export const fetchExpensesToReviewCount = createAsyncThunk('expenses/fetchExpensesToReviewCount', async () => {
    const response = await client.get('/api/expenses-in-review/count');
    return response;
});

export const importExpenses = createAsyncThunk(
    'expenses/importExpenses',
    async (payload: { fromDate: string; toDate: string }, thunkApi) => {
        const response = await client.get(`/api/expenses-in-review/discover?fromDate=${payload.fromDate}&toDate=${payload.toDate}`);
        thunkApi.dispatch(fetchExpensesToReviewCount());
        return response;
    }
);

export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async (payload: { expense: NewExpense }): Promise<Expense> => {
        const response = await client.post('/api/expenses', payload.expense);
        return response;
    }
);

export const editExpense = createAsyncThunk(
    'expenses/editExpense',
    async (payload: { expense: NewExpense; id: number }): Promise<Expense> => {
        const response = await client.put(`/api/expenses/${payload.id}`, payload.expense);
        return response;
    }
);

export const deleteExpense = createAsyncThunk(
    'expenses/deleteExpense',
    async (payload: { id: number }): Promise<number> => {
        const response = await client.delete(`/api/expenses/${payload.id}`);
        return response;
    }
);

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
            state.fromDate = action.payload;
        },
        updateToDate(state, action: { type: string; payload: string }) {
            state.toDate = action.payload;
        },
        resetImportExpenseState(state) {
            state.importExpensesError = null;
            state.importExpensesStatus = Status.IDLE;
        },
    },
    extraReducers: (builder) => {
        builder.addCase('expenses/fetchExpenses/pending', (state) => {
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

        builder.addCase('expenses/importExpenses/pending', (state) => {
            state.importExpensesStatus = Status.LOADING;
        });
        builder.addCase('expenses/importExpenses/fulfilled', (state, action: AnyAction) => {
            state.importExpensesStatus = Status.COMPLETED;
            state.latestImportedExpenseCount = action.payload;
        });
        builder.addCase('expenses/importExpenses/rejected', (state, action: AnyAction) => {
            state.importExpensesStatus = Status.FAILED;
            state.importExpensesError = action.error.message;
        });

        builder.addCase('expenses/fetchExpensesToReviewCount/pending', (state) => {
            state.expensesToReviewCountStatus = Status.LOADING;
        });
        builder.addCase('expenses/fetchExpensesToReviewCount/fulfilled', (state, action: AnyAction) => {
            state.expensesToReviewCountStatus = Status.COMPLETED;
            state.expensesToReviewCount = action.payload;
        });
        builder.addCase('expenses/fetchExpensesToReviewCount/rejected', (state, action: AnyAction) => {
            state.expensesToReviewCountStatus = Status.FAILED;
            state.expensesToReviewCountError = action.error.message;
        });

        builder.addCase('expenses/addExpense/fulfilled', (state, action: AnyAction) => {
            state.expenses.unshift(action.payload);
        });
        builder.addCase('expenses/editExpense/fulfilled', (state, action: AnyAction) => {
            state.expenses = state.expenses.map((expense) => (expense.id === action.payload.id ? action.payload : expense));
        });
        builder.addCase('expenses/deleteExpense/fulfilled', (state, action: AnyAction) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        });
    },
});

export const { expenseUpdated, updateFromDate, updateToDate, resetImportExpenseState } = expensesSlice.actions;

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

export const selectAmountInEuros = (state: RootState): number => {
    const expenses = selectExpensesInRange(state);
    const total = expenses.reduce((acc, expense) => {
        if (expense.currency === 'CHF') {
            return +(acc + chfToEuro(expense.amount)).toFixed(2);
        } else {
            return +(acc + expense.amount).toFixed(2);
        }
    }, 0);
    return total;
};

export const selectSummary = (state: RootState): Summary => {
    const expenses = selectExpensesInRange(state);
    const summary = expenses.reduce(
        (acc: Summary, expense: Expense) => {
            const amount = expense.currency === 'EUR' ? expense.amount : chfToEuro(expense.amount);
            if (expense.account.name === 'wise david' || expense.account.name === 'revolut david') {
                acc.david = +(acc.david + amount).toFixed(2);
            } else if (expense.account.name === 'wise dini' || expense.account.name === 'revolut dini') {
                acc.dini = +(acc.dini + amount).toFixed(2);
            }
            return acc;
        },
        { david: 0, dini: 0 }
    );

    return summary;
};

export function chfToEuro(amount: number): number {
    return amount / CONVERSION_RATE_EUR_TO_CHF;
}

export function euroToChf(amount: number): number {
    return amount * CONVERSION_RATE_EUR_TO_CHF;
}

export const CONVERSION_RATE_EUR_TO_CHF = 1.1;
