import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../utilities/auth';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
        padding: '0 36px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '320px',
    },
    error: {
        color: theme.palette.secondary.dark,
    },
}));

export function Login(): JSX.Element {
    const classes = useStyles();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            setSubmitting(false);
        }
    };

    return (
        <div className={classes.container}>
            <Typography variant="h4">Expenses</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)} autoFocus />
                <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                {error && <Typography className={classes.error}>{error}</Typography>}
                <Button type="submit" variant="contained" color="secondary" disabled={submitting || !username || !password}>
                    Log in
                </Button>
            </form>
        </div>
    );
}
