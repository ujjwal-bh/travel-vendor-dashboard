import React from 'react'
import "./navbar.css"
import { FaBars, FaBell, FaTimes } from "react-icons/fa"
import { useGlobalContext } from '../../../context'

const Navbar = ({name}) => {
  const {sidebarActive, setSidebarActive} = useGlobalContext()
  const handleClick = () => {
    setSidebarActive((prev) => !prev)
  }
  return (
    <div className='navbar-container light-bg-900'>
        <div className='navbar-left-container'>
          <div className='navbar-icon navbar-left-icon h3 dark-500 click' onClick={handleClick}>
            {
              sidebarActive? 
              <FaTimes/>:
              <FaBars/>

            }
          </div> 
          <div className='h1 primary-500 font-bold navbar-title'>Bims</div> 
        </div>
        <div className='navbar-right-container'>
            <div className='navbar-right-icon primary-500 h4 click'>
              <FaBell/>
              <div className='notif-count-abs light-900 error-bg h6 font-semibold'>
                2
              </div>
            </div>
            <div className='dark-500 h6 navbar-name'>{name}</div>
        </div>
   
    
    </div>
  )
}

export default Navbar