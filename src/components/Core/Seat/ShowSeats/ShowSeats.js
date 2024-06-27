import React, { useEffect, useState } from "react";
import SingleSeat from "./SingleSeat";
import "./showSeat.css";
import Steering from "../../../../assets/steering.png";
import Title from "../../../UI/Title/Title";
import SingleReservationSeat from "./SingleReservationSeat";
import SelectComponent from "../../../UI/Select/SelectComponent";
import Button from "../../../UI/Button/Button";
import { useGlobalContext } from "../../../../context";

const ShowSeats = ({
  seats,
  index,
  actionType = "show",
  reservedSeats = [],
  setReservedSeats = null,
}) => {
  const {setFrontendMessage} = useGlobalContext()

  const [segregatedSeat, setSegregatedSeat] = useState([]);
  const [maxRow, setMaxRow] = useState(0);
  const [maxColumn, setMaxColumn] = useState(0);

  const [selectedSeat, setSelectedSeat] = useState({});
  const [reservationType, setReservationType] = useState({
    option: "",
    value: "",
  });

  const findSegregatedSeat = () => {
    let val = seats.filter((item) => {
      return item.index == index;
    });
    setSegregatedSeat(val);

    let maxRow = val.reduce(
      (v, seat) => {
        if (seat.row > v.row) return seat;
        return v;
      },
      { row: 0 }
    );
    let maxColumn = val.reduce(
      (v, seat) => {
        if (seat.column > v.column) return seat;
        return v;
      },
      { column: 0 }
    );
    setMaxRow(maxRow.row);
    setMaxColumn(maxColumn.column);
  };


  const handleReservationClick = () => {
    if(reservationType.value.length == 0){
      setFrontendMessage({status: "error", msg: "Please select the reservation type."})
      return;
    }

    const seatsWithoutCurr = reservedSeats.filter((item)=> {
      return item.seatName != selectedSeat.seatName
    })
    setReservedSeats([...seatsWithoutCurr, {seatName: selectedSeat.seatName, reservationType: reservationType.value}])
    setSelectedSeat({})
    setReservationType({option: "", value: ""})
  }

  useEffect(() => {
    findSegregatedSeat();
  }, [seats]);

  return (
    <>
      <div
        className="show-seats-container-wrapper"
        style={{
          display: `${segregatedSeat.length === 0 ? "none" : "block"}`,
        }}
      >
        <Title size="h5">{index}</Title>
        <div className="show-seats-outer-wrapper">
          <div className="steering">
            {index === "lower" && <img src={Steering} alt="steering wheel" />}
          </div>
          <div
            className="show-seats-wrapper"
            style={{
              gridTemplateRows: `repeat(${maxRow + 1}, 2rem)`,
              gridTemplateColumns: `repeat(${maxColumn + 1}, 2.5rem)`,
            }}
          >
            {segregatedSeat?.map((item, idx) => {
              const { row, column, seatType, seatName, length, width } = item;
              if (actionType === "show") {
                return (
                  <SingleSeat
                    key={idx}
                    {...{
                      row,
                      column,
                      seatName,
                      seatType,
                      length,
                      width,
                      seats,
                    }}
                  />
                );
              }
              return (
                <SingleReservationSeat
                  key={idx}
                  {...{
                    row,
                    column,
                    seatName,
                    seatType,
                    length,
                    width,
                    seats,
                    setSelectedSeat,
                    reservedSeats,
                    setReservedSeats,
                    selectedSeat
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      {actionType === "reserve" && Object.keys(selectedSeat).length > 0 && (
        <div className="select-seat-wrapper">
          <div className="seat-name primary-500 font-semibold">
            <span className="h6"> Seat Name: </span>
            {selectedSeat?.seatName}
          </div>
          <div className="seat-reservation-option-select">
            <SelectComponent
              options={["ladies", "vendor"]}
              selectValue={reservationType}
              setSelectValue={setReservationType}
              label="Reservation Type"
            />
          </div>
          <div className="m-y-m">
            <div className="row-btn-wrapper">
              <Button type="outlined" color="error" onClick={()=> setSelectedSeat({})}>Cancel</Button>
              <Button onClick={handleReservationClick}>Set Reservation</Button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowSeats;
