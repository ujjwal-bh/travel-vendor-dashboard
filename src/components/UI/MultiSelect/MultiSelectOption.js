import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';

const MultiSelectOption = ({setSelectValue, option, value, selectValue }) => {

    const valuesRemovingCurrent = (val) => {
        if(val != value) return val;
    }
    const handleClick = () => {
        if(selectValue.includes(value)){
            let temp = selectValue.filter(valuesRemovingCurrent)
            setSelectValue(temp)
        } else {
            setSelectValue([...selectValue, value])
        }
        // setIsActive(false)
    }
  return (
    <div className={`multi-select-option p-m ${(selectValue.includes(value))&&"active"}`} onClick={handleClick}>
        {
            selectValue.includes(value) ? 
            <div className='checkbox' onClick={handleClick}>
                <FaCheck/>
            </div>
            :
            <div className='checkbox' onClick={handleClick}>
            </div>
        }
         {option}
    </div>
  )
}

export default MultiSelectOption