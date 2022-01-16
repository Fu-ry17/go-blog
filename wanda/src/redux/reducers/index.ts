import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import blogsCategoryReducer from "./blogsCategReducer";
import categoryReducer from "./categoryReducer";
import homeBlogReducer from "./homeBlogReducer";
import otherInfoReducer from "./otherInfoReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    category: categoryReducer,
    homeBlogs: homeBlogReducer,
    blogCategory: blogsCategoryReducer,
    otherInfo: otherInfoReducer
})

export default reducers