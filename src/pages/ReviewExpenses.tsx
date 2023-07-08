import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Card } from '@material-ui/core';
import { ExpenseInReview } from '../components/ExpenseInReview';

export const ReviewExpenses = (): JSX.Element => {
    const expensesInReview = useSelector((state: RootState) => state.expenses.expensesToReview);
    console.log('All To Review', expensesInReview);
    const [currentExpenseIndex, setCurrentExpenseIndex] = useState<number>(0);

    return (
        <div>
            <header>
                {expensesInReview.length === 0 ? (
                    'Nothing to Review'
                ) : (
                    <>
                        <h3>
                            Reviewing {currentExpenseIndex + 1} of {expensesInReview.length}
                        </h3>
                        <Button>Stop Review</Button>
                    </>
                )}
            </header>
            {expensesInReview[currentExpenseIndex] ? (
                <ExpenseInReview
                    expenseInReview={expensesInReview[currentExpenseIndex]}
                    setNextExpenseIndex={() => setCurrentExpenseIndex(currentExpenseIndex + 1)}
                />
            ) : (
                'All done! \\o/'
            )}
        </div>
    );
};
