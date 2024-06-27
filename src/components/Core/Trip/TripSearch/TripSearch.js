import React, { useState } from 'react'
import InputWithLabel from "../../../UI/InputWithLabel/InputWithLabel"
import SelectComponent from '../../../UI/Select/SelectComponent'
import Button from '../../../UI/Button/Button'
import "./tripSearch.css"

const TripSearch = () => {
    const [status, setStatus] = useState("")
    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
  return (
    <div className='trip-search-container m-y-l'>
    <div className='form-control'>
      <InputWithLabel label="Source" placeholder="Source address" value={source} onchange={(e) => setSource(e.target.value)}/>
    </div>
    <div className='form-control'>
      <InputWithLabel label="Destination" placeholder="Destination address" value={destination} onchange={(e)=> setDestination(e.target.value)}/>
    </div>
    <div className='form-control'>
      <SelectComponent
      label='Status'
      options={["Active", "Inactive"]}
      selectValue={status}
      setSelectValue={setStatus}
      />
    </div>
    <div className='form-control btn-control'>
        <Button size='medium'>Search</Button>
    </div>
  </div>
  )
}

export default TripSearch