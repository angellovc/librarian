import { UiAction, uiActions, UiState } from "../types/uiTypes";

const initialState:UiState = {
    loading: false,
    httpStatus: undefined,
    errorMessage: undefined,
}

const uiReducer = (state:UiState = initialState, action:UiAction) =>  {
    switch (action.type) {
        case uiActions.startLoading:
            return {
                ...state,
                loading: true
            }
        case uiActions.finishLoading:
            return {
                ...state,
                loading: false
            }
        case uiActions.setHttpStatus:
            return {
                ...state,
                httpStatus: action.payload?.httpStatus
            }
        default:
            return state;
    }
}

export default uiReducer;