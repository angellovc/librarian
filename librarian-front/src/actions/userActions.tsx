import { postImageRequest } from "../utils/requests/imageRequests";
import { httpRequest, HttpResponse } from "../utils/requests/httpRequest";
import { loginAction } from "./authActions";
import {TokenTypes} from "../types/generalTypes";
import { AuthSession } from "../types/authTypes";
import { onSuccess } from "./baseActions";
import { User } from "../types/userTypes";
import { finishLoadingAction, startLoadingAction } from "./uiActions";

interface CreateUserResponse extends HttpResponse{
    body: {
        user:User,
        token:string
    }
}

interface UserResponse extends HttpResponse{
    body: {
        user:User
    }
}

const createUserMiddleware = (name:string, description:string, email:string, password:string, pictureFile:any):any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const url = process.env.REACT_APP_BACKEND+"/users";
        const img:any = await postImageRequest(pictureFile);
        const response:CreateUserResponse = await httpRequest(url, 'POST', {name, description, email, password, picture: img.filepath});
        onSuccess(response, () => {
            const authSession:AuthSession = {...response.body.user, token: response.body.token};
            localStorage.setItem('token', authSession.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(loginAction(authSession));
        })
        dispatch(finishLoadingAction());
    }
}


const updateUserMiddleware = ({name, description, pictureFile, oldPicture}:{name:string, description:string, pictureFile:File|undefined, oldPicture:string}):any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const url = process.env.REACT_APP_BACKEND+'/users';
        const token = localStorage.getItem(TokenTypes.token);
        let img;
        if (pictureFile !== undefined) {
            const url = process.env.REACT_APP_BACKEND+'/assets/images/'+oldPicture?.split('/')[2];
            oldPicture && await httpRequest(url, 'DELETE', undefined, {authorization: `Bearer ${token}`});
            img = await postImageRequest(pictureFile);
        }
        const response:UserResponse = await httpRequest(url, 'PATCH', 
            {name, description, picture: img?.filepath},
            {authorization: `Bearer ${token}`}
        );
        const authSession:AuthSession = {...response.body.user, token: token as string} ;
        dispatch(finishLoadingAction());
        onSuccess(response, () => dispatch(loginAction(authSession)))
    }
}

export {
    createUserMiddleware,
    updateUserMiddleware
}