import { Post, postActions, PostStatus } from "../types/postTypes"

const initialState:PostStatus = {
    posts: [],
    active: undefined
}

const postReducer = (state:PostStatus = initialState, action:any) => {
    switch(action.type) {
        case postActions.load:
            return {
                posts: [...action?.payload?.posts],
                active: undefined
            }
        case postActions.delete:
            const posts:Post[] = state.posts.filter(post => post.id !== action?.payload?.active?.id);
            return {
                ...state,
                posts: [...posts]
            }
        case postActions.update:
            return {
                posts: state.posts.map(post => post.id === action?.payload?.active?.id? action?.payload?.active: post),
                active: undefined
            }
        case postActions.add:
            return {
                posts: [...action.payload.posts, ...state.posts],
                active: state.active
            }
        case postActions.setActive:
            return {
                ...state,
                active: action?.payload?.active
            }
        case postActions.removeActive:
            return {
                ...state,
                active: undefined
            }
        default:
            return state;
    }
}


export default postReducer;