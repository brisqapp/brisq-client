import axios from "axios";

const url = "http://localhost:8080/api";

export function URL() {
    return url;
}

export function test() {
    return axios.get(URL, {
        crossDomain: true
    })
}
