import { User } from "./userTypes";

interface Post {
    id:string;
    content:string;
    creationDate:Date;
    updatingDate:Date;
    user:User
}

interface PostAction {
    type:string,
    payload:{
        posts: Post[],
        active: Post|undefined
    }
}

interface PostStatus {
    posts: Post[],
    active: Post|undefined
}

const postActions = {
    load: "[Post] Load Posts",
    delete: "[Post] Delete Post",
    update: "[Post] Update Post",
    add: "[Post] Add Post",
    setActive: "[Post] Set Active",
    removeActive: "[Post] Remove Active",
}

export type {
    Post,
    PostAction,
    PostStatus
}

export {
    postActions,
}