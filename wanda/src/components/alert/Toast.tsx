import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { setTimeout } from 'timers/promises'
import { IAlert } from '../../redux/types/alertTypes'

interface Iprops{
    alert: IAlert
}

// not the best way
const Toast: React.FC<Iprops> = ({ alert }) => {
    const toast = useToast() 

    useEffect(()=>{
       toast({
            title: 'Fury Blog',
            description: alert.error ? alert.error : alert.success,
            status: alert.error ? 'error' : 'success',
            duration: 8000,
            isClosable: true,
        })
    },[toast, alert.error, alert.success])

    return (
         <div className='hidden'></div>
    )
}

export default Toast