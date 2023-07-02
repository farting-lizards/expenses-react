import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { DateRangePicker } from './components/DateRangePicker';
import { ExpenseItem } from './components/ExpenseItem';
import { TotalAmount } from './components/TotalAmount';
import {
    Status,
    fetchExpenses,
    fetchExpensesToReviewCount,
    releaseExpensesInReview,
    selectAmountInEuros,
    selectExpensesInRange,
    updateFromDate,
    updateToDate,
} from './redux/reducers/expenses';
import { RootState } from './redux/store';
import React from 'react';

const useStyles = makeStyles(() => ({
    content: {
        margin: '24px 36px',
    },
}));

function ExpensesApp(): JSX.Element {
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpensesInRange);
    const amountInEuros = useSelector(selectAmountInEuros);
    const expensesStatus = useSelector((state: RootState) => state.expenses.status);
    const expensesToReviewCountStatus = useSelector((state: RootState) => state.expenses.expensesToReviewCountStatus);

    const fromDate = useSelector((state: RootState) => state.expenses.fromDate);
    const toDate = useSelector((state: RootState) => state.expenses.toDate);
    const error = useSelector((state: RootState) => state.expenses.error);

    const classes = useStyles();

    useEffect(() => {
        console.log('Effect in ExpensesApp');
        dispatch(releaseExpensesInReview());
    }, [dispatch]);

    useEffect(() => {
        if (expensesStatus === Status.IDLE) {
            dispatch(fetchExpenses());
        }
    }, [expensesStatus, dispatch]);

    useEffect(() => {
        if (expensesToReviewCountStatus === Status.IDLE) {
            dispatch(fetchExpensesToReviewCount());
        }
    }, [expensesToReviewCountStatus, dispatch]);

    let content;
    if (expensesStatus === Status.LOADING) {
        content = <div className="loader">Loading...</div>;
    } else if (expensesStatus === Status.COMPLETED) {
        content = expenses.map((expense) => <ExpenseItem expense={expense} key={expense.id} />);
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

            <div className={classes.content}>{content}</div>
        </div>
    );
}

export default ExpensesApp;
