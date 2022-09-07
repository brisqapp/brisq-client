/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : employe.js
 * Description    : Gestion de la liste des employés d'une compagnie.
 */

import axios from "axios";
import { URL } from ".";
import { getToken } from "../auth";

// Retourne un employé en passant un id
export function getEmploye(id) {
    const result = axios.get(URL() + "/employees/" + id);
    return result;
}

// Retourne l'ensemble des employés d'une compagnie
export function getEmployes() {
    const result = axios.get(URL() + "/employees", { headers: { authorization: getToken() } });
    return result;
}

// Créer un nouvel employé à partir des données du profil connues
export function createEmploye(data) {
    const result = axios.post(URL() + "/employees", data, { headers: { authorization: getToken() } });
    return result;
}

// Permet la modification d'un employé existant
export function updateEmploye(data, id) {
    const result = axios.put(URL() + "/employees/" + id, data);
    return result;
}

// Supprime un employé en indiquant son id
export function deleteEmploye(id) {
    const result = axios.delete(URL() + "/employees/" + id);
    return result;
}