import axios from "axios";

const url = "https://api-dev.brisq.app/";

export function test() {
    return axios.get(url, {
        crossDomain: true
    })
}