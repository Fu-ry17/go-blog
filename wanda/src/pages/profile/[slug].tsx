import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFound from '../../components/NotFound'
import OtherInfo from '../../components/profile/OtherInfo'
import UserBlogs from '../../components/profile/UserBlogs'
import UserInfo from '../../components/profile/UserInfo'
import { RootStore } from '../../utils/TypeScript'

export default function Profile() {
    const { slug } = useParams()

    const { auth } = useSelector((state: RootStore) => state)

    if(!auth.accessToken) return <NotFound />

    return (
        <div className='py-8 max-w-4xl m-auto px-2 lg:px-0'>
          
          <div className='grid md:grid-cols-3 gap-3 sm:gap-6 grid-cols-1'>
             <div>
                 {
                     auth.user?._id === slug ? <UserInfo /> : <OtherInfo />
                 }
             </div>

             <div className='col-span-1 md:col-span-2'>
                 <UserBlogs />
             </div>

          </div>

        </div>
    )
}
