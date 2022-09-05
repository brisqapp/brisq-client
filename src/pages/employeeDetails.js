
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import {FormControl, InputLabel, Select, MenuItem, Button, Paper} from "@mui/material";

const employee = {
        name: "Toto",
        schedule: [
            {
                day: 1,
                am: {
                    start:"07:00",
                    end: "11:00"
                },
                pm: {
                    start:"08:00",
                    end: "12:00"
                },
            },
            {
                day: 2,
                am: {
                    start:"08:00",
                    end: "12:00"
                },
                pm: {
                    start:"09:00",
                    end: "13:00"
                },
            },
            {
                day: 3,
                am: {
                    start:"08:00",
                    end: "12:00"
                },
                pm: {
                    start:"08:00",
                    end: "12:00"
                },
            },
            {
                day: 4,
                am: {
                    start:"06:00",
                    end: "12:00"
                },
                pm: {
                    start:"05:00",
                    end: "12:00"
                },
            }
        ],
        services: [{name: "Coiffure", duration: 120 }]
}

const services = ['Coupe homme', 'Coupe femme', 'couleur']

const EmployeeDetails = () => {

    let schedule = employee.schedule;
    let selectedDay = 0;

    // popup
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState(employee.services);
    const [availableServices, setServices] = React.useState(services);
    const [tempService, setTempService] = React.useState({name:"", duration:0});
    const [displayTimes, setDisplayTimes] = React.useState(schedule[selectedDay]);
    const [name, setName] = React.useState(employee.name);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeService = (event) => {
        setTempService({name:event.target.value, duration: 0});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (event) => {
        const tempList = list.filter(service => service.name !== event.currentTarget.id);
        setList(tempList);
    }

    function addService() {
        const tempList = list;
        tempList.push(tempService);
        setList(tempList);
        setOpen(false);
    }

    const listServices = list.map((list) =>
        <li key={list.name} style={{listStyle: 'none'}}>
            <span style={{display: 'inline-block', width: '150px'}}>{list.name} </span>
            <TextField id={list.name} label="Durée" variant="outlined" defaultValue={list.duration}/>
            <Button id={list.name} style={{color:'red', height:'100%'}} onClick={handleDelete}>X</Button>
        </li>
    );

    const listAvailableServices = availableServices.map((availableServices) =>
        <MenuItem value={availableServices}>{availableServices}</MenuItem>
    );

    const handleDayChange = (event) => {
        selectedDay = event.currentTarget.name;
        setDisplayTimes(schedule[selectedDay]);
    };

    const handleAmChange = (event) => {
        const {name,value} = event.target;
        schedule[selectedDay].am[name] = value;
        setDisplayTimes({... displayTimes, am:{[name]:value}});
        console.log(name, value);
    }

    const handlePmChange = (event) => {
        const {name,value} = event.target;
        schedule[selectedDay].pm[name] = value;
        setDisplayTimes({... displayTimes, pm:{[name]:value}});
        console.log(name, value);
    }

    const handleSaveClick = () => {
        employee.schedule = schedule;
        employee.services = list;
        console.log(employee);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        employee.name = event.target.value;
        console.log(event.target.value);
    }

    return (
        <div variant="outlined" style = {{
            margin : "16px",
            width: "100%",
            display: "block",
            textAlign: "center"}}>
            <h1  style = {{textAlign: "left" }}>Employee Details</h1>

            <div style={{
                margin:'auto',
                width:'fit-content'
            }}>
                <Paper style = {{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>

                    <h2 style={{textAlign: "left" }}>Employee</h2>
                    <TextField name='nameTextField' label='nom' value={name} onChange={handleNameChange}/>
                </Paper>

                <Paper style = {{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>
                    <h2 style={{textAlign: "left" }}>Services</h2>
                    <Stack component="form" noValidate spacing={3}>
                        {listServices}
                    </Stack>
                    <Button onClick={handleClickOpen}>Add</Button>
                </Paper>

                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <FormControl fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Service name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tempService}
                                label="Age"
                                onChange={handleChangeService}>
                                    {listAvailableServices}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addService}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Paper style = {{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>
                    <h2 style={{textAlign: "left" }}>Emploi du temps</h2>
                    <Button name={0} onClick={handleDayChange}>Lun</Button>
                    <Button name={1} onClick={handleDayChange}>Mar</Button>
                    <Button name={2} onClick={handleDayChange}>Mer</Button>
                    <Button name={3} onClick={handleDayChange}>Jeu</Button>
                    <Button name={4} onClick={handleDayChange}>Ven</Button>
                    <Button name={5} onClick={handleDayChange}>Sam</Button>
                    <Button name={6} onClick={handleDayChange}>Dim</Button>

                    <h3 style={{textAlign: "left"}}>Matin</h3>
                    <TextField name='start' label='De' value={displayTimes.am.start} onChange={handleAmChange}/>
                    <TextField name='end' label='à' value={displayTimes.am.end} onChange={handleAmChange}/>

                    <h3 style={{textAlign: "left"}}>Après-midi</h3>
                    <TextField name='start' label='De' value={displayTimes.pm.start} onChange={handlePmChange}/>
                    <TextField name='end'   label='à' value={displayTimes.pm.end} onChange={handlePmChange}/>
                </Paper>
                <Button onClick={handleSaveClick}>Enregistrer</Button>
            </div>
        </div>
    )
};


export default EmployeeDetails;