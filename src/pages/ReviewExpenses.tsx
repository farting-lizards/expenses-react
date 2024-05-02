import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ExpenseInReview } from '../components/ExpenseInReview';
import { Link } from 'react-router-dom';

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
                    </>
                )}
                <Link to="/">Go Back to Home</Link>
            </header>
            {expensesInReview[currentExpenseIndex] ? (
                <ExpenseInReview
                    expenseInReview={expensesInReview[currentExpenseIndex]}
                    setNextExpenseIndex={() => setCurrentExpenseIndex(currentExpenseIndex + 1)}
                    key={expensesInReview[currentExpenseIndex].externalId}
                />
            ) : (
                'All done! \\o/'
            )}
        </div>
    );
};
