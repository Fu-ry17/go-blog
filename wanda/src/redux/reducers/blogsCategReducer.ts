import { GET_BLOGS_BY_CATEGORY, IGetBlogByCategory, IGetBlogsByCategoryTypes } from "../types/blogTypes"

const blogsCategoryReducer = ( state: IGetBlogByCategory[] = [] , action: IGetBlogsByCategoryTypes): IGetBlogByCategory[] =>{
      switch (action.type) {
          case GET_BLOGS_BY_CATEGORY:
              return [ ...state, action.payload]
          default:
              return state
      }
}

export default blogsCategoryReducer