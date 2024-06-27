import React, { useEffect, useState } from 'react'
import "./operatingDays.css"
import SingleOperatingDay from "../../../../components/Core/Trip/SingleOperatingDay/SingleOperatingDay"
import Button from '../../../../components/UI/Button/Button'
import { useGlobalContext } from '../../../../context'
import { useNavigate } from 'react-router-dom'

const convertToAvailableDays = (date) => {
  if(date === undefined) return 0
  let milliSec = new Date(date) - new Date()
  return Math.ceil(milliSec/(1000 * 60 * 60 * 24))
}


const OperatingDays = () => {
  const navigate = useNavigate()
  const {addTripDetails, setAddTripDetails} = useGlobalContext()



  const [daysFromToday] = useState(convertToAvailableDays(addTripDetails?.availableTill))

  const [days, setDays] = useState([])
  const [nonOperatingDays, setNonOperatingDays] = useState(addTripDetails?.nonOperatingDays || [])

  const addOperatingDays = () => {
    let temp = []
    for(let i=0; i< daysFromToday; i++){
      let d = new Date()
      let milliSec = d.getTime() + (i*24*60*60*1000)
      let newDate = new Date(milliSec)
      temp.push(newDate)
    }
    setDays(temp)
  }
console.log(nonOperatingDays);

  const handleContinueClick= () => {
    setAddTripDetails({...addTripDetails, nonOperatingDays})
    navigate("/trip/add/reservation")
  }

  useEffect(()=> {
    addOperatingDays()
    setNonOperatingDays(addTripDetails?.nonOperatingDays || [])
  },[addTripDetails])



  return (
    <div className='trip-form-wrapper'>
      {nonOperatingDays?.map((item)=> {
        <div>{item}</div>
      })}
        <div className='operating-days-outer'>

          {
            days.map((item, index)=> {
              return <SingleOperatingDay key={index} date={item} {...{nonOperatingDays, setNonOperatingDays}}/>
            })
          }

        </div>
        <div className="trip-row btn-group-wrapper">
        <Button type="outlined" color="error" onClick={()=> navigate(-1)}>Back</Button>
        <Button onClick={handleContinueClick}>Save and Continue</Button>
      </div>
    </div>
  )
}

export default OperatingDays