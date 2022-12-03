import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePickerStyles.css';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderRadius: '0 0 8% 8%',
    },
    date: {
        background: 'transparent',
        border: 'transparent',
        color: theme.palette.primary.contrastText,
        width: theme.spacing(10),
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        fontWeight: 800,
    },
}));

export function DateRangePicker(props: {
    fromDate: string;
    toDate: string;
    onFromDateChanged(d: Date): void;
    onToDateChanged(d: Date): void;
}): JSX.Element {
    const classes = useStyles();
    const [fromDate, setFromDate] = useState(new Date(props.fromDate));
    const [toDate, setToDate] = useState(new Date(props.toDate));

    const changeFromDate = (date: Date) => {
        setFromDate(date);
        props.onFromDateChanged(date);
    };
    const changeToDate = (date: Date) => {
        setToDate(date);
        props.onToDateChanged(date);
    };

    return (
        <Box bgcolor="primary.main" color="primary.contrastText" p={7} className={classes.container}>
            <form noValidate>
                <DatePicker
                    selected={fromDate}
                    onChange={(date: Date) => changeFromDate(date)}
                    dateFormat="dd MMM yy"
                    className={classes.date}
                />
            </form>{' '}
            -
            <form noValidate>
                <DatePicker
                    selected={toDate}
                    dateFormat="dd MMMM yy"
                    onChange={(date: Date) => changeToDate(date)}
                    className={classes.date}
                />
            </form>
        </Box>
    );
}
