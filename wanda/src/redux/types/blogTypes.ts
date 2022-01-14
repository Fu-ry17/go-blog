import { IBlog } from "../../utils/TypeScript";

export const CREATE_BLOG = 'CREATE_BLOG'
export const GET_HOME_BLOGS = 'GET_HOME_BLOGS'
export const GET_BLOGS_BY_CATEGORY = 'GET_BLOGS_BY_CATEGORY'

export interface ICreateBlog {
    type: typeof CREATE_BLOG,
    payload: IBlog
}


export interface IGetHomeBlogTypes{
    type: typeof GET_HOME_BLOGS,
    payload: IBlog[]
}

export interface IGetBlogByCategory {
    id: string
    blogs: IBlog[]
}

export interface IGetBlogsByCategoryTypes {
    type: typeof GET_BLOGS_BY_CATEGORY,
    payload: IGetBlogByCategory
}