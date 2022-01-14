import { Dispatch } from "react";
import { getAPI, postAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { IBlog } from "../../utils/TypeScript";
import { validBlog, validImage } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { GET_BLOGS_BY_CATEGORY, GET_HOME_BLOGS, IGetBlogsByCategoryTypes, IGetHomeBlogTypes } from "../types/blogTypes";


export const createBlog = (blog: IBlog, token: string) => async(dispatch: Dispatch<IAlertTypes>) => {
     const valid = validBlog(blog)
     if(valid) return dispatch({ type: ALERT, payload: { error: valid }})

    try {
        dispatch({ type: ALERT, payload: { loading: true} })
        let url;
         
        if(typeof(blog.image) !== 'string'){
           const check = validImage(blog.image)
           dispatch({ type: ALERT, payload: { error: check }})
           const photo = await imageUpload(blog.image)
           url = photo?.url
        }

        const res = await postAPI('blogs', { ...blog, image: url }, token)

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error :error.response.data.msg }})
    }
}

export const getHomeBlog = () =>  async(dispatch: Dispatch<IAlertTypes | IGetHomeBlogTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true} })
        const res = await getAPI('blogs')

        dispatch({ type: GET_HOME_BLOGS, payload: res.data.blogs })
        dispatch({ type: ALERT, payload: {}})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error :error.response.data.msg }})
    }
}

export const getBlogsByCategory = (category: string) => async(dispatch: Dispatch<IAlertTypes | IGetBlogsByCategoryTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true} })
        const res = await getAPI(`blogs/${category}`)

         dispatch({ type: GET_BLOGS_BY_CATEGORY, payload: { ...res.data, id: category } })

        dispatch({ type: ALERT, payload: {} })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error :error.response.data.msg }})
    }
}
