import React from "react";
import "./seat.css";
import Title from "../../UI/Title/Title";
import SingleSeatBox from "./SingleSeatBox";
import ShowSeats from "./ShowSeats/ShowSeats";

const Seat = ({ row = 6, column = 15, seats, setSeats, deck = "lower" }) => {
  const temp = [];
  for (let i = 0; i < row; i++) {
    let curr = [];
    for (let j = 0; j < column; j++) {
      curr.push(
        <SingleSeatBox
          initialRow={i}
          initialColumn={j}
          setSeats={setSeats}
          seats={seats}
          index={deck}
        />
      );
    }
    temp.push(curr);
  }
  return (
    <>
      <Title>{deck}</Title>
      <div className="seat-outer">
        <div className="outer-seat-wrapper">
          {temp.map((item, index) => {
            return (
              <div className="seat-row-wrapper" key={index}>
                {item.map((rowItem, index) => {
                  return <div key={index}>{rowItem} </div>;
                })}
              </div>
            );
          })}
        </div>
        <ShowSeats index={deck} seats={seats} />
      </div>
    </>
  );
};

export default Seat;
