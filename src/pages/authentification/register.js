import { Paper, Typography, TextField, Button, Link, Snackbar, Alert } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useState } from "react";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { register } from "../../auth";

const Register = () => {
    const navigate = useNavigate();

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyTypeId: 0,
        companyName: "",
        address: "",
        postalCode: "",
        city: ""
    }

    const [formValues, setFormValues] = useState(defaultValues)

    const [activeStep, setActiveStep] = React.useState(0);

    const [openError, setOpenError] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const navigateClick = (link) => {
        navigate(link, {replace: true})
    };

    const handleCloseError = () => {
        setOpenError(false);
    }

    const handleRegister = (event) => {
        register(formValues).catch(() => {
            setOpenError(true);
        })
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
            {
                activeStep == 0 ?
                <>
                    <Typography variant="h4" style={{textAlign: "center"}}>Créer un compte</Typography>
                    <br />
                    <br />
                    <TextField name="firstName" value={formValues.firstName} onChange={handleInputChange} id="firstName" label="Prénom" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="lastName" value={formValues.lastName} onChange={handleInputChange}  id="lastName" label="Nom" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="email" type="email" value={formValues.email} onChange={handleInputChange}  id="email" label="E-mail" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="password" value={formValues.password} onChange={handleInputChange}  id="password" type="password" label="Mot de passe" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="confirmPassword" value={formValues.confirmPassword} onChange={handleInputChange}  id="confirmPassword" type="password" label="Confirmation de mot de passe" variant="filled" style={{width: "100%"}}/>
                </>
                :
                <>
                    <Typography variant="h4" style={{textAlign: "center"}}>Créer un compte</Typography>
                    <br />
                    <br />
                    <FormControl fullWidth style={{textAlign: "left"}}>
                        <InputLabel id="companyTypeIdLabel">Type de salon</InputLabel>
                        <Select
                            labelId="companyTypeIdLabel"
                            id="companyTypeIdSelect"
                            label="Type de salon"
                            name="companyTypeId"
                            value={formValues.companyTypeId} 
                            onChange={handleInputChange} 
                        >
                            <MenuItem value={0} disabled>Sélectionner un type</MenuItem>
                            <MenuItem value={1}>Coiffure</MenuItem>
                            <MenuItem value={2}>Dentiste</MenuItem>
                            <MenuItem value={3}>Barbier</MenuItem>
                            <MenuItem value={4}>Manucure</MenuItem>
                            <MenuItem value={5}>Esthéticien</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField name="companyName" value={formValues.companyName} onChange={handleInputChange}  id="companyname" label="Nom du salon" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="postalCode" type="number" value={formValues.postalCode} onChange={handleInputChange}  id="postalCode" label="Code postal" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="city" value={formValues.city} onChange={handleInputChange}  id="city" label="Ville" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="address" value={formValues.address} onChange={handleInputChange}  id="address" label="Adresse du salon" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <Button variant="contained" onClick={handleRegister} style={{width: "100%"}}>Créer un compte</Button>
                </>
            }

            <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
            <Link style={{cursor: "pointer"}} onClick={() => navigateClick("/login")}>Ou se connecter</Link>
        </Paper>

        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
            Une erreur est survenue
        </Alert>
        </Snackbar>
        </>
    );
};
  
export default Register;