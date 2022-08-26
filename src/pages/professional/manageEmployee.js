import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Typography, Button, Paper } from "@mui/material";

const employee = {
    name: ""
};

let text = "<ul>";

const employeesList = []

const EmployeeManagement = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [employee, setEmployee] = React.useState({
        nom: "last name"
    });

    const handleNewEmployee = (newEmployee) => {
        setEmployee({
            name: newEmployee.target.value
        });
        employeesList.push(newEmployee.target.value);
    };


    return (
        <div>
            <Paper textAlign="center" variant="outlined" style={{
                marginTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "30px 45px 30px 45px",
                width: "fit-content",
                display: "block",
                textAlign: "center"
            }} >
                <Typography variant="h2"> Manage employee
                </Typography>
                <br />

                <Typography>
                    <h5 style={{textAlign: "left"}}>
                        Employees list
                        <br />
                        <ul>{employeesList}</ul>
                       
                    </h5>
                </Typography>           

                <Button variant="contained" onClick={handleClickOpen} >Add employee</Button>
                <br /><br />
                <Button variant="contained" >Save</Button>
                <br />
            </Paper>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            Enter employee's name
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            variant="standard"
                            onChange={(handleNewEmployee)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};


export default EmployeeManagement;

