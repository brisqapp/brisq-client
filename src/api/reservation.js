import axios from "axios";
import { URL } from ".";

export function getReservations(){
    return {
        employe: ["R Justin", "P Vincent", "D Dimitri", "T Olivier"],
        appointments: [
            {
                title: 'Coasdfupe femme',
                startDate: new Date(2022, 9, 2, 9, 35),
                endDate: new Date(2022, 9, 2, 11, 30),
                id: 0,
                location: 'R Justin',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2022, 8, 3, 16, 35),
                endDate: new Date(2022, 8, 3, 17, 30),
                id: 1,
                location: 'P Vincent',
            },
            {
                title: 'Coupe homme',
                startDate: new Date(2022, 9, 1, 16, 35),
                endDate: new Date(2022, 9, 1, 17, 30),
                id: 2,
                location: 'T Olivier',
            }
        ]
    }
}

export function getReservationsByEmploye(){
    const reservations = getReservations();
    const appointments = reservations.appointments;
    const employes = reservations.employe;
    let r = []
    for(const employe of employes){
        r[employe] = [];
    }
    for(const reservation of appointments){
        if(r[reservation.location] != undefined)
            r[reservation.location].push(reservation);
    }
    return {employes: employes, appoitments: r};
}

export function makeReservation(form){
    const hours = ('0'+(form.date.getHours())).slice(-2);
    const minutes =('0'+(form.date.getMinutes())).slice(-2);
    const month = ('0'+(form.date.getMonth())).slice(-2);
    const day = ('0'+(form.date.getDate())).slice(-2);
    const startHour =  hours + ":" + minutes;
    const date = form.date.getFullYear() + "-" + month + "-" + day;
    const modifiedForm = {
        ...form,
        date: date,
        startHour: startHour
    }
    console.log(modifiedForm)
    return axios.post(URL() + "/reservations", modifiedForm)
}