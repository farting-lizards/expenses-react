import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

function App(): JSX.Element {
    return (
        <div className="App">
            <Box component="span" m={1}>
                Hi
            </Box>
            <Button variant="contained" color="primary">
                Hello World!
                </Button>
        </div>
    );
}

export default App;
