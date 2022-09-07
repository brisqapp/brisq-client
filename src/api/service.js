import axios from "axios";
import { URL } from ".";

export function getAllServices() {
    return axios.get(URL() + "/serviceTypes");
}