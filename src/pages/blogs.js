import { Paper, Typography, TextField, Button } from "@mui/material";


const Login = () => {
    return (
        <Paper style={{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "15px",
            width: "fit-content"
        }}>            
            <Typography variant="h3" style={{textAlign: "center"}}>Login</Typography>
            <br />
            <br />
            <TextField id="Name" label="Nom" variant="filled" />
            <br />
            <br />
            <Button variant="contained" style={{width: "100%"}}>Se connecter</Button>
        </Paper>
    );
};


export default Login;