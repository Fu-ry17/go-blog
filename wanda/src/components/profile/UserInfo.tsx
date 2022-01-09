import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/authActions'
import { RootStore } from '../../utils/TypeScript'
import NotFound from '../NotFound'
import EditProfile from './modal/EditProfile'

export default function UserInfo() {
    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()
   
    if(!auth.user) return <NotFound />

    const handleLogout = () => {
         dispatch(logout())
    }

    return (
        <div>
            <div className='w-full flex flex-col items-center justify-center'>
                <Avatar src={auth.user.avatar} size="xl"/>
            
                 <div className='text-center'>
                     <h1 className='font-bold '>{auth.user.name}</h1>
                     <h2 className='font-semibold'>{auth.user.email}</h2>
                 </div>

                 <button onClick={handleLogout}> Logout </button>

                 <EditProfile />
            </div>
             
        </div>
    )
}
