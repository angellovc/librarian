import { bookActions, BookStatus } from "../types/bookTypes";


const initialState:BookStatus = {
    books: [],
    active: undefined
}

const bookReducer = (state:BookStatus = initialState, action:any):any => {
    switch (action.type) {
        case bookActions.load:
            return {
                ...action.payload
            }
        case bookActions.add:
            return {
                ...state,
                books: [
                    ...action.payload.books,
                    ...state.books
                ]
            }
        case bookActions.delete:
            const books = state.books.filter(book => book !== action.payload.active.id);
            return {
                ...state,
                books
            }
        case bookActions.setActive:
            return {
                ...state,
                active: action.payload.active
            }
        case bookActions.removeActive:
            return {
                ...state,
                active: undefined
            }
        default:
            return state;
    }
}

export default bookReducer;