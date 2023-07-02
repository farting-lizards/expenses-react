import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavBar } from './components/BottomNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { selectSummary, startReview } from './redux/reducers/expenses';
import { AddExpenseDialog } from './components/AddExpenseDialog';
import { SummaryDialog } from './components/SummaryDialog';
import { ImportExpensesDialog } from './components/ImportExpensesDialog';
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles(() => ({
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         margin: '8px 36px',
//     },
//     button: {
//         minWidth: '90px',
//         fontWeight: 'bold',
//         textTransform: 'capitalize',
//     },
// }));

export const Root = (): JSX.Element => {
    const dispatch = useDispatch();

    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [openSummary, setOpenSummary] = useState(false);
    const [openImportDialog, setOpenImportDialog] = useState(false);

    const expensesToReviewCount = useSelector((state: RootState) => state.expenses.expensesToReviewCount);
    const summary = useSelector(selectSummary);

    const onStartReview = () => {
        dispatch(startReview());
    };
    return (
        <div>
            <Outlet />
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
                expensesToReviewCount={expensesToReviewCount}
                onStartReview={onStartReview}
            />
        </div>
    );
};
