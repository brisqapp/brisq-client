import axios from "axios";

const url = "https://api-dev.brisq.app/api/";

export function URL() {
    return url;
}

export function test() {
    return axios.get(URL, {
        crossDomain: true
    })
}
