
/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : employeeDetails.js
 * Description    : Cette page contient les informations d'un employé tel que son nom, 
 *                  les services qu'il peut entreprendre et son emploi du temps. 
 *                  L'employeur est dirigé sur cette page lorsqu'il souhaite modifier l'un de
 *                  ses employés depuis la liste des employés de la page manageEmployee.
 */

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { FormControl, InputLabel, Select, MenuItem, Button, Paper } from "@mui/material";
import { getEmploye, updateEmploye } from '../api/employe';
import { useParams } from 'react-router-dom';
import { getAllServices } from '../api/service';

let newId = -1;

const employeExemple = {
    name: "",
    schedules: [],
    services: []
}

const servicesExemple = [];

const EmployeeDetails = () => {
    const { id } = useParams();

    React.useEffect(() => {
        getEmploye(id).then((data) => {
            setEmploye(data.data);
        })

        getAllServices().then((data) => {
            setServices(data.data);
        })
    }, []);

    const [employe, setEmploye] = React.useState(employeExemple);
    const [services, setServices] = React.useState(servicesExemple);
    const [newService, setNewService] = React.useState({ serviceId: 0 });
    const [selectedDay, setSelectedDay] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const getServiceNameById = (id) => {
        for (const service of services) {
            if (service.id == id) return service.name;
        }
        return "";
    }

    /**
     * Ouvre le popup d'ajout de service
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeService = (event) => {
        const id = event.target.value
        setNewService({ id: newId, serviceId: id, name: getServiceNameById(id), duration: 0 });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDureeChange = (event, id) => {
        const tempServices = employe.services;
        for (const service of tempServices) {
            if (service.id == id) service.duration = event.target.value;
        }
        setEmploye({
            ...employe,
            services: tempServices
        });
    }

    const handleDelete = (id) => {
        const tempList = employe.services;
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].id == id) {
                tempList.splice(i, 1);
                break;
            }
        }
        setEmploye({
            ...employe,
            services: tempList
        });
    }

    /**
     * Ajout un service
     */
    function addService() {
        const tempList = employe.services;
        tempList.push(newService);
        setEmploye({
            ...employe,
            services: tempList
        });
        newId--;
        setOpen(false);
    }

    const listServices = employe.services.map((service) =>
        <li key={service.id} style={{ listStyle: 'none' }}>
            <span style={{ display: 'inline-block', width: '150px' }}>{service.name} </span>
            <TextField id={"txt-" + service.id} label="Durée" variant="outlined" onChange={(e) => { handleDureeChange(e, service.id) }} value={service.duration} />
            <Button id={"btn-" + service.id} style={{ color: 'red', height: '100%' }} onClick={() => { handleDelete(service.id) }}>X</Button>
        </li>
    );

    const listAvailableServices = services.map((service) =>
        <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
    );

    /**
     * Change les horaire afficher selon la journée selectionée
     * @param event évènement déclancheur
     */
    const handleDayChange = (event) => {
        setSelectedDay(event.currentTarget.name);
    };

    const handleScheduleChange = (event) => {
        const { name, value } = event.target;
        const id = getDayScheduleId();
        const tempSchedules = employe.schedules;
        if (id == -1) {
            tempSchedules.push({
                weekday: selectedDay,
                [name]: value
            })
        } else {
            tempSchedules[id][name] = value;
        }
        setEmploye({
            ...employe,
            schedules: tempSchedules
        })
    }

    const getDayScheduleId = () => {
        for (let i = 0; i < employe.schedules.length; i++) {
            if (employe.schedules[i].weekday == selectedDay) return i;
        }
        return -1;
    }

    const getDaySchedule = (day) => {
        for (const schedule of employe.schedules) {
            if (schedule.weekday == selectedDay) {
                if (schedule[day] == undefined)
                    return "";
                return schedule[day];
            }
        }
        return "";
    }

    /**
     * Sauve les modifications effectués
     */
    const handleSaveClick = () => {
        updateEmploye(employe, id);
        console.log(employe);
    }

    /**
     * Update le nom de l'employé
     * @param event évènement déclancheur
     */
    const handleNameChange = (event) => {
        setEmploye({
            ...employe,
            name: event.target.value
        });
    }

    return (

        <div variant="outlined" style={{
            padding: "16px",
            display: "block",
            textAlign: "center"
        }}>
            <h1 style={{ textAlign: "left" }}>Détail de l'employé</h1>

            <div style={{
                margin: 'auto',
                width: 'fit-content'
            }}>
                <Paper style={{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>

                    <h2 style={{ textAlign: "left" }}>Employé</h2>
                    <TextField name='nameTextField' label='Nom' value={employe.name} onChange={handleNameChange} />
                </Paper>

                <Paper style={{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>
                    <h2 style={{ textAlign: "left" }}>Services</h2>
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
                                value={newService.serviceId}
                                label="Service name"
                                onChange={handleChangeService}
                            >
                                {listAvailableServices}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addService}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Paper style={{
                    margin: '16px auto',
                    padding: '1px 16px 16px 16px',
                }}>
                    <h2 style={{ textAlign: "left" }}>Emploi du temps</h2>
                    <Button name={1} onClick={handleDayChange}>Lun</Button>
                    <Button name={2} onClick={handleDayChange}>Mar</Button>
                    <Button name={3} onClick={handleDayChange}>Mer</Button>
                    <Button name={4} onClick={handleDayChange}>Jeu</Button>
                    <Button name={5} onClick={handleDayChange}>Ven</Button>
                    <Button name={6} onClick={handleDayChange}>Sam</Button>
                    <Button name={7} onClick={handleDayChange}>Dim</Button>

                    <h3 style={{ textAlign: "left" }}>Matin</h3>
                    <TextField name='morningBegin' label='De' value={getDaySchedule('morningBegin')} onChange={handleScheduleChange} />
                    <TextField name='morningEnd' label='à' value={getDaySchedule('morningEnd')} onChange={handleScheduleChange} />

                    <h3 style={{ textAlign: "left" }}>Après-midi</h3>
                    <TextField name='afternoonBegin' label='De' value={getDaySchedule('afternoonBegin')} onChange={handleScheduleChange} />
                    <TextField name='afternoonEnd' label='à' value={getDaySchedule('afternoonEnd')} onChange={handleScheduleChange} />
                </Paper>
                <Button onClick={handleSaveClick}>Enregistrer</Button>
            </div>
        </div>
    )
};


export default EmployeeDetails;