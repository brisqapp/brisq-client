import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormControl, Select, InputLabel, MenuItem , Paper} from "@mui/material";
import AgendaReadOnly from "../../component/agendaReadOnly";
import AgendaReservation from "../../component/agendaReservation";
import { getReservationsByEmploye } from "../../api/reservation";
import { useEffect, useState } from "react";
import { scheduleToAppoitments } from "../../utils/schedule";
import { getCompanyDetails } from "../../api/company";



const getAppointmentsByIdEmploye = (employes, id) => {
    let appointments = [];
    for(const employe of employes){
        if(employe.id == id) {
            appointments = [...employe.appointments, ...scheduleToAppoitments(employe)];
        }
    }
    return appointments;
}

const Reservation = () => {
    const { id } = useParams();   
    
    useEffect(()=>{
        getCompanyDetails(id).then((data) => {
            setData(data.data);
            setFormValues({
                ...formValues,
                employe: data.data.employees[0]?.id
            })
        })
    },[]);


    const info = {
        company: "",
        employees: []
    }
    const defaultValues = {
        employe: 1
    }

    const [formValues, setFormValues] = useState(defaultValues)
    const [data, setData] = useState(info);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
    <div style={{padding: "30px"}}>
        <Typography variant="h3"> Réservation </Typography>
        <Typography variant="h5"> {data.company} </Typography><br />
        <FormControl fullWidth style={{maxWidth:"400px"}}>
            <InputLabel>Employé</InputLabel>
            <Select
                name="employe"
                value={formValues.employe}
                label="Employé"
                onChange={handleInputChange}
            >
                {data.employees.map(e => {
                    return(<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                })}
            </Select>
        </FormControl>
        <AgendaReservation data={getAppointmentsByIdEmploye(data.employees, formValues.employe)} serviceEmployeeId={formValues.employe}/>
    </div>
    );
};
  
export default Reservation;