/**
 * Projet brisq
 * Auteurs        : De Bleser Dimitri, Peer Vincent, Rausis Justin
 * Nom de fichier : auth/index.js
 * Description    : Gestion de l'enregistrement d'un nouveau compte d'une   
 *                  compagnie, ou d'un login de compagnie existante.
 */

import { APIregister, APILogin } from "../api/company";

/**
 * Récupère les tokens du serveur
 */
export function getToken() {
    const token = localStorage.getItem("token");
    return token;
}

/**
 * Récupère l'utilisateur 
 */
export function getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

/**
 * Gestion du login d'un employeur
 */
export function login(form) {
    const result = APILogin(form);
    result.then((data) => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify({
            id: data.data.user.id,
            name: data.data.user.firstName + " " + data.data.user.lastName
        }))
        window.location.replace("/");
    }).catch((error) => {
        console.log(error);
    })
    return result;
}

/**
 * Gestion de l'enregistrement d'un nouvel employeur
 */
export async function register(form) {
    const result = APIregister(form);
    result.then((data) => {
        localStorage.setItem("token", data.data.token);

        localStorage.setItem("user", JSON.stringify({
            id: data.data.company.id,
            name: data.data.company.firstName + " " + data.data.company.lastName
        }))
        window.location.replace("/");
    }).catch((error) => {
        console.log(error);
    })
    return result;
}