import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Summary } from '../types';
import React from 'react';

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
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
    },
    highlight: {
        color: theme.palette.secondary.main,
    },
    capital: {
        textTransform: 'capitalize',
    },
}));

export const SummaryDialog = ({ open, handleClose, summary }: { open: boolean; handleClose(): void; summary: Summary }): JSX.Element => {
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
