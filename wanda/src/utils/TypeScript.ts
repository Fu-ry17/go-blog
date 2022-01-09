import {ChangeEvent, FormEvent } from 'react'
import reducers from '../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >

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

export interface IUserProfile extends IUserRegister{
    avatar: string | File
}

export interface IUser {
    avatar: string 
    created_at: string
    email: string
    name: string
    role: string
    _id: string
}

export interface ICategory {
    created_at: string
    name: string
   _id: string
}

export interface IBlog {
    _id?: string
    title: string
	description: string
	image: string | File
	category: string
    slug: string
    user_id: string
	created_at: string
}