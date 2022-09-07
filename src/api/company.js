import { URL } from ".";
import axios from "axios";
import { getToken } from "../auth";

export async function APIregister(form){
    return axios.post(URL() + "/companies", form);
}

export async function APILogin(form){
    return axios.post(URL() + "/auth", form);
}

export async function getCompanyDetails(id){
    return axios.get(URL() + "/companies/getCompanyDetails/" + id);
}

export async function getCompany(){
    return axios.get(URL() + "/companies", {headers: {authorization: getToken()}})
}

export async function updateCompany(form){
    return axios.put(URL() + "/companies", form, {headers: {authorization: getToken()}})
}