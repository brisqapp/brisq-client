import { URL } from ".";
import axios from "axios";

export async function APIregister(form){
    return axios.post(URL() + "/companies", form);
    /*.then((data) => {
        return {
            success: true,
            token: data.data.token
        }
    }).catch((error) => {
        return {
            success: false,
            error: error
        }
    })*/
}