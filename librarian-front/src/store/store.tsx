import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import bookReducer from "../reducers/bookReducer";
import postReducer from "../reducers/postReducer";
import uiReducer from "../reducers/uiReducer";
export default configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        book: bookReducer,
        post: postReducer
    }
});
