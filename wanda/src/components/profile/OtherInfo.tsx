import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/actions/userActions'
import { IUser, RootStore } from '../../utils/TypeScript'
import Loading from '../alert/Loading'

interface IProps {
    id: string
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
    const [other, setOther] = useState<IUser>()

    const { otherInfo } = useSelector(( state: RootStore) => state)
    const dispatch = useDispatch()

    useEffect(()=> {
      if(!id) return 
      if(otherInfo.every(item => item._id !== id)){
          dispatch(getUser(id))
      }else{
         let data = otherInfo.find(item => item._id === id)
         setOther(data)
      }

    },[id, dispatch, otherInfo])

    if(!other) return <Loading />

    return (
        <div>
        <div className='w-full flex flex-col items-center justify-center'>
            <Avatar src={other.avatar} size="xl"/>
        
             <div className='text-center'>
                 <h1 className='font-bold '>{other.role}</h1>
                 <h1 className='font-bold '>{other.name}</h1>

                 <h2 className='font-semibold'> Account : {other.email}</h2>
                 <h2 className='font-semibold'> Join Date : {new Date(other.created_at).toLocaleString()}</h2>
             </div>
        </div>
         
    </div>
    )
}

export default OtherInfo
