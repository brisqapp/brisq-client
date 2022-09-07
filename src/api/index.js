/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : api/index.js
 * Description    : Indique l'URL utilisée par notre application
 */

import axios from "axios";

const url = "https://api-dev.brisq.app/api";

export function URL() {
    return url;
}

export function test() {
    return axios.get(URL, {
        crossDomain: true
    })
}
