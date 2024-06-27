import React from 'react'

const Footer = ({type="with-margin"}) => {
  return (
    <div className={`footer dark-500 ${type}`}>
        contact <span className='primary-500 font-semibold'>&nbsp;support@bims.com </span>&nbsp;for further support
    </div>
  )
}

export default Footer