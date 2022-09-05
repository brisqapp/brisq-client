import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { Typography, Button, Paper, DialogActions, DialogContent, DialogContentText, Dialog, TextField, IconButton, Box, Chip } from "@mui/material";
import { FormatAlignJustify } from '@mui/icons-material';
import { getEmployes } from '../../api/employe';

const employeesList = [
    { id: 1, name: "Ariana Grande" },
    { id: 2, name: "Joe Biden" }
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

    const handleNewEmployee = () => {
        let tempList = employeList;
        const emp = { id: 3, name: tempEmployeName };
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
        { field: 'id', headerName: 'Id', width:'10' },
        { field: 'name', headerName: 'Nom', flex: 0.4 },
        {
            field: 'services', headerName: 'Services', flex: 1, renderCell: () => {
                return (
                    <Chip label="Coupe homme" />
                );
            }
        },
        {
            field: 'actions', headerName: 'Actions', width:'100',
            renderCell: () => {
                return (
                    <Box style={{ justifyContent: "end" }}>
                    <IconButton component={Link} to="/employeeDetails" aria-label="delete"><ModeIcon /></IconButton>
                        <IconButton aria-label="delete" onClick={handleDeleteRow} ><DeleteIcon /></IconButton>
                    </Box>
                );
            }
        }
    ];


    return (
        <div style={{ width: "100%" }}>
            <Paper textalign="center" variant="outlined" style={{
                marginTop: "50px",
                marginLeft: "20px",
                marginRight: "20px",
                padding: "30px 45px 30px 45px",
                borderBlockStartWidth: "inherit",
                display: "block",
                textAlign: "center"
            }} >
                <h1 style={{ display: "flex", justifyContent: "space-between", fontSize: "2.5em"}}> Liste des employés
                    <Button style={{ blockSize: "fit-content", alignSelf: "end", minInlineSize:"fit-content" }} variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
                        Ajouter
                    </Button>
                </h1>
                <br />
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={employeList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>

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
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button onClick={handleNewEmployee} >Ajouter</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};


export default EmployeeManagement;

