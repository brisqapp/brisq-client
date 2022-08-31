import { APIregister } from "../api/company";

export function getToken(){
    const token = localStorage.getItem("token");
    return token;
}

export function getUser(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

export function login(form){
    localStorage.setItem("token", "asdf");
    localStorage.setItem("user", JSON.stringify({
        id: 1,
        name: "Temp"
    }))
    window.location.replace("/");
}

export async function register(form){
    APIregister(form)
    .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);

        localStorage.setItem("user", JSON.stringify({
            id: data.data.user.id,
            name: data.data.user.name
        }))
        //window.location.replace("/");
    }).catch((error) => {
        alert("ça marche pas");
    })
}