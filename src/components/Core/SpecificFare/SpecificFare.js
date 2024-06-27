import React, { useEffect, useState } from "react";
import Title from "../../UI/Title/Title";
import PlainInput from "../../UI/PlainInput/PlainInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../UI/Button/Button";
import "./specificFare.css";
import { FaCalendar } from "react-icons/fa";
import { useGlobalContext } from "../../../context";

const SpecificFare = ({
  updatedFares,
  setUpdatedFares,
  currentFareToUpdate,
  setCurrentFareToUpdate,
}) => {
  const { setFrontendMessage, addTripDetails, setAddTripDetails } =
    useGlobalContext();
    console.log(currentFareToUpdate);
  const [startDate, setStartDate] = useState(
    currentFareToUpdate?.date ? new Date(currentFareToUpdate?.date) : ""
  );
  const [seaterUpper, setSeaterUpper] = useState(
    currentFareToUpdate?.fare?.seaterUpper || ""
  );
  const [seaterLower, setSeaterLower] = useState(
    currentFareToUpdate?.fare?.seaterLower || ""
  );
  const [sleeperLower, setSleeperLower] = useState(
    currentFareToUpdate?.fare?.sleeperLower || ""
  );
  const [sleeperUpper, setSleeperUpper] = useState(
    currentFareToUpdate?.fare?.sleeperUpper || ""
  );

  const handleAddFareClick = () => {
    if (
      isNaN(seaterLower) ||
      isNaN(seaterUpper) ||
      isNaN(sleeperLower) ||
      isNaN(sleeperUpper) ||
      seaterLower.length === 0 ||
      seaterUpper.length === 0 ||
      sleeperLower.length === 0 ||
      sleeperUpper.length === 0
    ) {
      setFrontendMessage({
        status: "error",
        msg: "Fare should be a valid price",
      });
      return;
    }
    let val = updatedFares.filter((item) => {
      return item?.date != currentFareToUpdate?.date;
    });
    let updatedFare = {
      date: `${
        startDate.getMonth()+1
      }/${startDate?.getDate()}/${startDate.getFullYear()}`,
      fare: {
        seaterLower,
        seaterUpper,
        sleeperLower,
        sleeperUpper,
      },
    };
    setUpdatedFares([...val, updatedFare]);
    setAddTripDetails({
      ...addTripDetails,
      updatedFares: [...val, updatedFare],
    });

    setCurrentFareToUpdate({});
  };

  const handleDiscardFareClick = () => {
    let val = updatedFares.filter((item) => {
      return item?.date != currentFareToUpdate?.date;
    });
    setUpdatedFares(val);
    setAddTripDetails({ ...addTripDetails, updatedFares: val });
    setCurrentFareToUpdate({});
  };

  useEffect(() => {
    setStartDate(
      currentFareToUpdate?.date ? new Date(currentFareToUpdate?.date) : ""
    );
    setSeaterUpper(currentFareToUpdate?.fare?.seaterUpper || "");
    setSeaterLower(currentFareToUpdate?.fare?.seaterLower || "");
    setSleeperLower(currentFareToUpdate?.fare?.sleeperLower || "");
    setSleeperUpper(currentFareToUpdate?.fare?.sleeperUpper || "");
  }, [currentFareToUpdate]);

  return (
    <div className="specific-fare-wrapper">
      <div className="fare-title">
        <Title size="h4">
          Add Seating Fare For Specific Day{" "}
          <span className="h6">(optional)</span>
        </Title>
      </div>
      <div className="fare-form specific-fare-form">
        <div className="fare-date-picker-wrapper">
          <div className="row-left">Pick a date</div>
          <div className="row-right">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date-picker fare-date-picker"
              placeholderText="Pick a date"
            />
            <FaCalendar />
          </div>
        </div>

        <div className="row-wrapper">
          <div className="row-left">Seater Upper</div>
          <div className="row-right">
            <PlainInput
              placeholder="Upper seater price"
              value={seaterUpper}
              onchange={(e) => setSeaterUpper(e.target.value)}
            />
          </div>
        </div>
        <div className="row-wrapper">
          <div className="row-left">Seater Lower</div>
          <div className="row-right">
            <PlainInput
              placeholder="Lower seater price"
              value={seaterLower}
              onchange={(e) => setSeaterLower(e.target.value)}
            />
          </div>
        </div>
        <div className="row-wrapper">
          <div className="row-left">Sleeper Upper</div>
          <div className="row-right">
            <PlainInput
              placeholder="Upper sleeper price"
              value={sleeperUpper}
              onchange={(e) => setSleeperUpper(e.target.value)}
            />
          </div>
        </div>
        <div className="row-wrapper">
          <div className="row-left">Sleeper Lower</div>
          <div className="row-right">
            <PlainInput
              placeholder="Lower sleeper price"
              value={sleeperLower}
              onchange={(e) => setSleeperLower(e.target.value)}
            />
          </div>
        </div>
        <div className="row-wrapper row-btn-wrapper">
          <Button
            type="outlined"
            color="error"
            size="default"
            onClick={handleDiscardFareClick}
          >
            Discard
          </Button>
          <Button size="default" onClick={handleAddFareClick}>
            Save Fare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecificFare;
