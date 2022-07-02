import { Book, BookAction, bookActions } from "../types/bookTypes"
import {TokenTypes} from "../types/generalTypes";
import { httpRequest, HttpResponse, imageUpload } from "../utils/requests/httpRequest";
import { onFailure, onSuccess } from "./baseActions";
import { finishLoadingAction, setHttpStatus, startLoadingAction } from "./uiActions";


const loadBooks = (books:Book[]):BookAction => {
    return {
        type:bookActions.load,
        payload: {
            books,
            active: undefined
        }
    };
}


const deleteBook = (book:Book) => {
    return {
        type: bookActions.delete,
        payload: {
            active: book
        }
    }
}


const addBook = (payload:Book):BookAction => {
    return {
        type: bookActions.add,
        payload: {
            books: [payload],
            active: undefined
        }
    }
}

const updateBook = (payload:Book):BookAction => {
    return {
        type: bookActions.update,
        payload: {
            books: [],
            active: payload
        }
    }
}

const setBookActive = (book:Book) => {
    return {
        type: bookActions.setActive,
        payload: {
            active:book
        }
    }
}

const getActiveBookMiddleware = (id:string|undefined):any => {
    return async (dispatch:any) =>  {
        if (id === undefined)
            return;
        const URL = process.env.REACT_APP_BACKEND+'/books/'+id;
        const authorization = "Bearer "+localStorage.getItem(TokenTypes.token);
        const response:HttpResponse  = await httpRequest(URL, 'GET', undefined, {authorization});
        onFailure(response, 404, () => dispatch(setHttpStatus(404)));
        onSuccess(response, () => dispatch(setBookActive(response.body as Book)));
    }   
}

const loadBooksMiddleware = ():any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const URL = process.env.REACT_APP_BACKEND+'/books';
        const token = "Bearer "+localStorage.getItem(TokenTypes.token);
        const response:HttpResponse = await httpRequest(URL, 'GET', undefined, {Authorization: token});
        onSuccess(response, () => dispatch(loadBooks(response.body as Book[])));
        dispatch(finishLoadingAction());
    }
}

const uploadBookMiddleware = (pictureFile:File|undefined, body:any):any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const url = process.env.REACT_APP_BACKEND+"/books";
        const token = localStorage.getItem(TokenTypes.token);
        const headers = {authorization : `Bearer ${token}`};
        let img:any;
        if (pictureFile !== undefined)
            img = await imageUpload(pictureFile);
        body.picture = img?.filepath
        const response:HttpResponse = await httpRequest(url, 'POST', body, headers);
        onSuccess(response, () => dispatch(addBook(response.body as Book)));
        dispatch(finishLoadingAction());
    }
}


const updateBookMiddleware = (pictureFile:File|undefined, book:Book):any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const url = process.env.REACT_APP_BACKEND+"/books/"+book.id;
        const authorization = "Bearer "+localStorage.getItem(TokenTypes.token);
        if (pictureFile !== undefined) {
            const pictureUrl = process.env.REACT_APP_BACKEND+"/"+book.picture;
            await httpRequest(pictureUrl, 'DELETE', undefined, {authorization}); 
            const img = await imageUpload(pictureFile);
            book.picture = img.path;
        }
        const data:any = {...book};
        delete data.id;
        delete data.creationDate;
        const response:HttpResponse = await httpRequest(url, 'PUT', data, {authorization});
        onSuccess(response, () => dispatch(updateBook(response.body)));
        onSuccess(response, () => dispatch(setBookActive(response.body)));
        dispatch(finishLoadingAction());
    }
}


const deleteBookMiddleware = (bookId:string|undefined):any => {
    return async (dispatch:any) => {
        if (bookId === undefined)
            return;
        const url = `${process.env.REACT_APP_BACKEND}/books/${bookId}`;
        const authorization = "Bearer "+localStorage.getItem(TokenTypes.token);
        const response:HttpResponse = await httpRequest(url, 'DELETE', undefined, {authorization});
        onSuccess(response, () => dispatch(deleteBook(response.body as Book)));    
    }

}

export {
    loadBooks,
    setBookActive,
    deleteBook,
    loadBooksMiddleware,
    getActiveBookMiddleware,
    uploadBookMiddleware,
    updateBookMiddleware,
    deleteBookMiddleware
}