import { Expense } from '../types';

let nextExpenseId = 0;

type Payload = Expense & {
    id: number;
};

export const addExpense = (expense: Expense): { type: string; payload: Payload } => ({
    type: ADD_EXPENSE,
    payload: {
        ...expense,
        id: ++nextExpenseId,
    },
});

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_EXPENSES = 'GET_EXPENSES';
