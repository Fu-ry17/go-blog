import { Dispatch } from "react"
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/fetchData"
import { ICategory } from "../../utils/TypeScript"
import { ALERT, IAlertTypes } from "../types/alertTypes"
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, ICategoryType, UPDATE_CATEGORY } from "../types/categoryTypes"

export const createCategory = (name: string, token: string) => async(dispatch: Dispatch<ICategoryType | IAlertTypes >) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await postAPI('category', { name }, token)

        dispatch({ type: CREATE_CATEGORY, payload: res.data.category })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const getCategory = () => async(dispatch: Dispatch<ICategoryType | IAlertTypes >) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await getAPI('category')
        
        dispatch({ type: GET_CATEGORIES, payload: res.data.categories })

        dispatch({ type: ALERT, payload: {} })
    
    } catch (error: any) {
        dispatch({type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const updateCategory = (data: ICategory, token: string) => async(dispatch: Dispatch<ICategoryType | IAlertTypes >) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await patchAPI(`/category/${data._id}`, { name: data.name}, token)

        dispatch({ type: UPDATE_CATEGORY, payload: data })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({type: ALERT, payload: { error: error.response.data.msg }})
    }
}

export const deleteCateory = (id: string, token: string) =>async(dispatch: Dispatch<ICategoryType | IAlertTypes >) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})
        const res = await deleteAPI(`/category/${id}`, token)

        dispatch({ type: DELETE_CATEGORY, payload: id })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({type: ALERT, payload: { error: error.response.data.msg }})
    }
}