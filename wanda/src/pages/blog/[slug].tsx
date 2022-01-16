import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import Card from '../../components/home/Card'
import { ALERT } from '../../redux/types/alertTypes'
import { getAPI } from '../../utils/fetchData'
import { IBlog, RootStore } from '../../utils/TypeScript'

const BlogDetails = () => {
    const blog_id = useParams<string>().slug
    const [blog, setBlog] = useState<IBlog>()
    const [blogs, setBlogs] = useState<IBlog[]>([])

    const dispatch = useDispatch()
    const { homeBlogs } = useSelector((state: RootStore) => state)

    useEffect(()=>{
        if(!blog_id) return
     
        getAPI(`blogs/id/${blog_id}`)
         .then(res => {
             setBlog(res.data)
             dispatch({ type: ALERT, payload: {} })
         })
         .catch(err => {
             dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
         })

    },[blog_id, dispatch])

    useEffect(()=>{
        if(!blog) return
        const data = homeBlogs.filter(item => item.category === blog.category)
        setBlogs(data)
    },[blog, homeBlogs])

    if(!blog) return <Loading />

    return (
        <div className='py-6 max-w-5xl m-auto px-2 md:px-0'>    
       
           <h1 className='text-center font-black text-xl py-2'> { blog.title }</h1>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {  
                  typeof(blog.image) === 'string' && 
                   <Image src={blog.image} boxSize="350px" width="xl"/>
                }

                <div className='col-span-1 sm:col-span-2'>
                    <p className='text-justify'>{blog.description}</p>

                    <div className='flex justify-between items-center my-4'>
                      <Link to={`/profile/${blog.user_id}`} className='text-sm'> more user post </Link>
                      <small className='my-4'> published on: {new Date(blog.created_at).toLocaleString()}</small>
                    </div>
                </div>
            </div>

            <h1 className='font-black text-xl py-2'> Related Blogs </h1>
                 
            <div className='grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2'>
                {
                    blogs.map(blog => (
                        <Card key={blog._id} blog={blog}/>
                    ))
                }
             </div>

        </div>
    )
}

export default BlogDetails
