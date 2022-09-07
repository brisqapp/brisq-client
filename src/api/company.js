import { URL } from ".";
import axios from "axios";

export async function APIregister(form){
    return axios.post(URL() + "/companies", form);
}

export async function APILogin(form){
    return axios.post(URL() + "/auth", form);
}

export async function getCompanyDetails(id){
    return axios.get(URL() + "/companies/getCompanyDetails/" + id);
}