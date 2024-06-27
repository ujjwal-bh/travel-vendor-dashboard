import React from 'react'
import "./title.css"
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Title = ({size="h3",weight="regular", children, backIcon=false}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <div className='title-wrapper'>
      {
        backIcon &&
        <div className='back-icon' onClick={handleClick}><FaArrowLeft/></div>
      }
      <div className={`title ${size} primary-500 font-${weight}`}>{children}</div>
    </div>
  )
}

export default Title