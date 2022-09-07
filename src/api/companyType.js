/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : companyType.js
 * Description    : Renvoie l'ensemble des types de compagnie que nous mettons 
 *                  à disposition des employeurs.
 */

import axios from "axios";
import { URL } from ".";

export function getAllCompanyTypes() {
    return axios.get(URL() + "/companyTypes");
}