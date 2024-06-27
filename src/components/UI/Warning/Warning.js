import React from 'react'
import Button from '../Button/Button'
import "./warning.css"
import { FaCheck, FaTrashAlt } from "react-icons/fa"
const Warning = ({tagline, isActive, cancelClick, continueClick, isDisabled, type="error"}) => {
  return (
    <div className={`absolute-wrapper warning-wrapper ${isActive && "active"}`}>
        <div className="absolute-container warning-container">
          <div className="warning-top p-m">
            <div className={`warning-icon ${type}`}>{
              type==="error" ? <FaTrashAlt/> : <FaCheck/>
            }</div>
          </div>
          <div className='h2 font-semibold grey-900 center-text p-y-s'>Are you sure?</div>
          <div className='warning-tagline h5 p-x-m p-y-m'>{tagline}</div>
          <div className="absolute-main">
            <div className="group-button-container">
              <Button
                type="outlined"
                size="default"
                color="error"
                onClick={cancelClick}
              >
                Cancel
              </Button>
              <Button
                type="filled"
                size="default"
                color="primary"
                onClick={continueClick}
                disabled={isDisabled}
              >
                {isDisabled ? "Loading" : "continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Warning