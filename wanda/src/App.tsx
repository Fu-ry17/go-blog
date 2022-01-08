import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Alert from './components/alert/Alert'
import NavBar from './components/nav/NavBar'
import PageRender from './PageRender'
import Home from './pages'
import { refreshToken } from './redux/actions/authActions'

export default function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(refreshToken())
    },[dispatch])


  return (
    <Router>
        <NavBar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:page" element={<PageRender />}/>
          <Route path="/:page/:slug" element={<PageRender />}/>
        </Routes>

    </Router>
  )
}
