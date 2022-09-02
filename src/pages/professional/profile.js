import { TextField, Box, FormControl, Select, InputLabel, MenuItem, Button, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const url = "http://localhost:8080/api";

export function URL() {
    return url;
}


export function test() {
   return axios.get(URL, {
       crossDomain: true
   })
}


const Profile = () => {

   const defaultValues = {
      firstname: "",
      lastname: "",
      email: "aa",
      password: "",
      confirmPassword: "",
      salonType: 0,
      companyName: "",
      companyAddress: ""
   };

   const [formValues, setFormValues] = useState(defaultValues);


   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value,
      });
   };

   


   return <Box maxWidth='400px' pl={6} pt={4} sx={{
      display: 'flex', flexWrap: 'wrap',
      '& .MuiTextField-root': { mt: 5, mr: 5, width: '100%' },
      '& .MuiFormControl-root': { mt: 5, mr: 5, width: '100%', },
   }}>
      <h1>Profile {test} { }</h1>
      <div>
         <Button component={Link} to="/manageEmployee" style={{ justifyContent: "space-between" }} variant="contained">Gestion des employés <SettingsIcon></SettingsIcon></Button>
         <br />
         <TextField
            id="firstName"
            label="Prénom"
         />
         <TextField
            id="lastName"
            label="Nom"
         />
         <TextField
            id="email"
            label="Email"
         />
         <TextField
            id="passWord"
            label="Mot de passe"
         />
         <TextField
            id="companyName"
            label="Nom de la compagnie"
         />
         <TextField
            id="companyAdress"
            label="Adresse"
         />
         <FormControl fullWidth style={{ textAlign: "left", maxWidth: '400px' }} >
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
         <TextField
            id="companyDescription"
            label="Description de la compagnie"
            multiline
            rows={4}
         />
         <Stack direction="row" marginTop="20px" >
            <Button variant="contained" component="label">
               Sauvegarder
            </Button>
         </Stack>
      </div>
   </Box>
      ;

};

export default Profile;