import React from 'react'
import "./plainInput.css"

const PlainInput = ({placeholder, size="",type="text", value, onchange, min=0, max=null}) => {
  if(type==="number"){
    <div className='plain-input-form-control'>
        <input type="number" placeholder={placeholder} className={`plain-input ${size} p-x-s h6 `} value={value} onChange={onchange} min={min} max={max}/>
    </div>
  }
  return (
    <div className='plain-input-form-control'>
        <input type={type} placeholder={placeholder} className={`plain-input ${size} p-x-s h6 `} value={value} onChange={onchange}/>
    </div>
  )
}

export default PlainInput