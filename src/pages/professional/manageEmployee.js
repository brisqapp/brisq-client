import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { DataGrid } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { Typography, Button, Paper, DialogActions, DialogContent, DialogContentText, Dialog, TextField, IconButton, Box } from "@mui/material";


const employeesList = [
    {id: 1, name: "nom1"},
    {id: 2, name: "nom2"}
]

const EmployeeManagement = () => {
    const apiRef = useGridApiRef();

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

    const handleDeleteRow = () => {
        setEmployeList(() => {
          const rowToDeleteIndex = 1;
          return [
            ...employeList.slice(0, rowToDeleteIndex),
            ...employeList.slice(rowToDeleteIndex + 1),
          ];
        });
      };

    const columns = [
        { field: 'id', headerName: 'Id', flex:0.2},
        { field: 'name', headerName: 'Name', flex: 0.5, editable:true},
        { field: 'actions', headerName: 'Actions', flex:0.2,  
        renderCell: () => {
            return (
                <Box>
                    <IconButton aria-label="delete"><ModeIcon /></IconButton>
                    <IconButton aria-label="delete" onClick={handleDeleteRow} ><DeleteIcon /></IconButton>
                </Box>
            );
          }
        }
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
                        pageSize={5}
                        rowsPerPageOptions={[5]}
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

