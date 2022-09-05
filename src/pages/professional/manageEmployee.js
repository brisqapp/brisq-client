import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { Typography, Button, Paper, DialogActions, DialogContent, DialogContentText, Dialog, TextField, IconButton, Box, Chip } from "@mui/material";
import { FormatAlignJustify } from '@mui/icons-material';
import { createEmploye, deleteEmploye, getEmployes } from '../../api/employe';
import { useEffect } from 'react';



const EmployeeManagement = () => {
    
    useEffect(()=>{
        getEmployes().then((data) => {
            setEmployeList(data.data);
        })
    },[]);

    const [open, setOpen] = React.useState(false);

    const [employeList, setEmployeList] = React.useState([]);

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
        createEmploye({name: tempEmployeName}).then(() => {            
            getEmployes().then((data) => {
                setEmployeList(data.data);
            })
        })
        setTempEmployeName("");
        handleClose();
    };

    const handleDeleteRow = (id) => {
        deleteEmploye(id).then(() => {            
            getEmployes().then((data) => {
                setEmployeList(data.data);
            })
        })
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
            renderCell: (rowData) => {
                return (
                    <Box style={{ justifyContent: "end" }}>
                    <IconButton component={Link} to={"/employeeDetails/" + rowData.id} aria-label="delete"><ModeIcon /></IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDeleteRow(rowData.id)} ><DeleteIcon /></IconButton>
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
                            Nom de l'employé
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

