import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button/Button";
import Title from "../../../../components/UI/Title/Title";
import PlainInput from "../../../../components/UI/PlainInput/PlainInput";
import "./tripFare.css";
import SpecificFare from "../../../../components/Core/SpecificFare/SpecificFare";
import { useGlobalContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const TripFare = () => {
  const navigate = useNavigate()

  const { addTripDetails, setAddTripDetails, setFrontendMessage } =
    useGlobalContext();
  const [seaterUpper, setSeaterUpper] = useState(
    addTripDetails?.fare?.seaterUpper || ""
  );
  const [seaterLower, setSeaterLower] = useState(
    addTripDetails?.fare?.seaterLower || ""
  );
  const [sleeperLower, setSleeperLower] = useState(
    addTripDetails?.fare?.sleeperLower || ""
  );
  const [sleeperUpper, setSleeperUpper] = useState(
    addTripDetails?.fare?.sleeperUpper || ""
  );

  const [updatedFares, setUpdatedFares] = useState(
    addTripDetails?.updatedFares || []
  );

  const [currentFareToUpdate, setCurrentFareToUpdate] = useState({})
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
    let fare = {
      seaterLower,
      seaterUpper,
      sleeperLower,
      sleeperUpper,
    };
    setAddTripDetails({ ...addTripDetails, fare });
    setFrontendMessage({ status: "success", msg: "Fare saved successfully" });
  };
  // console.log(addTripDetails);

  const handleDiscardFareClick = () => {
    if (addTripDetails?.fare) {
      delete addTripDetails.fare;
      setFrontendMessage({ status: "success", msg: "previous fare discarded" });
    } else {
      setFrontendMessage({ status: "error", msg: "No saved fare" });
    }
  };

  const handleUpdateFareClick = (date) => {
    let val = updatedFares.filter((item)=> {
      return item.date === date
    })
    console.log({val});
    setCurrentFareToUpdate(val[0])
  }

  useEffect(() => {
    setSeaterUpper(addTripDetails?.fare?.seaterUpper || "");
    setSeaterLower(addTripDetails?.fare?.seaterLower || "");
    setSleeperLower(addTripDetails?.fare?.sleeperLower || "");
    setSleeperUpper(addTripDetails?.fare?.sleeperUpper || "");

    setUpdatedFares(addTripDetails?.updatedFares || []);
  }, [addTripDetails]);

  console.log({updatedFares});

  return (
    <div className="trip-form-wrapper">
      <div className="fare-row-wrapper">
        <div className="fare-form-wrapper">
          <div className="fare-title">
            <Title size="h4">Add Seating Fare</Title>
          </div>
          <div className="fare-form">
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
        <div className="fare-form-wrapper">
          <SpecificFare {...{ updatedFares, setUpdatedFares, currentFareToUpdate, setCurrentFareToUpdate }} />
        </div>
        <div className="altering-fare-dates">
          {
            updatedFares?.map((item, idx)=> {
              const val = item?.date.split('/')
              console.log(item?.date);
              return <span key={idx} onClick={()=> handleUpdateFareClick(item?.date)}>{val[1]} {monthNames[val[0]-1]}, {val[2]}</span>
            })
          }
        </div>
      </div>
      <div className="trip-row btn-group-wrapper">
        <Button type="outlined" color="error" onClick={()=> navigate(-1)}>
          Back
        </Button>
        <Button onClick={()=> navigate("/trip/add/operatingDays")}>Continue</Button>
      </div>
    </div>
  );
};

export default TripFare;
