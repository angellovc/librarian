import { HttpStatus } from "./generalTypes";

interface UiState {
    loading?: boolean;
    httpStatus?:HttpStatus|undefined;
    errorMessage?: string|undefined;
}

type UiAction = {
    type: string;
    payload?: {
        httpStatus?:HttpStatus|undefined;
        errorMessage?: string|undefined;
    }
}

type DispatchUi = (args:UiState) => UiState


const uiActions = {
    startLoading: '[Ui] Start Loading', 
    finishLoading: '[Ui] Finish Loading',
    setHttpStatus: '[Ui] Set Http Status',
    cleanHttpStatus: '[Ui] Clean Http Status'
    
}

export {
    uiActions
}

export type {
    UiState,
    UiAction,
    DispatchUi
}