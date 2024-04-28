import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../redux/reducers/expenses';
import { Expense } from '../types';
import { CategoryIcon } from './CategoryIcon';
import './DateRangePickerStyles.css';
import { EditExpenseDialog } from './EditExpenseDialog';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '22px 0px 20px 16px',
        borderRadius: '8px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        marginBottom: '16px',
    },
    expenseText: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '12px',
        justifyContent: 'center',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    description: {
        lineHeight: '1em',
        marginBottom: '4px',
    },
    category: {
        lineHeight: '1em',
        fontWeight: 400,
    },
    accountTag: {
        display: 'inline-block',
        width: '0.75em',
        height: '0.75em',
        marginLeft: '10px',
        borderRadius: '50%',
    },
}));

const COLORS = {
    DINI: '#57C8EB',
    DAVID: '#FF3C82',
    JOINT: '#6FE9A1',
};

const AccountColor: { [key: number]: string } = {
    0: COLORS.JOINT,
    1: COLORS.DAVID,
    2: COLORS.DINI,
    3: COLORS.DAVID,
    4: COLORS.DINI,
};

export function ExpenseItem({ expense }: { expense: Expense }): JSX.Element {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openEditDialogue, setOpenEditDialogue] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteExpense({ id: expense.id }));
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setOpenEditDialogue(true);
        setAnchorEl(null);
    };

    return (
        <Box className={classes.container} bgcolor="primary.main" color="primary.contrastText" key={expense.id}>
            <div className={classes.left}>
                <CategoryIcon category={expense.category} />
                <div className={classes.expenseText}>
                    <div className={classes.description}>
                        {expense.description}
                        <span className={classes.accountTag} style={{ background: AccountColor[expense.account.id] }}></span>
                    </div>
                    <div className={classes.category}>{expense.category}</div>
                </div>
            </div>
            <div className={classes.right}>
                <span style={{ marginTop: '6px' }}>
                    {expense.amount} {expense.currency === 'EUR' ? '€' : 'chf'}
                </span>
                <IconButton onClick={handleClick}>
                    <MoreVertOutlinedIcon />
                </IconButton>
                <Menu
                    id="actions-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => {
                        setAnchorEl(null);
                    }}
                >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                <EditExpenseDialog currentExpense={expense} open={openEditDialogue} handleClose={() => setOpenEditDialogue(false)} />
            </div>
        </Box>
    );
}
