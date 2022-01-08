import { IUser } from "../../utils/TypeScript";


export const AUTH = 'AUTH'

export interface IAuth {
    msg?: string
    accessToken?: string
    user?: IUser
}

export type IAuthType = {
   type: typeof AUTH,
   payload: IAuth
}

