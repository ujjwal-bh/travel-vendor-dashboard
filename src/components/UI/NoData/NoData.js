import React from 'react'
import "./nodata.css"
import Illustration from "../../../assets/NoDataIllustration.svg"

const NoData = () => {
  return (
    <div className='no-data-container'>
        <img src={Illustration} alt="not found"/>
    </div>
  )
}

export default NoData