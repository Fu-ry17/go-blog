import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import homeBlogReducer from "./homeBlogReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    category: categoryReducer,
    homeBlogs: homeBlogReducer
})

export default reducers