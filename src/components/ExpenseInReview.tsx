import { Button, Card, CardActions, MenuItem, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Currency, ExpenseToReview } from '../types';
import { accounts, categories, currencies, wiseToCustomCategory } from './EditExpenseDialog';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { CategoryIcon } from './CategoryIcon';
import { acceptExpense, rejectExpense } from '../redux/reducers/expenses';

type Props = {
    expenseInReview: ExpenseToReview;
    setNextExpenseIndex: () => void;
};

export const ExpenseInReview = ({ expenseInReview, setNextExpenseIndex }: Props): JSX.Element => {
    const classes = useStyles();
    const [description, setDescription] = useState(expenseInReview.description);
    const [currency, setCurrency] = useState<Currency>(expenseInReview.currency);
    const [amount, setAmount] = useState<number>(expenseInReview.amount);
    const [date, setDate] = useState(new Date(expenseInReview.date));
    const [category, setCategory] = useState(wiseToCustomCategory(expenseInReview.externalCategory));
    const [account, setAccount] = useState(expenseInReview.accountId);

    const dispatch = useDispatch();

    return (
        <Card>
            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                className={classes.textField}
                value={description}
                fullWidth
                required
                onChange={(event) => setDescription(event.target.value)}
            />

            <div className={classes.textFieldGroup}>
                <TextField
                    id="currency"
                    select
                    label="Currency"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value as Currency)}
                    margin="dense"
                    className={classes.textField}
                >
                    {currencies.map((option) => {
                        return (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        );
                    })}
                </TextField>
                <TextField
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="number"
                    value={amount}
                    className={classes.textField}
                    style={{ flex: 1 }}
                    onChange={(event) => setAmount(Number(event.target.value))}
                />
            </div>

            <div className={classes.textFieldGroup}>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    margin="dense"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={format(new Date(date), 'yyyy-MM-dd')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.valueAsDate || new Date())}
                />
                <TextField
                    id="account"
                    select
                    label="Account"
                    value={account}
                    onChange={(event) => setAccount(+event.target.value)}
                    margin="dense"
                    className={classes.textField}
                    style={{ flex: 1 }}
                >
                    {accounts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <TextField
                id="category"
                select
                fullWidth
                label="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                margin="dense"
                className={classes.selectedCategory}
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value} classes={{ root: classes.categoryOptions }}>
                        <CategoryIcon category={option.value} /> <div> {option.label}</div>
                    </MenuItem>
                ))}
            </TextField>

            <CardActions>
                <Button
                    onClick={(): void => {
                        dispatch(rejectExpense({ externalExpenseId: expenseInReview.externalId }));
                        setNextExpenseIndex();
                    }}
                >
                    Reject
                </Button>
                <Button
                    onClick={(): void => {
                        dispatch(
                            acceptExpense({
                                externalExpenseId: expenseInReview.externalId,
                                expense: {
                                    accountId: account,
                                    amount,
                                    category,
                                    currency,
                                    description,
                                    timestamp: date.toISOString(),
                                },
                            })
                        );
                        setNextExpenseIndex();
                    }}
                >
                    Accept
                </Button>
            </CardActions>
            <div>
                <h4>Wise Data</h4>
                <div>
                    <span className="label">Merchant name: </span>
                    {expenseInReview.merchantName ?? 'No merchant name'}
                </div>
                <div>
                    <span className="label">Categories: </span>
                    {expenseInReview.externalCategory ?? 'No categories'}
                </div>
                <div>
                    <span className="label">Description: </span>
                    {expenseInReview.description}
                </div>
                <div>
                    <span className="label">Date:</span>
                    {expenseInReview.date}
                </div>
                <div>
                    <span className="label">Amount:</span>
                    {expenseInReview.amount}
                </div>
                <div>
                    <span className="label">Currency:</span>
                    {expenseInReview.currency}
                </div>
            </div>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.palette.secondary.main,
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textFieldGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
    selectedCategory: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        '& .MuiSelect-selectMenu': {
            display: 'flex',
            alignItems: 'end',
            '& svg': {
                marginRight: '12px',
            },
        },
    },
    categoryOptions: {
        display: 'flex',
        alignItems: 'center',
        '& div': {
            lineHeight: '1em',
            marginLeft: '12px',
        },
    },
}));
