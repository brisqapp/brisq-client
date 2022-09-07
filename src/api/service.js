/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : service.js
 * Description    : Retourne les types de services proposés
 */

import axios from "axios";
import { URL } from ".";

export function getAllServices() {
    return axios.get(URL() + "/serviceTypes");
}