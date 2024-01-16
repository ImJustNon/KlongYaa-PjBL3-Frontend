export function setUserToken(user_t){
    localStorage.setItem("userToken", String(user_t));
    return;
}

export function removeUserToken(){
    localStorage.removeItem("userToken");
    window.location.reload();
    return;
}