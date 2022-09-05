export function statusHttp(status:number):string{
    let response:string = "";
    switch (status) {
        case 401:
            response = "Credenciales incorrectas"
            localStorage.removeItem("token");
            window.location.href="";
            break;
    
        default:
            response = "Ocurrio un error, intente más tarde"
            break;
    }
    return response;
}

export function random(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}