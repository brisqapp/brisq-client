import { TextField, Box, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {

   return <Box sx={{
      '& .MuiTextField-root': { m: 3, width: '50ch' }, margin:3
   }}>
      <h1>Profile</h1>
      <div>
      <Button variant="contained">Gestion des employés <SettingsIcon></SettingsIcon></Button>
      <br />
         <TextField
            id="email"
            label="Email"
            defaultValue="Hello World"
         />
         <br />
         <TextField
            id="companyName"
            label="Nom de la compagnie"
            defaultValue="Hello World"
         />
         <br />
         <TextField
            id="companyAdress"
            label="Adresse"
            defaultValue="Hello World"
         />
         <br />

         <TextField
            id="companyDescription"
            label="Description de la compagnie"
            multiline
            rows={4}
            defaultValue="Default Value"
         />
      </div>
   </Box>
      ;

};

export default Profile;