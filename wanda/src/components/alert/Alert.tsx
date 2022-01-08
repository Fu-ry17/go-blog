import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import Loading from './Loading'
import Toast from './Toast'

export default function Alert() {
    const { alert } = useSelector((state: RootStore) => state)

    return (
        <div>
            <h1> Alert ... </h1>

            { (alert.success || alert.error) && <Toast alert={alert}/>}

            { alert.loading && <Loading /> }

        </div>
    )
}
