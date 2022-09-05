/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : company.js
 * Description    : Poste les formulaires lors de l'enregistrement d'une
 *                  compagnie ou d'un login.
 */

import { URL } from ".";
import axios from "axios";

export async function APIregister(form){
    return axios.post(URL() + "/companies", form);
}

export async function APILogin(form){
    return axios.post(URL() + "/auth", form);
}