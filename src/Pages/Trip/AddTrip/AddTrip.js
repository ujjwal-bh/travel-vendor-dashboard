import React from 'react'
import Title from '../../../components/UI/Title/Title'
import HorizontalMenu from '../../../components/Core/HorizontalMenu/HorizontalMenu'
import "./addTrip.css"
import { Outlet } from 'react-router-dom'

const AddTrip = () => {
  return (
    <div className='outer-cover add-trip-cover'>
        <div className='top-title'>
            <Title>Add Bus Schedule</Title>
        </div>
        <div className='separator'></div>
        <div className='add-trip-main m-y-l'>
            <HorizontalMenu/>
        <div className='add-trip-wrapper'>
            <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default AddTrip