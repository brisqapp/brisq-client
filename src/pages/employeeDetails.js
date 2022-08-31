
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { Typography, Button, Paper } from "@mui/material";

const employee = {
        name: "Toto",
        schedule: [
            {
                day: 1,
                am: {
                    debut:"08:00",
                    fin: "12:00"
                },
                pm: {
                    debut:"08:00",
                    fin: "12:00"
                },
            }
        ],
        services: [{name: "Coiffure", duration: 120 }]
}

const EmployeeDetails = () => {

    // popup
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState(employee.services);

    const [tempService, setTempService] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeService = (event) => {
        setTempService(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addService() {
        const tempList = list;
        tempList.push(tempService);
        setList(tempList);
        setOpen(false);
    }

    const listServices = list.map((list) =>
        <li key={list.name}>
            <TextField id={list.name} label="Name" variant="outlined" defaultValue={list.name}/>
            <TextField id={list.name} label="Duration" variant="outlined" defaultValue={list.duration}/>
            <Button id={list.name} style={{color:'red', height:'100%'}}>X</Button>
        </li>
    );

    return (
        <div variant="outlined" style = {{
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "30px 45px 30px 45px",
            width: "fit-content",
            display: "block",
            textAlign: "center" }}>
            <h1>Manage {employee.name}</h1>
            <Stack component="form" noValidate spacing={3}>
                {listServices}
            </Stack>
            <h2 onClick={ handleClickOpen } >Add a service</h2>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tempService}
                            label="Age"
                            onChange={handleChangeService}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addService}>Add</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
};


export default EmployeeDetails;