import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_EXPENSE } from '../redux/actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { CategoryIcon } from './CategoryIcon';
import { Currency, Expense, NewExpense, Summary } from '../types';
import { addExpense } from '../redux/reducers/expenses';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.palette.secondary.main,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        fontWeight: 800,
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
    },
    highlight: {
        color: theme.palette.primary.main,
    },
    capital: {
        textTransform: 'capitalize',
    },
}));

export const SummaryDialog = ({ open, handleClose, summary }: { open: boolean; handleClose(): void; summary: Summary }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const payer = summary.david > summary.dini ? 'dini' : 'david';
    const payee = payer === 'david' ? 'dini' : 'david';
    const amountOwed = ((summary[payee] - summary[payer]) / 2).toFixed(2);

    return (
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }} fullWidth>
            <DialogContent className={classes.container}>
                <div className={classes.flex}>
                    <span>David paid:</span>
                    <span>{summary.david} €</span>
                </div>
                <div className={classes.flex}>
                    <span>Dini paid:</span>
                    <span>{summary.dini} €</span>
                </div>
                <div className={classes.flex}>
                    <span>
                        <span className={classes.capital}>{payer}</span> owes <span className={classes.capital}>{payee}</span>:{' '}
                    </span>
                    <span className={classes.highlight}>{amountOwed} €</span>
                </div>
            </DialogContent>
        </Dialog>
    );
};
