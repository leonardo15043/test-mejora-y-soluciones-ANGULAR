export function statusHttp(status:number):string{
    let response:string = "";
    switch (status) {
        case 401:
            response = "Credenciales incorrectas"
            break;
    
        default:
            response = "Ocurrio un error, intente más tarde"
            break;
    }
    return response;
}