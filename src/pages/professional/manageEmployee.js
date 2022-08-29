import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DataGrid } from '@mui/x-data-grid';

import { Typography, Button, Paper } from "@mui/material";

const employee = {
    name: ""
};

const employeesList = [
    {id: 1, name: "test"},
    {id: 2, name: "test2"}
]

const EmployeeManagement = () => {
    const [open, setOpen] = React.useState(false);

    const [employeList, setEmployeList] = React.useState(employeesList);

    const [tempEmployeName, setTempEmployeName] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeEmploye = (event) => {
        setTempEmployeName(event.target.value);
    }

    const handleNewEmployee = (newEmployee) => {
        let tempList = employeList;
        const emp = {id: 3, name: tempEmployeName};
        console.log(emp);
        tempList = [...tempList, emp];
        setEmployeList(tempList);
        setTempEmployeName("");
        handleClose();
    };

    const columns = [
        { field: 'id', headerName: 'Id'},
        { field: 'name', headerName: 'Name' }

    ];


    return (
        <div>
            <Paper textalign="center" variant="outlined" style={{
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
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={employeList}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                    />
                </div>

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
                            value={tempEmployeName}
                            variant="standard"
                            onChange={handleChangeEmploye}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleNewEmployee} >Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};


export default EmployeeManagement;

