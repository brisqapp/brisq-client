/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : api/reservation.js
 * Description    : Cette page a pour but de montrer au client sa réservation.
 *                  Il peut y voir l'heure du rendez-vous, l'employé qui lui   
 *                  est attribué ainsi que l'agenda de cette compagnie.
 */


import axios from "axios";
import { URL } from ".";
import { getToken } from "../auth";


export function getReservations(){
    const result = axios.get(URL() + "/reservations", {headers: {authorization: getToken()}});
    return result;
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
    const month = ('0'+(form.date.getMonth() + 1)).slice(-2);
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