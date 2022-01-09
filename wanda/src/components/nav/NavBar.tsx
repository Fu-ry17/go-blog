import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { RootStore } from '../../utils/TypeScript'

export default function NavBar() {
    const { auth } = useSelector((state: RootStore) => state)
    
    const bfLogin = [
        { name: 'home', path: '/' },
        { name: 'login', path: '/login'}
    ]

    const afLogin = [
        { name: 'home', path: '/' },
        { name: 'post', path: '/create_post'}
    ]

    const navLinks = auth.accessToken ? afLogin : bfLogin

    return (
        <div className='bg-white border-b border-gray-200 fixed w-full z-10 py-2'>

            <nav className='max-w-5xl m-auto flex justify-between px-2 lg:px-0'>
                <Link to="/" className='font-bold tracking-wider'> Blog </Link>
                
                <div className='flex gap-2 font-semibold'>
                    {
                        navLinks.map((link, index) =>(
                            <NavLink key={index} to={link.path}>{link.name}</NavLink>
                        ))
                    }
                    {
                        auth.user?.role === 'admin' &&   <NavLink to="/category">categories</NavLink>
                    }
                    {
                        auth.accessToken && 
                        <NavLink to={`/profile/${auth.user?._id}`}>
                            <Avatar src={auth.user?.avatar} size="xs"/>
                        </NavLink>
                    }
                    
                </div>
               
           </nav>

        </div>
    )
}
