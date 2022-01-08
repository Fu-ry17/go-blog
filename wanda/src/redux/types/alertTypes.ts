
export const ALERT = 'ALERT'

export interface IAlert{
    loading?: boolean
    error?: string
    success?: string
}

export type IAlertTypes = {
     type: typeof ALERT,
     payload: IAlert
}