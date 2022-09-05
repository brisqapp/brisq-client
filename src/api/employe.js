import axios from "axios";
import { URL } from ".";
import { getToken } from "../auth";

export function getEmploye(id){
    const result = axios.get(URL() + "/employees/" + id);
    return result;
}

export function getEmployes(){
    const result = axios.get(URL() + "/employees", {headers: {authorization: getToken()}});
    return result;
}

export function createEmploye(data){    
    const result = axios.post(URL() + "/employees", data, {headers: {authorization: getToken()}});
    return result;
}

export function updateEmploye(data, id){
    const result = axios.post(URL() + "/employees/" + id, data);
    return result;
}

export function deleteEmploye(id){
    const result = axios.delete(URL() + "/employees/" + id);
    return result;
}