import { Button, CircularProgress, DialogActions, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Summary } from '../types';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesToReview, Status, resetImportExpenseState } from '../redux/reducers/expenses';
import { toSimpleDateString } from '../utilities/date';
import { RootState } from '../redux/store';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.palette.primary.dark,
        minHeight: '240px',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        fontWeight: 800,
    },
    dateContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    title: {
        textAlign: 'center',
    },
    actionButton: {
        width: '100%',
    },
    dialogActions: {
        justifyContent: 'center',
    },
    error: {
        color: theme.palette.error.main,
        textAlign: 'center',
    },
    success: {
        color: green[500],
        textAlign: 'center',
    },
}));

interface ImportExpensesDialogProps {
    open: boolean;
    handleClose: () => void;
}

export const ImportExpensesDialog = ({ open, handleClose }: ImportExpensesDialogProps): JSX.Element => {
    const dispatch = useDispatch();

    const latestImportedExpenses = useSelector((state: RootState) => state.expenses.latestImportedExpenseCount);
    const error = useSelector((state: RootState) => state.expenses.importExpensesError);
    const status = useSelector((state: RootState) => state.expenses.importExpensesStatus);

    const today = new Date();
    const aMonthAgo = new Date(today.valueOf() - 30 * 24 * 60 * 60 * 1000);

    const classes = useStyles();
    const [fromDate, setFromDate] = useState(aMonthAgo);
    const [toDate, setToDate] = useState(today);

    function onImportClick() {
        dispatch(fetchExpensesToReview({ fromDate: toSimpleDateString(fromDate), toDate: toSimpleDateString(toDate) }));
    }

    function closeDialog() {
        dispatch(resetImportExpenseState());
        handleClose();
    }

    let errorOrSuccessText;
    if (status === Status.FAILED) {
        errorOrSuccessText = <div className={classes.error}>ERROR: {error}</div>;
    } else if (status === Status.COMPLETED) {
        errorOrSuccessText = <div className={classes.success}>{latestImportedExpenses} new expenses imported.</div>;
    } else {
        errorOrSuccessText = '';
    }

    return (
        <Dialog open={open} onClose={closeDialog} classes={{ paper: classes.paper }} fullWidth>
            <DialogTitle className={classes.title}>Select Range to Import Expenses</DialogTitle>
            <DialogContent>
                <div className={classes.dateContainer}>
                    <TextField
                        color="secondary"
                        id="fromDate"
                        label="From Date"
                        type="date"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={format(fromDate, 'yyyy-MM-dd')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFromDate(event.target.valueAsDate || new Date())}
                    />
                    <TextField
                        color="secondary"
                        id="toDate"
                        label="To Date"
                        type="date"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={format(toDate, 'yyyy-MM-dd')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setToDate(event.target.valueAsDate || new Date())}
                    />
                </div>
                {errorOrSuccessText}
            </DialogContent>

            <DialogActions className={classes.dialogActions}>
                {status === Status.LOADING ? (
                    <CircularProgress color="secondary"></CircularProgress>
                ) : (
                    <Button className={classes.actionButton} onClick={onImportClick} color="secondary">
                        Import
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
