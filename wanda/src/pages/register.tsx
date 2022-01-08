import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../redux/actions/authActions'
import { FormSubmit, InputChange, RootStore } from '../utils/TypeScript'

export default function Register() {
    const initialState = { name:'' ,email: '', password:'', cf_password:''}
    const [user, setUser] = useState(initialState)
    const { name, email, password, cf_password } = user

    const dispatch = useDispatch()
    const { auth } = useSelector((state: RootStore) => state)
  
    const handleInputChange = (e: InputChange) =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    
    const handleSubmit = (e: FormSubmit) => {
       e.preventDefault()
       dispatch(register(user))
    }
    
    useEffect(()=>{
       if (auth.accessToken) window.location.href = "/"
    },[auth.accessToken])

    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <form className='w-10/12 sm:w-1/4' onSubmit={handleSubmit}>
                <h1 className='text-center font-bold text-xl tracking-wider'> Register </h1>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='name' placeholder='Name' value={name} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='email' placeholder='E-Mail' value={email} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='password' placeholder='Password' value={password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='cf_password' placeholder='Confirm Password' value={cf_password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

                <div className='w-full py-3'>
                    <button className='bg-black py-2 w-full text-gray-100'> Sign up </button>
                </div>

                <Link to={'/login'} className='text-xs'>Already have an account? <span className='hover:text-red-500'>Sign in</span></Link>

            </form>
        </div>
    )

}

