import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormControl, Select, InputLabel, MenuItem , Paper} from "@mui/material";
import AgendaReadOnly from "../../component/agendaReadOnly";
import AgendaReservation from "../../component/agendaReservation";
import { getReservationsByEmploye } from "../../api/reservation";
import { useState } from "react";

const getAppointementsByIdEmploye = (employes, id) => {
    for(const employe of employes){
        if(employe.id == id) return employe.appointements;
    }
    return [];
}

const handleSelectChange = (event) => {

}

const Reservation = () => {
    const { id } = useParams();
    const info = {
        name: "Test Salon",
        employes: [
            {
                id: 1,
                name: "Olivier Tissot", 
                appointements: [{
                    title: 'Réservé',
                    startDate: new Date(2022, 8, 3, 9, 35),
                    endDate: new Date(2022, 8, 3, 11, 30),
                    id: 0,
                }]
            },
            {
                id: 2,
                name: "Peer Vincent", 
                appointements: [{
                    title: 'Réservé',
                    startDate: new Date(2022, 8, 2, 9, 35),
                    endDate: new Date(2022, 8, 2, 11, 30),
                    id: 0,
                }]
            }
        ]
    }
    const defaultValues = {
        employe: 1
    }

    const [formValues, setFormValues] = useState(defaultValues)

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
        <Typography variant="h5"> {info.name} </Typography><br />
        <FormControl fullWidth style={{maxWidth:"400px"}}>
            <InputLabel>Employé</InputLabel>
            <Select
                name="employe"
                value={formValues.employe}
                label="Employé"
                onChange={handleInputChange}
            >
                {info.employes.map(e => {
                    return(<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                })}
            </Select>
        </FormControl>
        <AgendaReservation data={getAppointementsByIdEmploye(info.employes, formValues.employe)}/>
    </div>
    );
};
  
export default Reservation;