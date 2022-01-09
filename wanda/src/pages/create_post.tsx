import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotFound from '../components/NotFound'
import { createBlog } from '../redux/actions/blogActions'
import { FormSubmit, IBlog, InputChange, RootStore } from '../utils/TypeScript'

export default function CreatePost() {
     const initialState = { _id: '', title: '', description: '', image: '', category: '',
        slug: '', user_id: '', created_at: new Date().toISOString()}
     const [blog, setBlog] = useState<IBlog>(initialState)
 
     const { auth, category } = useSelector((state: RootStore) => state)
     const dispatch = useDispatch()

     const handleInputChange = (e: InputChange) => {
         const {name, value} = e.target
         setBlog({ ...blog, [name]:value })
     }

     const handleImageChange = (e: InputChange) => {
         const target = e.target as HTMLInputElement
         const files = target.files

         if(files){
             const file = files[0]
             setBlog({ ...blog, image: file })
         }
     }

    const handleSubmit = (e: FormSubmit) => {
        if(!auth.accessToken) return
        e.preventDefault()
        dispatch(createBlog(blog,auth.accessToken))
    }

    if(!auth.accessToken) return <NotFound />

    return (
        <div className='py-8 max-w-5xl m-auto px-2'>
         
          <div className='max-w-md m-auto'>
                <form className='' onSubmit={handleSubmit}>
                    <h1 className='text-center font-bold text-xl tracking-wider'> Create Post </h1>

                    <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                        <input type="text" name='title' placeholder='Title' value={blog.title} onChange={handleInputChange}
                        className='outline-none w-full' autoComplete='off' />
                    </div>

                    <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                       <select name="category" value={blog.category} onChange={handleInputChange}>
                            <option value="">Choose category</option>
                            {
                                category.map(categ => (
                                    <option key={categ._id}>{categ.name}</option>
                                ))
                            }
                       </select>
                    </div>

                    <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                       <textarea name="description" value={blog?.description} placeholder='Description...' onChange={handleInputChange}
                       className='outline-none w-full py-4' style={{ 'resize': 'none' }}  />
                    </div>

                    <div className='py-2'>
                        <label htmlFor='file'> Upload Image </label>
                        <input type="file" name='file' id='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                    </div>

                    <div>
                       {
                         blog.image === '' ? '':  typeof(blog.image) === 'string' ? 
                           <Image src={blog.image} boxSize="250px" /> :
                            <Image src={URL.createObjectURL((blog.image as File))} boxSize="250px"/>
                       }
                    </div>


                    <div className='w-full py-3'>
                        <button className='bg-black py-2 w-full text-gray-100'> Create Post </button>
                    </div>

                </form>
           </div>

      </div>
    )
}
