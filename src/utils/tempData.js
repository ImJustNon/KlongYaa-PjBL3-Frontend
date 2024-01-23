export function setTemp(data){
    localStorage.setItem("temp", data);
    return;
}

export function removeTemp(){
    localStorage.removeItem("temp");
    return;
}


export function getTemp(){
    return localStorage.getItem("temp");
}