export interface Expense {
    id: number;
    amount: number;
    currency: 'EUR' | 'CHF';
    timestamp: string;
    category: string;
    description: string;
    account: {
        id: number;
        name: string;
    };
}

export interface NewExpense {
    amount: number;
    currency: string;
    timestamp: string;
    category: string;
    description: string;
    accountId: number;
}

export interface Summary {
    david: number;
    dini: number;
}

export type Currency = Expense['currency'];
