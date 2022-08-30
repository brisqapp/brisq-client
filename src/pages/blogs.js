import { Paper, Typography, TextField, Button } from "@mui/material";

import React from "react";

import { test } from "../api/index"


const Login = () => {
    const [message, setMessage] = React.useState("");

    test().then((data) => {
        setMessage(data.data.message)
    });

    return (
        <Paper style={{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "15px",
            width: "fit-content"
        }}>        
            {message}    
        </Paper>
    );
};


export default Login;