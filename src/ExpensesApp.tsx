import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { DateRangePicker } from './components/DateRangePicker';
import { TotalAmount } from './components/TotalAmount';
import {
    fetchExpenses,
    fetchExpensesToReviewCount,
    importExpenses,
    selectAmountInEuros,
    selectExpensesInRange,
    selectSummary,
    Status,
    updateFromDate,
    updateToDate,
} from './redux/reducers/expenses';
import { RootState } from './redux/store';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ExpenseItem } from './components/ExpenseItem';
import { AddExpenseDialog } from './components/AddExpenseDialog';
import { SummaryDialog } from './components/SummaryDialog';
import { SvgIcon } from '@material-ui/core';
import { AddIcon } from './assets/AddIcon';
import { BottomNavBar } from './components/BottomNavBar';
import { ImportExpensesDialog } from './components/ImportExpensesDialog';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '8px 36px',
    },
    button: {
        minWidth: '90px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    content: {
        margin: '24px 36px',
    },
}));

function ExpensesApp(): JSX.Element {
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpensesInRange);
    const amountInEuros = useSelector(selectAmountInEuros);
    const summary = useSelector(selectSummary);
    const expensesStatus = useSelector((state: RootState) => state.expenses.status);
    const expensesToReviewCountStatus = useSelector((state: RootState) => state.expenses.expensesToReviewCountStatus);

    const fromDate = useSelector((state: RootState) => state.expenses.fromDate);
    const toDate = useSelector((state: RootState) => state.expenses.toDate);
    const error = useSelector((state: RootState) => state.expenses.error);

    const classes = useStyles();

    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [openSummary, setOpenSummary] = useState(false);
    const [openImportDialog, setOpenImportDialog] = useState(false);

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

            <AddExpenseDialog open={openAddExpense} handleClose={() => setOpenAddExpense(false)} />
            <SummaryDialog open={openSummary} handleClose={() => setOpenSummary(false)} summary={summary} />
            <ImportExpensesDialog open={openImportDialog} handleClose={() => setOpenImportDialog(false)} />

            <BottomNavBar
                openAddExpense={() => setOpenAddExpense(true)}
                addExpenseActive={openAddExpense}
                openSummary={() => setOpenSummary(true)}
                summaryActive={openSummary}
                openImportExpenses={() => setOpenImportDialog(true)}
                importExpensesActive={openImportDialog}
            />
        </div>
    );
}

export default ExpensesApp;
