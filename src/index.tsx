import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExpensesApp from './ExpensesApp';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const font = "'Baloo Bhaina 2', cursive";
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#2C2F62',
            light: '#8F3CFF',
            contrastText: '#F2F2F2',
        },
        secondary: {
            main: '#57C8EB',
            light: '#57C8EB',
            dark: '#FF3C82',
            contrastText: '#ffffff',
        },
        background: {
            default: '#191B43',
        },
        text: {
            primary: '#ffffff',
        },
    },
    typography: {
        fontFamily: font,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ExpensesApp />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
