import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { euroToChf } from '../redux/reducers/expenses';
import './DateRangePickerStyles.css';

const useStyles = makeStyles((theme) => ({
    priceContainer: {
        width: '156px',
        height: '156px',
        borderRadius: '50%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '-64px auto 0',
        fontWeight: 800,
        minWidth: 'max-content',
    },
    price: {
        fontSize: 36,
        lineHeight: '1em',
        display: 'block',
        marginTop: theme.spacing(3),
    },
    formControl: {
        width: '50%',
    },
}));

export function TotalAmount(props: { amountInEuros: number }): JSX.Element {
    const classes = useStyles();
    const [currency, setCurrency] = useState<'euros' | 'chf'>('euros');
    const [amount, setAmount] = useState<string>(String(props.amountInEuros));
    useEffect(() => {
        setAmount(String(props.amountInEuros));
        setCurrency('euros');
    }, [props.amountInEuros]);
    const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const currency = event.target.value as 'euros' | 'chf';
        setCurrency(currency);
        if (currency === 'chf') {
            setAmount(euroToChf(props.amountInEuros).toFixed(2));
        } else {
            setAmount(String(props.amountInEuros));
        }
    };
    return (
        <Box className={classes.priceContainer} bgcolor="secondary.main" color="secondary.contrastText">
            <span className={classes.price}>{amount}</span>
            <FormControl className={classes.formControl}>
                <Select
                    value={currency}
                    onChange={handleCurrencyChange}
                    disableUnderline
                    SelectDisplayProps={{ style: { fontWeight: 800, padding: '0' } }}
                    IconComponent={() => <ExpandMoreIcon style={{ width: '0.75em' }} />}
                >
                    <MenuItem value={'euros'}>euros</MenuItem>
                    <MenuItem value={'chf'}>chf</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
