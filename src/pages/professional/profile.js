import { TextField, Box, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {

   return <Box pl={6} pt={4} sx={{ 
      '& .MuiTextField-root': { mt: 5, width: '50ch' }, 
   }}>
      <h1>Profile</h1>
      <div>
      <Button style={{justifyContent:"space-between", minWidth:"250px"}} variant="contained">Gestion des employés <SettingsIcon></SettingsIcon></Button>
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