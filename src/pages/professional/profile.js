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
import { useEffect, useState } from "react";
import axios from "axios";
import { selectionStateInitializer } from '@mui/x-data-grid/internals';
import { getCompany, updateCompany } from '../../api/company';
import { getAllCompanyTypes } from '../../api/companyType';

const Profile = () => {

   useEffect(() => {
      getCompany().then((data) => {
         setFormValues(data.data);
      });

      getAllCompanyTypes().then((data) => {
         setServices(data.data);
      })
   }, []);

   const [services, setServices] = useState([]);

   // Champ de donnée d'une compagnie
   const defaultValues = {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      address: "",
      companyTypeId: 0,
      companyDescription: ""
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
      updateCompany(formValues).then(() => {
         getCompany().then((data) => {
            setFormValues(data.data);
         });
      })
   }

   // Retourne le contenu html de la page
   return <Box maxWidth='400px' pl={6} pt={4} pb={4} sx={{
      display: 'flex', flexWrap: 'wrap',
      '& .MuiTextField-root': { mt: 5, mr: 5, width: '100%' },
      '& .MuiFormControl-root': { mt: 5, mr: 5, width: '100%', },
   }}>
      <h1>Profile</h1>
      <div>
         <Button 
            component={Link} to="/manageEmployee"
            style={{ justifyContent: "space-between" }}
            variant="contained">Gestion des employés
            <SettingsIcon></SettingsIcon>
         </Button>

         <br />

         <TextField
            id="firstName"
            name="firstName"
            label="Prénom"
            value={formValues.firstName}
            onChange={handleInputChange}
         />

         <TextField
            id="lastName"
            name="lastName"
            label="Nom"
            value={formValues.lastName}
            onChange={handleInputChange}
         />
         
         <TextField
            id="email"
            name="email"
            label="Email"
            value={formValues.email}
            onChange={handleInputChange}
         />

         <FormControl fullWidth style={{ textAlign: "left" }}>
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
               {services.map((service) => {
                  return (<MenuItem value={service.id} key={service.id}>{service.name}</MenuItem>)
               })}
            </Select>
         </FormControl>

         <TextField
            id="companyName"
            name="companyName"
            label="Nom de la compagnie"
            value={formValues.companyName}
            onChange={handleInputChange}
         />
         <TextField
            id="address"
            name="address"
            label="Adresse"
            value={formValues.address}
            onChange={handleInputChange}
         />
         <TextField
            id="url"
            name="url"
            label="Url pour les clients"
            disabled
            value={"dev.brisq.app/reservation/" + formValues.id}
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