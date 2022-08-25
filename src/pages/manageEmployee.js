import { Typography, Button, Paper } from "@mui/material";

const Employee = () => {
    return (
        <Paper textAlign = "center">
        <Typography variant="h2"> Manage employee 
        <br />
        <h5>Employees</h5>
        <br />
        </Typography>
         <br />
        <Button variant="contained" >Save</Button>
        <Button variant="contained" >Add employee</Button>
        </Paper>   
    );
};



export default Employee;

