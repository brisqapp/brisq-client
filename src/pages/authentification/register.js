import { Paper, Typography, TextField, Button, Link } from "@mui/material";
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        salonType: 0,
        companyName: "",
        companyAddress: ""
    }

    const [formValues, setFormValues] = useState(defaultValues)

    const [activeStep, setActiveStep] = React.useState(0);

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

    const handleRegister = (event) => {
        register(formValues);
    }
    return (
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
                    <TextField name="firstname" value={formValues.firstname} onChange={handleInputChange} id="firstname" label="Prénom" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="lastname" value={formValues.lastname} onChange={handleInputChange}  id="lastname" label="Nom" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="email" value={formValues.email} onChange={handleInputChange}  id="email" label="E-mail" variant="filled" style={{width: "100%"}}/>
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
                        <InputLabel id="salontype">Type de salon</InputLabel>
                        <Select
                            labelId="salontypelabel"
                            id="salontypeselect"
                            label="Type de salon"
                            name="salonType"
                            value={formValues.salonType} 
                            onChange={handleInputChange} 
                        >
                            <MenuItem value={0} disabled>Sélectionner un type</MenuItem>
                            <MenuItem value={1}>Coiffure</MenuItem>
                            <MenuItem value={2}>Je sais pas trop quoi</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField name="companyName" value={formValues.companyName} onChange={handleInputChange}  id="companyname" label="Nom du salon" variant="filled" style={{width: "100%"}}/>
                    <br />
                    <br />
                    <TextField name="companyAddress" value={formValues.companyAddress} onChange={handleInputChange}  id="companyaddress" label="Adresse du salon" variant="filled" style={{width: "100%"}}/>
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
    );
};
  
export default Register;