import React, { useEffect, useState } from 'react'

const SingleSeat = ({seatType, row, column, seatName, length, width}) => {
    const [sleeperType, setSleeperType] = useState(`${length === 2? "horizontal": "vertical"}`)

    const checkSleeperType = () => {
        if(length===2) setSleeperType("horizontal")
        else setSleeperType("vertical")
    }

    useEffect(()=> {
        checkSleeperType()
    }, [seatType])


    // find if the seat is horizontal or vertical for sleeper seats
    if(seatType === "seater"){
        return (
            <div className='show-single-seat seater-seat' style={{gridRowStart: `${row+1}`, gridColumnStart: `${column+1}`}}>
                <div className='top-seater-abs seater-abs'>

                </div>
                <div className='bottom-seater-abs seater-abs'>

                </div>
                {seatName}
            </div>
        )
    }

  return (
    <div className={`show-single-seat sleeper-seat ${sleeperType}`} style={{gridRowStart: `${row+1}`, gridColumnStart: `${column+1}`, gridRowEnd: `${row+width+1}`, gridColumnEnd: `${column+length+1}`}}>
        <div className='sleeper-abs'></div>
        {seatName}
    </div>
  )
}

export default SingleSeat