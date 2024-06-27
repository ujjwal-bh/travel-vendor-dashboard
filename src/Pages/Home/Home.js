import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../../components/Core/Navbar/Navbar"
import Sidebar from "../../components/Core/Sidebar/Sidebar"
import { useGlobalContext } from '../../context'

const Home = () => {
  const {vendorDetail} = useGlobalContext()
  return (
    <div className='home-outer'>
      <Navbar name={vendorDetail?.name}/>
      <Sidebar/>
      <Outlet/>

    </div>
  )
}

export default Home