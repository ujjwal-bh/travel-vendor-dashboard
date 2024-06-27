import React from 'react'
import { NavLink } from 'react-router-dom';
import "./citycategory.css"

const CityCategory = ({state, cities}) => {
  return (
    <div className='city-category-container'>
        <div className='font-semibold h5 dark-500'>
           {state}
        </div>
        <div className='city-list p-y-m'>
          {cities?.map((item, index)=> {
            const {id, name} = item;

            return <NavLink  key={index} to={`/operatingCity/${id}/addLocation`}><div className='primary-500 font-semibold'>{name}</div></NavLink>
          })}
        </div>
    </div>
  )
}

export default CityCategory