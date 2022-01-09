import { IBlog } from "../../utils/TypeScript";
import { GET_HOME_BLOGS, IGetHomeBlogTypes } from "../types/blogTypes";

const homeBlogReducer = ( state: IBlog[] = [], action: IGetHomeBlogTypes): IBlog[] => {
    switch (action.type) {
        case GET_HOME_BLOGS:
            return action.payload
        default:
           return state
    }
}

export default homeBlogReducer