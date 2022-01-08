import { ALERT, IAlert, IAlertTypes } from "../types/alertTypes";

const alertReducer = (state: IAlert = {}, action: IAlertTypes): IAlert =>{
    switch (action.type) {
        case ALERT:
            return action.payload
        default:
           return state
    }
}

export default alertReducer