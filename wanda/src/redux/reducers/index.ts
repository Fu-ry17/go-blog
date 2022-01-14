import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import blogsCategoryReducer from "./blogsCategReducer";
import categoryReducer from "./categoryReducer";
import homeBlogReducer from "./homeBlogReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    category: categoryReducer,
    homeBlogs: homeBlogReducer,
    blogCategory: blogsCategoryReducer
})

export default reducers