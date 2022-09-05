
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { FormControl, InputLabel, Select, MenuItem, Button, Paper } from "@mui/material";
import { getEmploye } from '../api/employe';
import { useParams } from 'react-router-dom';

let newId = -1;

const employeExemple = {
        name: "Toto",
        schedules: [
            {
                weekday: 1,
                morningStart: "09:00",
                morningEnd: "12:00",
                afternoonStart: "13:00",
                afternoonEnd: "17:00"
            },
            {
                weekday: 2,
                morningStart: "08:00",
                morningEnd: "12:00",
                afternoonStart: "13:00",
                afternoonEnd: "17:00"
            },
            {
                weekday: 3,
                morningStart: "08:00",
                morningEnd: "12:00",
                afternoonStart: "13:00",
                afternoonEnd: "17:00"
            },
            {
                weekday: 4,
                morningStart: "08:00",
                morningEnd: "12:00",
                afternoonStart: "13:00",
                afternoonEnd: "17:00"
            },
            {
                weekday: 5,
                morningStart: "08:00",
                morningEnd: "12:00",
                afternoonStart: "13:00",
                afternoonEnd: "17:00"
            },
        ],
        services: [{id: 10, idService: 1, name: "coupe homme", duration: 180}, {id: 11, idService: 2, name: "coupe femme", duration: 150}]
}

const servicesExemple = [{id: 1, name: 'Coupe homme'}, {id: 2, name: 'Coupe femme'}, {id: 3, name: 'couleur'}]

const EmployeeDetails = () => {

    const { id } = useParams();
    
    React.useEffect(()=>{
        getEmploye(id).then((data) => {
            setEmploye(data.data);
            console.log(data.data);
        })
    },[]);

    let schedule = employeExemple.schedule;

    const [employe, setEmploye] = React.useState(employeExemple);
    const [services, setServices] = React.useState(servicesExemple);
    const [newService, setNewService] = React.useState();
    const [selectedDay, setSelectedDay] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    
    const getServiceNameById = (id) => {
        for(const service of services){
            if(service.id == id) return service.name;
        }
        return "";
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeService = (event) => {
        const id = event.target.value
        setNewService({id: newId, serviceId: id, name: getServiceNameById(id), duration: 0});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id) => {
        const tempList = employe.services;
        for(let i = 0; i < tempList.length; i++){
            if(tempList[i].id == id) {
                tempList.splice(i, 1);
                break;
            }
        }
        setEmploye({
            ...employe,
            services: tempList
        });
    }

    function addService() {
        const tempList = employe.services;
        tempList.push(newService);
        setEmploye({
            ...employe,
            services: tempList
        });
        newId --;
        setOpen(false);
    }

    const listServices = employe.services.map((service) =>
        <li key={service.id} style={{listStyle: 'none'}}>
            <span style={{display: 'inline-block', width: '150px'}}>{service.name} </span>
            <TextField id={"txt-" + service.id} label="Durée" variant="outlined" defaultValue={service.duration}/>
            <Button id={"btn-" + service.id} style={{color:'red', height:'100%'}} onClick={() => {handleDelete(service.id)}}>X</Button>
        </li>
    );

    const listAvailableServices = services.map((service) =>
        <MenuItem value={service.id}>{service.name}</MenuItem>
    );

    const handleDayChange = (event) => {
        setSelectedDay(event.currentTarget.name);
    };

    const handleScheduleChange = (event) => {
        const tempSchedule = employe.schedules;
        const {name,value} = event.target;
        tempSchedule[selectedDay][name] = value;
        setEmploye({
            ...employe,
            schedule: tempSchedule
        })
    }

    const getDaySchedule = () => {
        for(schedule of employe.schedules){
            if(schedule.weekday == selectedDay) return schedule;
        }
        return null;
    }

    const handleSaveClick = () => {
        console.log(employe);
    }

    const handleNameChange = (event) => {
        setEmploye({
            ...employe,
            name: event.target.value
        });
    }

    return (
        <div variant="outlined" style = {{
            margin : "16px",
            width: "100%",
            display: "block",
            textAlign: "center"}}>
            <h1  style = {{textAlign: "left" }}>Détail de l'employé</h1>

            <div style={{
                margin:'auto',
                width:'fit-content'
            }}>
                <Paper style = {{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>

                    <h2 style={{textAlign: "left" }}>Employé</h2>
                    <TextField name='nameTextField' label='Nom' value={employe.name} onChange={handleNameChange}/>
                </Paper>

                <Paper style = {{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>
                    <h2 style={{textAlign: "left" }}>Services</h2>
                    <Stack component="form" noValidate spacing={3}>
                        {listServices}
                    </Stack>
                    <Button onClick={handleClickOpen}>Ajouter</Button>
                </Paper>

                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <FormControl fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Service name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newService}
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
                    <Button name={1} onClick={handleDayChange}>Lun</Button>
                    <Button name={2} onClick={handleDayChange}>Mar</Button>
                    <Button name={3} onClick={handleDayChange}>Mer</Button>
                    <Button name={4} onClick={handleDayChange}>Jeu</Button>
                    <Button name={5} onClick={handleDayChange}>Ven</Button>
                    <Button name={6} onClick={handleDayChange}>Sam</Button>
                    <Button name={7} onClick={handleDayChange}>Dim</Button>

                    <h3 style={{textAlign: "left"}}>Matin</h3>
                    <TextField name='morningStart' label='De' value={getDaySchedule()?.morningStart} onChange={handleScheduleChange}/>
                    <TextField name='morningEnd' label='à' value={getDaySchedule()?.morningEnd} onChange={handleScheduleChange}/>

                    <h3 style={{textAlign: "left"}}>Après-midi</h3>
                    <TextField name='afternoonStart' label='De' value={getDaySchedule()?.afternoonStart} onChange={handleScheduleChange}/>
                    <TextField name='afternoonEnd'   label='à' value={getDaySchedule()?.afternoonEnd} onChange={handleScheduleChange}/>
                </Paper>
                <Button onClick={handleSaveClick}>Enregistrer</Button>
            </div>
        </div>
    )
};


export default EmployeeDetails;