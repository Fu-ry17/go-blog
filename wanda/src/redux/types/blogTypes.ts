import { IBlog } from "../../utils/TypeScript";

export const CREATE_BLOG = 'CREATE_BLOG'
export const GET_HOME_BLOGS = 'GET_HOME_BLOGS'

export interface ICreateBlog {
    type: typeof CREATE_BLOG,
    payload: IBlog
}

export interface IGetHomeBlog{
    type: typeof GET_HOME_BLOGS,
    payload: IBlog[]
}

export type IGetHomeBlogTypes = IGetHomeBlog