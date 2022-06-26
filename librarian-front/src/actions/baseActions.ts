import { HttpStatus } from "../types/generalTypes"
import { HttpResponse } from "../utils/requests/httpRequest"


const onSuccess = (response:HttpResponse, callBack:() => void) => {
    if (response.error === false) {
        callBack();
    }
}

const onFailure = (response:HttpResponse, expectedStatus:HttpStatus, callBack:() => void) => {
    if (response.error === true && response.status === expectedStatus) {
        callBack();
    }
}

export {
    onSuccess,
    onFailure
}