import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { DateRangePicker } from './components/DateRangePicker';
import { TotalAmount } from './components/TotalAmount';
import { fetchExpenses, selectAmountInEuros, selectExpensesInRange, Status, updateFromDate, updateToDate } from './redux/reducers/expenses';
import { RootState } from './redux/store';

function ExpensesApp(): JSX.Element {
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpensesInRange);
    const amountInEuros = useSelector(selectAmountInEuros);
    const expensesStatus = useSelector((state: RootState) => state.expenses.status);
    const fromDate = useSelector((state: RootState) => state.expenses.fromDate);
    const toDate = useSelector((state: RootState) => state.expenses.toDate);

    const error = useSelector((state: RootState) => state.expenses.error);

    useEffect(() => {
        if (expensesStatus === Status.IDLE) {
            dispatch(fetchExpenses());
        }
    }, [expensesStatus, dispatch]);

    let content;
    if (expensesStatus === Status.LOADING) {
        content = <div className="loader">Loading...</div>;
    } else if (expensesStatus === Status.COMPLETED) {
        console.log('expenses', expenses);
        content = expenses.map((expense) => (
            <div key={expense.id}>
                {expense.category} {expense.timestamp}
            </div>
        ));
    } else if (expensesStatus === Status.FAILED) {
        content = <div>{error}</div>;
    }

    const onFromDateChanged = (newFromDate: Date) => {
        dispatch(updateFromDate(newFromDate.toISOString()));
    };

    function onToDateChanged(newToDate: Date) {
        dispatch(updateToDate(newToDate.toISOString()));
    }

    return (
        <div>
            <DateRangePicker fromDate={fromDate} toDate={toDate} onFromDateChanged={onFromDateChanged} onToDateChanged={onToDateChanged} />
            <TotalAmount amountInEuros={amountInEuros} />
            <div className="App">{content}</div>
        </div>
    );
}

export default ExpensesApp;
