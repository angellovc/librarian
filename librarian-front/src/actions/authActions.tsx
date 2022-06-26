import Swal from "sweetalert2"
import {authActions, AuthSession, AuthAction} from "../types/authTypes"
import { TokenTypes }  from "../types/generalTypes"
import { loginRequest, refreshToken } from "../utils/requests/authRequests"
import { finishLoadingAction, startLoadingAction } from "./uiActions"


const loginAction = (payload:AuthSession):AuthAction => {
    return {
        type: authActions.login,
        session: payload
    }
}

const logoutAction = () => {
    return {
        type: authActions.logout
    }
}

const logoutMiddleware = ():any => {
    return (dispatch:any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You're leaving...",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#009688',
            confirmButtonColor: '#d32f2f',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch(logoutAction());
            }
          })
    };
}

const loginMiddleware = (email:string, password:string):any => {
    return async (dispatch:any) => {
        const authSession:AuthSession = await loginRequest(email, password);
        if (authSession !== null) {
            localStorage.setItem('token', authSession.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(loginAction(authSession))
        }
    }
}

const checkForValidStoredToken = ():any => {
    return async (dispatch:any) => {
        const token:string|null|undefined = localStorage.getItem(TokenTypes.token);
        if (token === null || token === undefined) {
            return;
        }
        dispatch(startLoadingAction());
        const response = await refreshToken(token);
        if (response !== null) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(loginAction(response.user));
        }
        dispatch(finishLoadingAction());
    }
}

export {
    loginAction,
    loginMiddleware,
    logoutAction,
    logoutMiddleware,
    checkForValidStoredToken
}