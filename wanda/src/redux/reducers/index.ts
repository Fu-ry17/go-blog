import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
    auth: authReducer,
    alert: alertReducer
})

export default reducers