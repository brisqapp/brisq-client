/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : profile.js
 * Description    : Contient les données d'une compagnie. L'employeur peut modifier ses données sur cette page, 
 *                   ainsi qu'accéder à la page manageEmployee qui permet de gérer la liste d'employé.
 */

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

// Profile d'une compagnie
const Profile = () => {

   // Champ de donnée d'une compagnie
   const defaultValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      companyAddress: "",
      salonType: 0,
      companyDescription:""
   };

   // Variable d'état pour gérer une éventuelle modification des données de la compagnie
   const [formValues, setFormValues] = useState(defaultValues);

   // Gestion d'un champ modifié
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value,
      });
   };

   // Envoie du formulaire de données qui sera récupéré pour la base de donnée 
   const handleSave = () => {
      console.log(formValues);
   }

   // Retourne le contenu html de la page
   return <Box maxWidth='400px' pl={6} pt={4} pb={4} sx={{
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
            name="firstName"
            label="Prénom"
            onChange={handleInputChange}
         />
         <TextField
            id="lastName"
            name="lastName"
            label="Nom"
            onChange={handleInputChange}
         />
         <TextField
            id="email"
            name="email"
            label="Email"
            onChange={handleInputChange}
         />
         <TextField
            id="password"
            name="password"
            label="Mot de passe"
            onChange={handleInputChange}
         />
         <TextField
            id="companyName"
            name="companyName"
            label="Nom de la compagnie"
            onChange={handleInputChange}
         />
         <TextField
            id="companyAddress"
            name="companyAddress"
            label="Adresse"
            onChange={handleInputChange}
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
            name="companyDescription"
            label="Description de la compagnie"
            multiline
            rows={4}
            onChange={handleInputChange}
         />
         <Stack direction="row" marginTop="20px" >
            <Button variant="contained" component="label" onClick={handleSave}>
               Enregistrer
            </Button>
         </Stack>
      </div>
   </Box>
      ;

};

export default Profile;