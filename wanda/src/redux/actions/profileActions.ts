import { Dispatch } from "redux";
import { patchAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { validImage, validPassword } from "../../utils/valid";
import { ALERT, IAlertTypes } from "../types/alertTypes";
import { AUTH, IAuth, IAuthType } from "../types/authTypes";

export const updateUser = (name: string, avatar: File, auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertTypes>) => {
    if(!auth.user || !auth.accessToken) return

    try {
        dispatch({ type: ALERT, payload: { loading: true }})  
        let url;

        if(avatar){
            const check = validImage(avatar)
            if (check) return dispatch({ type: ALERT, payload:{ error: check }})
            const photo = await imageUpload(avatar)
            url = photo?.url
        }

        const res = await patchAPI('user', { name: name ? name : auth.user?.name , avatar: url ? url : auth.user.avatar  }, auth.accessToken)
        
        dispatch({ type: AUTH, payload: {
            accessToken: auth.accessToken,
            user: {
                ...auth.user,
                name: name ? name : auth.user?.name , 
                avatar: url ? url : auth.user?.avatar  
            }
        }})

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})   
    }
}

export const resetPassword = (password: string,cf_password: string, auth: IAuth) =>  async(dispatch: Dispatch<IAlertTypes>) => {
    if(!auth.accessToken) return

    try {
         const check = validPassword(password, cf_password)
         if (check) return dispatch({ type: ALERT, payload: { error: check }})

         console.log(password)

         dispatch({ type: ALERT, payload: { loading: true }})
         const res = await patchAPI('reset', { password }, auth.accessToken)

         dispatch({ type: ALERT, payload: { success: res.data.msg }})
        
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg }})   
    }
}