import {TokenTypes} from "../types/generalTypes";
import { Post, PostAction, postActions } from "../types/postTypes";
import { httpRequest, HttpResponse } from "../utils/requests/httpRequest";
import { onSuccess } from "./baseActions";
import { startLoadingAction } from "./uiActions";


const loadPosts = (posts:Post[]):PostAction => {
    return {
        type: postActions.load,
        payload: {
            posts,
            active: undefined
        }
    }
}

const deletePost = (post:Post):PostAction => {
    return {
        type: postActions.delete,
        payload: {
            posts: [],
            active: post
        }
    }
}

const updatePost = (post:Post):PostAction => {
    return {
        type: postActions.update,
        payload: {
            posts: [],
            active: post
        }
    }
}

const addPost = (post:Post):PostAction => {
    return {
        type: postActions.add,
        payload: {
            posts: [post],
            active: undefined
        }
    }
}

const setPostActive = (post:Post):PostAction => {
    return {
        type: postActions.setActive,
        payload: {
            posts: [],
            active: post
        }
    }
}

const removePostActive = () => {
    return {
        type: postActions.removeActive,
        payload: {
            posts: [],
            active: undefined
        }
    }
}



const loadPostsMiddleWare = (bookId:string|undefined):any => {
    return async (dispatch:any) => {
        if (bookId === undefined)
            return;
        const URL = process.env.REACT_APP_BACKEND+'/books/'+bookId+"/posts";
        const authorization = "Bearer "+localStorage.getItem(TokenTypes.token);
        const response:HttpResponse = await httpRequest(URL, 'GET', undefined, {authorization});
        onSuccess(response, () => dispatch(loadPosts(response.body as Post[])));
    }
}

const deletePostsMiddleware = (bookId:string, postId:string|undefined):any => {
    return async (dispatch:any) => {
        const URL = `${process.env.REACT_APP_BACKEND}/books/${bookId}/posts/${postId}`;
        const authorization = `Bearer ${localStorage.getItem(TokenTypes.token)}`;
        const response:HttpResponse = await httpRequest(URL, 'DELETE', undefined, {authorization});
        onSuccess(response, () => {
            dispatch(deletePost(response.body));
        })
    }
}

const updatePostMiddleware = (bookId:string, post:Post):any => {
    return async (dispatch:any) => {
        dispatch(startLoadingAction());
        const URL = `${process.env.REACT_APP_BACKEND}/books/${bookId}/posts/${post.id}`;
        const authorization = `Bearer ${localStorage.getItem(TokenTypes.token)}`;
        const response:HttpResponse = await httpRequest(URL, 'PUT', post, {authorization});
        onSuccess(response, () => {
            dispatch(updatePost(response.body))
        });
        dispatch(startLoadingAction());
    }
}

const createPostMiddleware = (bookId:string, content:string):any => {
    return async (dispatch:any) => {
        const URL = `${process.env.REACT_APP_BACKEND}/books/${bookId}/posts/`;
        const authorization = `Bearer ${localStorage.getItem(TokenTypes.token)}`;
        const response:HttpResponse = await httpRequest(URL, 'POST', {content}, {authorization});
        onSuccess(response, () => {
            dispatch(addPost(response.body));
        })
    }

}


export {
    loadPosts,
    deletePost,
    setPostActive,
    removePostActive,
    loadPostsMiddleWare,
    deletePostsMiddleware,
    updatePostMiddleware,
    createPostMiddleware
}