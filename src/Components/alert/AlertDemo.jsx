import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { left } from '@popperjs/core';

const AlertDemo = ({ conditon, message, showAlert }) => {

    return (
        <Stack sx={{
            width: '97%', position: "absolute", top: "60px", left: "1.4%", zIndex: 40, 
            transition: 'all 0.5s ease-in-out',
            opacity: showAlert ? 1 : 0,
            transform: showAlert ? 'translateY(0)' : 'translateY(-20px)'
        }} spacing={2}>
            {conditon == "error" && <Alert variant="filled" severity="error">
                {message}
            </Alert>}
            {conditon == "success" && <Alert variant="filled" severity="success">
                {message}
            </Alert>}
        </Stack>
    );
}

export default AlertDemo;