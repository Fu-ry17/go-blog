import { ICategory } from "../../utils/TypeScript";

export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

interface ICreateCategory{
    type: typeof CREATE_CATEGORY,
    payload: ICategory
}

interface IGetCategories{
    type: typeof GET_CATEGORIES,
    payload: ICategory[]
}

interface IUpdateCategory{
    type: typeof UPDATE_CATEGORY,
    payload: ICategory
}

interface IDeleteCategory{
    type: typeof DELETE_CATEGORY,
    payload: string
}


export type ICategoryType = ICreateCategory | IGetCategories | IUpdateCategory| IDeleteCategory