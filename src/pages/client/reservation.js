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
import { useState } from "react";
import { scheduleToAppoitments } from "../../utils/schedule";


/**
 * Retourne les rendez-vous d'un employé choisi
 * @param employes liste des employés
 * @param id identifiant de l'employé voulus
 * @returns {*[]} liste des rendez-vous de cet employé
 */
const getAppointementsByIdEmploye = (employes, id) => {
    let appointements = [];

    // Remplis notre array avec les rendez-vous de l'employé
    for(const employe of employes){
        if(employe.id == id) {
            appointements = [...employe.appointements, ...scheduleToAppoitments(employe)];
        }
    }
    return appointements;
}

const Reservation = () => {
    const { id } = useParams();
    const info = {
        name: "Test Salon",
        employes: [
            {
                id: 1,
                name: "Olivier Tissot", 
                schedule: [
                    {
                        weekday: 1,
                        morningBegin: "10:30",
                        morningEnd: "12:30",
                        afternoonBegin: "13:30",
                        afternoonEnd: "18:30",
                    },
                    {
                        weekday: 3,
                        morningBegin: "08:30",
                        morningEnd: "12:30",
                        afternoonBegin: "13:30",
                        afternoonEnd: "16:30",
                    }
                ],
                appointements: [
                    {
                        title: 'Réservé',
                        startDate: new Date(2022, 8, 3, 9, 35),
                        endDate: new Date(2022, 8, 3, 11, 30),
                        id: 0,
                    }
                ]
            },
            {
                id: 2,
                name: "Peer Vincent", 
                schedule: [],
                appointements: [{
                    title: 'Réservé',
                    startDate: new Date(2022, 8, 2, 9, 35),
                    endDate: new Date(2022, 8, 2, 11, 30),
                    id: 0,
                }]
            }
        ]
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