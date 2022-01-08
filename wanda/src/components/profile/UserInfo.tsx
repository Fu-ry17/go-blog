import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import NotFound from '../NotFound'
import EditProfile from './modal/EditProfile'

export default function UserInfo() {
    const { auth } = useSelector((state: RootStore) => state)
   
    if(!auth.user) return <NotFound />

    return (
        <div>
            <div className='w-full flex flex-col items-center justify-center'>
                <Avatar src={(auth.user.avatar as string)} size="xl"/>
            
                 <div className='text-center'>
                     <h1 className='font-bold '>{auth.user.name}</h1>
                     <h2 className='font-semibold'>{auth.user.email}</h2>
                 </div>

                 <EditProfile />
            </div>
             
        </div>
    )
}
