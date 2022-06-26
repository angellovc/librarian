import {authActions, AuthSession} from '../types/authTypes';


const authReducer = (state:any = {}, action:any):AuthSession|{} =>  {
    switch (action.type) {
        case authActions.login:
            return {
                ...state,
                id: action.session.id,
                name: action.session.name,
                email: action.session.email,
                description: action.session.description,
                picture: action.session.picture,
                token: action.session.token,
            }
            case authActions.logout:
                return {}
        default:
            return state;
    }
}

export default authReducer;