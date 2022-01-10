import { Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IBlog } from '../../utils/TypeScript'

interface Iprops{
    blog: IBlog
}

const Card: React.FC<Iprops> = ({ blog }) =>{
    return (
        <div className='border border-gray-200'>
            {
                typeof(blog.image) === 'string' &&
                <Image src={blog.image} boxSize='200px' width='xl'/>
            }
            <div className='px-1'>
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
              <p className='text-sm text-justify leading-tighter'>{blog.description.length > 100 ? blog.description.slice(0, 200) + '...' : blog.description}</p>

              <div className='flex justify-between text-xs py-2'>
                  <Link to={`/profile/${blog.user_id}`}> more user posts </Link>
                  <span className=''>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
        </div>
    )
}

export default Card