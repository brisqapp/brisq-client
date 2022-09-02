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
    Paper, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField,
    DialogActions, 
    Button, 
    Stack,
    Grid
} from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { 
    DesktopDatePicker,
    TimePicker
} from '@mui/x-date-pickers';

const Appointment = ({
    children, style, ...restProps
  }) => (
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
  );

export default (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [initialDate, setInitialDate] = React.useState();
    const data = props.data;

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
        const openDialog = (startDate) => {
            setOpenDialog(true);
            setInitialDate(startDate);
        }
    
        return (
            <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={() => {openDialog(restProps.startDate)} }
            />
        )
    }

    return (<>
        <Paper>
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
        </Paper>


        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Continuer la réservation</DialogTitle>
            <DialogContent style={{paddingTop: "10px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>                            
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/DD/YYYY"
                                value={initialDate}
                                onChange={() => {}}
                                disabled
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>                            
                            <TimePicker
                                label="Heure"
                                value={initialDate}
                                onChange={() => {}}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                label="Nom"
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                label="Prénom"
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                label="E-mail"
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Annuler</Button>
                <Button onClick={handleCloseDialog}>Réserver</Button>
            </DialogActions>
        </Dialog>
    </>);
}