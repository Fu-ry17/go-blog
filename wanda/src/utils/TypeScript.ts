import {ChangeEvent, FormEvent } from 'react'
import reducers from '../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof reducers>

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
    cf_password: string
}

export interface IUser {
    avatar: string | File
    created_at: string
    email: string
    name: string
    role: string
    _id: string
}