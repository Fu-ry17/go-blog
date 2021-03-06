import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import Card from '../../components/home/Card'
import { getBlogsByCategory } from '../../redux/actions/blogActions'
import { IBlog, RootStore } from '../../utils/TypeScript'

export default function CategoryBlogs() {
    const { slug } = useParams<string>()
    const [blogs, setBlogs] = useState<IBlog[]>()

    const dispatch = useDispatch()
    const { blogCategory } = useSelector((state: RootStore) => state)

    useEffect(() =>{
       if(!slug) return 

       if(blogCategory.every(item => item.id !== slug )){
           dispatch(getBlogsByCategory(slug))
       }else{
           const data = blogCategory.find(item => item.id === slug)
           if(!data) return
           setBlogs(data.blogs)
       }
    },[slug, blogCategory, dispatch])


    if(!blogs) return <Loading />

     if(blogs.length === 0) return(
        <div className='w-full h-screen flex items-center justify-center'>
            <h1 className='font-bold text-xl tracking-wider'> No blogs in this category </h1>
        </div>
     )
    
    
    return (
        <div className='py-8 max-w-5xl m-auto px-2 md:px-0'>    
     
             <div className='grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2'>
                {
                      blogs?.map(blog => (
                        <Card key={blog._id} blog={blog}/>
                    ))
                }
             </div>

        </div>
    )
}
