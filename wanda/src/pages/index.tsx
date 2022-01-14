import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../components/home/Card'
import { RootStore } from '../utils/TypeScript'

export default function Home() {
    const { homeBlogs, category } = useSelector((state: RootStore)=> state)

    return (
        <div className='py-8 max-w-5xl m-auto px-2 md:px-0'>    
           <main className='flex gap-2'>
              
               <div className='w-2/12 border-r border-gray-400 hidden md:block'>
                    <h1> Categories </h1>
                     {
                         category.map(categ => (
                             <li key={categ._id} className='py-2'> <Link to={`/blogs/${categ.name}`}> {categ.name }</Link></li>
                         ))
                     }
                </div>
                
                <div className='grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2 sm:w-10/12'>
                    {
                        homeBlogs.map(blog => (
                            <Card key={blog._id} blog={blog}/>
                        ))
                    }
                </div>

           </main>
        
        </div>
    )
}
