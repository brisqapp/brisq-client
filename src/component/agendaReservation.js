import * as React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton  ,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField,
    DialogActions, 
    Button, 
    Grid,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    InputLabel
} from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { 
    DesktopDatePicker,
    TimePicker
} from '@mui/x-date-pickers';
import { makeReservation } from '../api/reservation';

const Appointment = ({
    children, style, ...restProps
  }) => {
    if(restProps?.data?.schedule){
        return (
            <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: '#b7bcc9',
                borderRadius: '8px',
            }}
            >
            {children}
            </Appointments.Appointment>
        )
    }
        
    return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#606060',
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  )
};

export default (props) => {
    const defaultValues = {
        date: null,
        firstName: "",
        lastName: "",
        email: "",
        serviceEmployeeId: 0,
    }

    const servicesEmploye = props.employe == undefined ? [] : props.employe.services;

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [formValues, setFormValues] = React.useState(defaultValues);
    const data = props.data;

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleReservation = () => {
        makeReservation(formValues).then(() => {            
            setOpenSuccess(true);
        }).catch(() => {
            setOpenError(true);
        });
        setOpenDialog(false);
    }

    const handleTimeChange = (newValue) => {

        setFormValues({
            ...formValues,
            date: newValue,
        });
    }

    const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
        const openDialog = (startDate) => {
            setOpenDialog(true);

            setFormValues({
                ...formValues,
                date: startDate,
            });
        }
    
        return (
            <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={() => {openDialog(restProps.startDate)} }
            />
        )
    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

    const handleCloseError = () => {
        setOpenError(false);
    }

    return (<>
        <Scheduler
            data={data}
            locale={"fr-FR"}
        >
            <ViewState/>
            <WeekView 
                cellDuration={60}
                startDayHour={7}
                endDayHour={19}
                timeTableCellComponent={TimeTableCell}
            />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments
                appointmentComponent={Appointment}
            />
        </Scheduler>

        
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
            Réservation enregistrée!
        </Alert>
        </Snackbar>
        
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
            Une erreur est survenue
        </Alert>
        </Snackbar>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Continuer la réservation</DialogTitle>
            <DialogContent style={{paddingTop: "10px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                        <Grid item xs={2} sm={4} md={8}>                            
                            <DesktopDatePicker
                                label="Date"
                                name="date"
                                inputFormat="MM/DD/YYYY"
                                value={formValues.date}
                                onChange={handleTimeChange}
                                disabled
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={8}>                            
                            <TimePicker
                                label="Heure"
                                name="date"
                                value={formValues.date}
                                onChange={handleTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={8}>
                            <TextField
                                fullWidth
                                label="Nom"
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={8}>
                            <TextField
                                fullWidth
                                label="Prénom"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={16}>
                            <InputLabel id="ServiceEmployeLabelId">Service</InputLabel>
                            <Select
                                labelId="ServiceEmployeLabelId"
                                id="serviceEmployeSelectId"
                                label="Service"
                                name="serviceEmployeeId"
                                value={formValues.serviceEmployeeId} 
                                fullWidth
                                onChange={handleFormChange} 
                            >
                                <MenuItem value={0} disabled>Sélectionner un service</MenuItem>
                                {servicesEmploye.map((serviceEmploye) => {
                                    return (<MenuItem value={serviceEmploye.id} key={serviceEmploye.id}>{serviceEmploye.name}</MenuItem>)
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={2} sm={4} md={16}>
                            <TextField
                                fullWidth
                                label="E-mail"
                                name="email"
                                value={formValues.email}
                                onChange={handleFormChange}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Annuler</Button>
                <Button onClick={handleReservation}>Réserver</Button>
            </DialogActions>
        </Dialog>
    </>);
}