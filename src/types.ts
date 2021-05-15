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
