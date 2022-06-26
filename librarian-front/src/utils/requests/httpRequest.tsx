import Swal from "sweetalert2";
import { HttpStatus } from "../../types/generalTypes";


interface HttpResponse {
    error:boolean,
    status:HttpStatus,
    body:any
}

const httpRequest = async (url:string, method:string, body:object|undefined = undefined, headers:object|undefined = undefined):Promise<HttpResponse> => {
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            ...headers
        },
        body: body !== undefined? JSON.stringify(body): undefined
    });
    if ([400, 404, 409, 500].includes(response.status)) {
        const {message, error} = await response.json()
        shootError({message, error});
        return {error: true, status: response.status, body:{}};
    } else if ([401].includes(response.status)){
        const message = response.statusText === "Unauthorized"? "Malformed Token": "Incorrect Credentials";
        shootError({error: "Unauthorized", message});
        return {error: true, status: response.status, body:{}};
    }
    const bodyResponse = await response.json();
    return {error: false, status: response.status, body: bodyResponse};
}

const shootError = ({error, message}:{error:string, message:string}) => {
    Swal.fire({
        icon: 'error',
        confirmButtonColor: "#4db6ac",
        title: error,
        text: message,
      })

}

const imageUpload = async (imageFile:any) => {
    const url = process.env.REACT_APP_BACKEND+"/assets/images";
    const body = new FormData();
    body.append('image', imageFile)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'gzip, deflate, br', 
            },
            body: body
        })
        if (response.status === 401)
            throw new Error("Unathorized user")
        return await response.json();
    } catch(error:any) {
        Swal.fire({
            icon: 'error',
            title: 'Incorrect Credentials!',
            confirmButtonColor: "#4db6ac",
            text: error
          });
        return null;
    }
}

export type {
    HttpResponse
}

export {
    httpRequest,
    imageUpload
}