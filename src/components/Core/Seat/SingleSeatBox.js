import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SingleSeatBox = ({
  initialRow,
  initialColumn,
  seats,
  setSeats,
  index = "lower",
}) => {
  const [row, setRow] = useState(initialRow);
  const [column, setColumn] = useState(initialColumn);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("normal");
  const [name, setName] = useState("");
  const [seatType, setSeatType] = useState("");
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);

  const singleSeatRef = useRef();
  const divRef = useRef();

  const handleClick = () => {
    if (divRef.current.className.includes("active")) {
      setActive(false);
      singleSeatRef.current.blur();
    } else {
      setActive(true);
      singleSeatRef.current.focus();
    }
  };

  const checkSleeperSeatType = (curr, given) => {
    if (curr.row === given.row) {
      return "horizontal";
    } else return "vertical";
  };

  const checkRepeatWhileAdding = (singleSeat) => {
    for (let i = 0; i < seats.length; i++) {
      let curr = seats[i];
      if (singleSeat.row === curr.row && singleSeat.column == curr.column) {
        return true;
      }
    }
    return false;
  };

  const checkSleeperOrError = (singleSeat) => {
    for (let i = 0; i < seats.length; i++) {
      let curr = seats[i];
      if (singleSeat.seatName === curr.seatName) {
        if (singleSeat.row === curr.row) {
          if (Math.abs(singleSeat.column - curr.column) != 1) return "error";
          else return "sleeper"
        } else if (singleSeat.column === curr.column) {
          if (Math.abs(singleSeat.row - curr.row) != 1) return "error";
          else return "sleeper";
        } else return "error"
      }
    }
    return "distinct";
  };


  // this is for useEffect to remove the seat while removing sleeper seats
  const checkIfSeatIsInTheList = () => {
    for(let i=0; i< seats.length; i++){
      let curr = seats[i]
      if(curr.seatName === name) return true;
    }
    return false;
  }
  const checkSeatForColor = (currSeat) => {
    for(let i=0; i< seats.length; i++){
        let curr = seats[i]
        if(curr.seatName === currSeat.seatName && curr.seatType === "sleeper"){
            color != "error" && setColor("sleeper")
            return;
        }
    }
    setColor("normal")

  }

  const handleSleeperSeatsubmit = (currSeat, allSeat) => {
    const valWithoutSeat = allSeat.filter((item) => {
      return !(item.seatName === currSeat.seatName);
    });
    const valWithSeat = allSeat.filter((item) => {
      return item.seatName === currSeat.seatName;
    });
    valWithSeat.seatType = "sleeper";
    currSeat.width = Math.abs(currSeat.row - valWithSeat[0].row) + 1;
    currSeat.length = Math.abs(currSeat.column - valWithSeat[0].column) + 1;
    setLength(currSeat.length);
    setWidth(currSeat.width);
    currSeat.seatType = "sleeper";
    setSeatType("sleeper");
    if (checkSleeperSeatType(valWithSeat[0], currSeat) === "horizontal") {
      currSeat.column = Math.min(currSeat.column, valWithSeat[0].column);
      setColumn(currSeat.column);
    } else if (
      checkSleeperSeatType(valWithSeat[0], currSeat) === "vertical"
    ) {
      currSeat.row = Math.min(currSeat.row, valWithSeat[0].row);
      setRow(currSeat.row);
    }
  setSeats([...valWithoutSeat, currSeat]);
  setColor("sleeper")
  }


  const handleSubmitClick = (e) => {
    e.preventDefault();
    let currSeat = {
      seatName: name,
      row,
      column,
      seatType: seatType,
      length,
      width,
      index,
    };
    currSeat.seatType = "seater";
    setSeatType("seater");

    if (checkRepeatWhileAdding(currSeat)) {
      const val = seats.filter((item) => {
        return !(item.row === currSeat.row && item.column === currSeat.column);
      });
      if (name.length > 0) {
        const status = checkSleeperOrError(currSeat);
        if (status === "sleeper") {
          const val = seats.filter((item) => {
            return !(item.row === currSeat.row && item.column === currSeat.column);
          });
          handleSleeperSeatsubmit(currSeat, val)
        } else{
          setSeats([...val, currSeat]);
        }
      } else {
        setSeats(val);

      }
    } else {
      const status = checkSleeperOrError(currSeat);
      if (status === "sleeper") {
        handleSleeperSeatsubmit(currSeat, seats)
      } else if(status === "error"){
        setColor("error")
      }
       else{
          if(currSeat.seatName.length > 0){
            setSeats([...seats, currSeat]);
            setColor("seater")
          } else {
            setColor("normal")
          }

      }
    }
    setActive(false)
    singleSeatRef.current.blur()
  };

  useEffect(()=> {
    if(checkIfSeatIsInTheList() === false){
      setName("")
      setRow(initialRow)
      setColumn(initialColumn)
      setSeatType("")
    }
      let currSeat = {
        seatName: name,
        row,
        column,
        seatType: seatType,
        length,
        width,
        index,
      };
      checkSeatForColor(currSeat)
  }, [seats])

  return (
    <div className="single-seat-wrapper" onClick={handleClick}>
      {
        <form
          className={`single-seat-form ${active && "active"}`}
          ref={divRef}
          onSubmit={handleSubmitClick}
        >
          <input
            className={`single-seat-input
            ${!active && name.length > 0 && "active"}
            ${color}
            `}
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={singleSeatRef}
          />
        </form>
      }
    </div>
  );
};

export default SingleSeatBox;
