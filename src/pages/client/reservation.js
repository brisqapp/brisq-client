/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : client/reservation.js
 * Description    : 
 */

import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormControl, Select, InputLabel, MenuItem} from "@mui/material";
import AgendaReservation from "../../component/agendaReservation";
import { useEffect, useState } from "react";
import { scheduleToAppoitments } from "../../utils/schedule";
import { getCompanyDetails } from "../../api/company";


/**
 * Retourne les rendez-vous d'un employé choisi
 * @param employes liste des employés
 * @param id identifiant de l'employé voulus
 * @returns {*[]} liste des rendez-vous de cet employé
 */
const getAppointmentsByIdEmploye = (employes, id) => {
    let appointments = [];
    for(const employe of employes){
        if(employe.id == id) {
            for(const appointment of appointments){
                if(appointment != null) appointments.push(appointment);
            }
            appointments = [...appointments, ...scheduleToAppoitments(employe)];
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

    /**
     * Selection du 1er employé par default
     * @type {{employe: number}}
     */
    const defaultValues = {
        employe: 1
    }

    /**
     * Variable de selection d'employé dans la liste
     */
    const [formValues, setFormValues] = useState(defaultValues)
    const [data, setData] = useState(info);

    const getEmployeeById = (id) => {
        for(const employee of data.employees){
            if(employee.id == id)
                return employee;
        }
        return null;
    }

    /**
     * Modifie l'employé actuellement selectioné
     * @param e évènement déclancheur
     */
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
        <AgendaReservation data={getAppointmentsByIdEmploye(data.employees, formValues.employe)} employe={getEmployeeById(formValues.employe)}/>
    </div>
    );
};
  
export default Reservation;
