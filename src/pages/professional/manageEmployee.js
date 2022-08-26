import { Typography, Button, Paper } from "@mui/material";
import FormDialog from "./popup";

const Employee = () => {
    return (
        <Paper textAlign = "center" variant="outlined" style = {{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "30px 45px 30px 45px",
            width: "fit-content",
            display: "block",
            textAlign: "center"
        }} >
        <Typography variant="h2"> Manage employee 
        <br />
        <h5>Employees</h5>
        <br />
        </Typography>
         <br />
         <Button variant="contained" onClick={ FormDialog } >Add employee</Button>
         <br /><br />
        <Button variant="contained" >Save</Button>
        <br />
        </Paper>   
    );
};


export default Employee;

