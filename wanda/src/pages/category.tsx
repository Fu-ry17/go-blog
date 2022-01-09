import { EditIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteCategModal from '../components/modal/CategDelete'
import NotFound from '../components/NotFound'
import { createCategory, updateCategory } from '../redux/actions/categoryActions'
import { FormSubmit, ICategory, RootStore } from '../utils/TypeScript'

export default function Category() {
    const [name, setName] = useState('')
    const [edit, setEdit] = useState<ICategory | null>(null)

    const { auth, category } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()
  
    const handleSubmit = (e: FormSubmit) => {
        if(!auth.accessToken) return
        e.preventDefault()
        if(!name) return
        if(edit){
            if(edit.name === name){
                setEdit(null)
                setName('')
            }else{
              let data = {...edit, name: name}
              dispatch(updateCategory(data, auth.accessToken))
              setName('')
            }
        }else{
            dispatch(createCategory(name, auth.accessToken ))
            setName('')
        }
    }


    useEffect(()=>{
        if(edit) setName(edit.name)
    },[edit])

    if(auth.user?.role !== 'admin') return <NotFound />

    return (
        <div className='py-8 px-2 lg:px-0 max-w-xs m-auto '>
            <h1> Categories </h1>

            <form className='flex justify-between w-full' onSubmit={handleSubmit}>
               <div className='border-b border-gray-400 hover:border-gray-800 py-1 w-10/12'>
                    <input type="text" name='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)}
                     className='outline-none w-full' autoComplete='off' />
                </div>
                <button className='bg-black w-2/12 text-xs text-gray-100 py-1'> { edit ? 'Update' : 'Add' } </button>
            </form>
            
              {
                  category.map(categ => (
                      <div key={categ._id} className='flex justify-between items-center py-1'>
                           <h2>{categ.name}</h2>

                           <div className='flex gap-x-3 items-center'>
                               <EditIcon onClick={()=> setEdit(categ)} />
                               <DeleteCategModal categ={categ} auth={auth}/>
                           </div>
                      </div>
                  ))
              }

        </div>
    )
}
