import React from 'react';
import { AddIcon } from '../assets/AddIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ImportIcon } from '../assets/ImportIcon';
import { ReviewIcon } from '../assets/ReviewIcon';
import { SummaryIcon } from '../assets/SummaryIcon';
import { Badge } from '@material-ui/core';

interface BottomNavBarProps {
    openAddExpense: () => void;
    addExpenseActive: boolean;
    openSummary: () => void;
    summaryActive: boolean;
    openImportExpenses: () => void;
    importExpensesActive: boolean;
    expensesToReviewCount: number;
    onStartReview: () => void;
}

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '20px 20px 0 0',
        borderTopColor: theme.palette.background.default,
        borderTopWidth: '2px',
        borderTopStyle: 'solid',
    },
    menu: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        paddingLeft: 0,
        marginTop: '12px',
        marginBottom: 0,
    },
    option: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '40px',
        cursor: 'pointer',
    },
    iconBackground: {
        padding: '6px',
        borderRadius: '50%',
        strokeWidth: 4,
    },
    label: {
        fontSize: '12px',
    },
    badge: {
        background: theme.palette.primary.light,
    },
}));

export const BottomNavBar = ({
    openAddExpense,
    addExpenseActive,
    openSummary,
    summaryActive,
    openImportExpenses,
    importExpensesActive,
    expensesToReviewCount,
    onStartReview,
}: BottomNavBarProps): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <nav className={classes.container}>
            <ol className={classes.menu}>
                <li className={classes.option}>
                    <ImportIcon
                        fontSize="small"
                        className={classes.iconBackground}
                        onClick={openImportExpenses}
                        strokecolor={importExpensesActive ? theme.palette.secondary.main : theme.palette.primary.contrastText}
                    />
                    <span className={classes.label}>Import</span>
                </li>
                <li className={classes.option}>
                    <AddIcon
                        fontSize="small"
                        className={classes.iconBackground}
                        strokecolor={addExpenseActive ? theme.palette.secondary.main : theme.palette.primary.contrastText}
                        onClick={openAddExpense}
                    />
                    <span className={classes.label}>Add</span>
                </li>
                <li className={classes.option}>
                    <Badge badgeContent={expensesToReviewCount} classes={{ badge: classes.badge }}>
                        <ReviewIcon fontSize="small" className={classes.iconBackground} onClick={onStartReview} />
                    </Badge>
                    <span className={classes.label}>Review</span>
                </li>
                <li className={classes.option}>
                    <SummaryIcon
                        fontSize="small"
                        className={classes.iconBackground}
                        onClick={openSummary}
                        strokecolor={summaryActive ? theme.palette.secondary.main : theme.palette.primary.contrastText}
                    />
                    <span className={classes.label}>Summary</span>
                </li>
            </ol>
        </nav>
    );
};
