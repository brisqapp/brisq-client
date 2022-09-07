/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : api/index.js
 * Description    : 
 */

import axios from "axios";

const url = "http://localhost:8080/api";

export function URL() {
    return url;
}

export function test() {
    return axios.get(URL, {
        crossDomain: true
    })
}
