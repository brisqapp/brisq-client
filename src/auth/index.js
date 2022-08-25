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

export function register(form){
    localStorage.setItem("token", "asdf");
    localStorage.setItem("user", JSON.stringify({
        id: 1,
        name: "Temp"
    }))
    window.location.replace("/");
}