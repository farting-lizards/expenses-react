import { Expense } from '../types';

export const mockExpenses: Expense[] = [
    {
        id: 123,
        amount: 123,
        currency: 'EUR',
        timestamp: new Date().toISOString(),
        category: 'grcery',
        description: 'Sth',
        account: {
            id: 123,
            name: 'Revolut',
        },
    },
    {
        id: 456,
        amount: 123,
        currency: 'EUR',
        timestamp: new Date().toISOString(),
        category: 'grcery',
        description: 'Sth',
        account: {
            id: 123,
            name: 'Revolut',
        },
    },
    {
        id: 789,
        amount: 123,
        currency: 'EUR',
        timestamp: new Date().toISOString(),
        category: 'grcery',
        description: 'Sth',
        account: {
            id: 123,
            name: 'Revolut',
        },
    },
    {
        id: 1011,
        amount: 123,
        currency: 'EUR',
        timestamp: new Date().toISOString(),
        category: 'grcery',
        description: 'Sth',
        account: {
            id: 123,
            name: 'Revolut',
        },
    },
];
