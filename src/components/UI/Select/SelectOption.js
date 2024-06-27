import React, { useEffect, useState } from 'react'

const SelectOption = ({setSelectValue, option, value, setIsActive, selectValue, setSearch}) => {
    const handleClick = () => {
        setSelectValue({option: option, value: value})
        setIsActive(false)
        setSearch(option)
    }

  return (
    <div className={`select-option p-m ${(value === selectValue?.value)&&"active"}`} onClick={handleClick}>{option}</div>
  )
}

export default SelectOption