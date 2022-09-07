import axios from "axios";
import { URL } from ".";

export function getAllCompanyTypes() {
    return axios.get(URL() + "/companyTypes");
}