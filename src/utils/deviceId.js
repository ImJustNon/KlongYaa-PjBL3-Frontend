export function createDeviceId(value){
    localStorage.setItem("deviceId", value);
    return;
}

export function removeDeviceId(){
    localStorage.removeItem("deviceId");
    return;
}

export function getDeviceId(){
    return localStorage.getItem("deviceId");
}