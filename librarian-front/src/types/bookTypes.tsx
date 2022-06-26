enum ReadingStatus {
    finished = "finished",
    inProgress = "in progress",
    new = "new"
}

interface Book {
    id:string;
    picture:string;
    title:string;
    author:string;
    description:string;
    status:ReadingStatus;
    currentPage:number;
}

interface BookAction {
    type:string,
    payload:{
        books: Book[],
        active: Book|undefined
    }
}

interface BookStatus {
    books: Book[],
    active: Book|undefined
}

const bookActions = {
    load: '[Book] Load books',
    add: '[Book] Add book',
    delete: '[Book] Delete Book',
    update: '[Book] Update Book',
    setActive: '[Book] Set Active Book',
    removeActive: '[Book] Remove Active Book'
}

export type {
    Book,
    BookAction,
    BookStatus
}

export {
    bookActions,
    ReadingStatus
}