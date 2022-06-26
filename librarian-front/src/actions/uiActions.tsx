import { HttpStatus } from "../types/generalTypes"
import { UiAction, uiActions } from "../types/uiTypes"

const startLoadingAction = ():UiAction => ({type: uiActions.startLoading})

const finishLoadingAction = ():UiAction => ({type: uiActions.finishLoading})

const setHttpStatus = (httpStatus:HttpStatus):UiAction => ({type: uiActions.setHttpStatus, payload:{httpStatus}})

const cleanHttpStatus = () => ({type: uiActions.cleanHttpStatus})

export {
    startLoadingAction,
    finishLoadingAction,
    setHttpStatus,
    cleanHttpStatus
}