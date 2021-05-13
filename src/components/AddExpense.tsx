import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_EXPENSE } from '../redux/actions';

export const AddExpense = () => {
    const dispatch = useDispatch();
    const [expenseName, setExpenseName] = useState('');
    const handleAddExpense = () => {
        dispatch({ type: ADD_EXPENSE, payload: expenseName });
        setExpenseName('');
    };
    return (
        <div>
            <input onChange={(e) => setExpenseName(e.target.value)} value={expenseName} />
            <button className="add-todo" onClick={handleAddExpense}>
                Add Todo
            </button>
        </div>
    );
};
