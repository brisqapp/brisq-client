/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : company.js
 * Description    : Poste les formulaires lors de l'enregistrement d'une
 *                  compagnie ou d'un login.
 */

import { URL } from ".";
import axios from "axios";

// Poste un formulaire à la DB pour l'enregistrement d'une compagnie
export async function APIregister(form) {
    return axios.post(URL() + "/companies", form);
}

// Poste un formulaire à la DB pour le login d'une compagnie
export async function APILogin(form) {
    return axios.post(URL() + "/auth", form);
}

// Retourve les détails d'un employé
export async function getCompanyDetails(id) {
    return axios.get(URL() + "/companies/getCompanyDetails/" + id);
}