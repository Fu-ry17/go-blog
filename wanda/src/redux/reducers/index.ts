import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    category: categoryReducer
})

export default reducers