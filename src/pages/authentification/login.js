/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : login.js
 * Description    : Gestion de la page de login
 */

import { Paper, Typography, TextField, Button, Link, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../auth";

const Login = () => {

    const [openError, setOpenError] = useState(false);

    const navigate = useNavigate();

    const navigateClick = (link) => {
        navigate(link, {replace: true})
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleLogin = (event) => {
        login(formValues).catch(() => {
            setOpenError(true)
        });
    }

    const defaultValues = {
        email: "",
        password: ""
    }

    const [formValues, setFormValues] = useState(defaultValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    return (
        <>
        <Paper elevation={2} style={{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "30px 45px 30px 45px",
            width: "fit-content",
            display: "block",
            textAlign: "center"
        }}>       
            <Typography variant="h4" style={{textAlign: "center"}}>Connexion</Typography>
            <br />
            <br />
            <TextField name="email" value={formValues.email} onChange={handleInputChange} id="email" label="E-mail" variant="filled" />
            <br />
            <br />
            <TextField name="password" value={formValues.password} onChange={handleInputChange}  id="password" type="password" label="Mot de passe" variant="filled" />
            <br />
            <br />
            <Button variant="contained" onClick={handleLogin} style={{width: "100%"}}>Se connecter</Button>
            <br />
            <br />
            <Link style={{cursor: "pointer"}} onClick={() => navigateClick("/register")}>Ou créer un compte</Link>
        </Paper>

        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
            Mot de passe ou nom d'utilisateur non valide
        </Alert>
        </Snackbar>
        </>
    );
};
  
export default Login;