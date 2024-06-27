import React, { useEffect, useState } from 'react'

const SingleReservationSeat = ({seatType, row, column, seatName, length, width,selectedSeat, setSelectedSeat, reservedSeats, setReservedSeats}) => {
    const [sleeperType, setSleeperType] = useState(`${length === 2? "horizontal": "vertical"}`)

    const [reservedStatus, setReservedStatus] = useState("normal")

    const checkSleeperType = () => {
        if(length===2) setSleeperType("horizontal")
        else setSleeperType("vertical")
    }

   
    const handleClick = () => {
        let val = reservedSeats.filter((item)=> {
            return item.seatName === seatName
        })
        if(val.length > 0){
            let seatsWithoutCurr = reservedSeats.filter((item)=> {
                return item.seatName != seatName
            })
            setReservedSeats(seatsWithoutCurr)
            setReservedStatus("normal")
            return;
        }
        setSelectedSeat({
            seatName
        })

    }

    const checkSeatReservationType = () => {
        if(Object.keys(selectedSeat).length > 0){
            if(selectedSeat.seatName === seatName){
                setReservedStatus("selected")
            }
        } else{
            let val = reservedSeats.filter((item)=> {
                return item.seatName === seatName
            })
            if(val.length> 0){
                setReservedStatus(val[0].reservationType)
            } else{
                setReservedStatus("normal")
            }

        }
    }
    useEffect(()=> {
        checkSleeperType()
    }, [seatType])

    useEffect(()=> {
        checkSeatReservationType()
    }, [reservedSeats, selectedSeat])


    // find if the seat is horizontal or vertical for sleeper seats
    if(seatType === "seater"){
        return (
            <div className={`show-single-seat seater-seat ${reservedStatus}`} style={{gridRowStart: `${row+1}`, gridColumnStart: `${column+1}`}} onClick={handleClick}>
                <div className='top-seater-abs seater-abs'>

                </div>
                <div className='bottom-seater-abs seater-abs'>

                </div>
                {seatName}
            </div>
        )
    }

  return (
    <div className={`show-single-seat sleeper-seat ${reservedStatus} ${sleeperType}`} style={{gridRowStart: `${row+1}`, gridColumnStart: `${column+1}`, gridRowEnd: `${row+width+1}`, gridColumnEnd: `${column+length+1}`}} onClick={handleClick}>
        <div className='sleeper-abs'></div>
        {seatName}
    </div>
  )
}

export default SingleReservationSeat