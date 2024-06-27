import React, { useEffect, useState } from "react";
import "./basicTripConfig.css";
import PlainInput from "../../../../components/UI/PlainInput/PlainInput";
import SelectComponent from "../../../../components/UI/Select/SelectComponent";
import Button from "../../../../components/UI/Button/Button";
import Loader from "../../../../components/UI/Loader/Loader";
import { useGetAllBusesQuery } from "../../../../services/api";
import { useGlobalContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import Warning from "../../../../components/UI/Warning/Warning";

const convertToAvailableDays = (date) => {
  if(date === undefined) return ""
  let milliSec = new Date(date) - new Date()
  return Math.ceil(milliSec/(1000 * 60 * 60 * 24))
}

const BasicTripConfig = () => {
  const navigate = useNavigate();
  const [warningActive, setWarningActive] = useState(false)

  const {
    addTripDetails,
    setFrontendMessage,
    setAddTripDetails,
    optionValuePair,
    filterDataFromParam,
  } = useGlobalContext();

  // all bus data
  const {
    data: allBusFetch,
    isLoading: allBusFetchLoading,
    isFetching: allBusFetchFetching,
    isError: allBusFetchError,
    isSuccess: allBusFetchSuccess,
  } = useGetAllBusesQuery();

  const [allBusData, setAllBusData] = useState(allBusFetch?.buses || []);

  const [serviceName, setServiceName] = useState(
    addTripDetails?.serviceName || ""
  );
  const [bus, setBus] = useState({
    option: filterDataFromParam(allBusData, addTripDetails?.bus)?.regNo || "",
    value: addTripDetails?.bus,
  });
  const [availableTill, setAvailableTill] = useState(
    convertToAvailableDays(addTripDetails?.availableTill)
  );
  const [closeBooking, setCloseBooking] = useState(
    addTripDetails?.closeBooking || ""
  );

  const handleContinueClick = () => {
    if(availableTill.length === 0 || closeBooking===0 || serviceName.length === 0 || bus.value.length === 0){
      setFrontendMessage({status: "error", msg: "All the fields are compulsory"})
      return;
    }
    let date = new Date(new Date().getTime() + availableTill* 24*1000*60*60)
    setAddTripDetails({
      ...addTripDetails,
      availableTill: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
      nonOperatingDays: [],
      closeBooking: parseInt(closeBooking),
      serviceName,
      bus: bus.value,
    });
    navigate("/trip/add/route");
  };

  console.log(addTripDetails);
  const handleCancelClick = () => {
    setAddTripDetails({});
    navigate("/trip/all");
    localStorage.removeItem("addTripDetails");
  };


  useEffect(() => {
    allBusFetchSuccess && setAllBusData(allBusFetch?.buses || []);
  }, [allBusFetchSuccess]);

  useEffect(() => {
    setBus({
      option: filterDataFromParam(allBusData, addTripDetails?.bus)?.regNo || "",
      value: addTripDetails?.bus,
    });
  }, [allBusData]);

  // console.log(addTripDetails);
  if (allBusFetchLoading) {
    return <Loader />;
  }

  return (
    <>
    <div className="trip-form-wrapper">
      <div className="trip-row">
        <div className="trip-row-left">
          <div className="">Service Name</div>
        </div>
        <div className="trip-row-right">
          <PlainInput
            placeholder="Enter service name"
            value={serviceName}
            onchange={(e) => setServiceName(e.target.value)}
          />
        </div>
      </div>
      <div className="trip-row">
        <div className="trip-row-left">
          <div className="">Bus</div>
        </div>
        <div className="trip-row-right">
          <SelectComponent
            placeholder="Select among available buses"
            options={optionValuePair(allBusData, "regNo", "id")}
            selectValue={bus}
            setSelectValue={setBus}
          />
        </div>
      </div>
      <div className="trip-row">
        <div className="trip-row-left">
          <div className="">Schedule Booking</div>
        </div>
        <div className="trip-row-right with-content">
          Auto enable schedule for next
          <PlainInput
            placeholder="x days"
            size="mini"
            type="number"
            value={availableTill}
            onchange={(e) => setAvailableTill(e.target.value)}
          />
          days
        </div>
      </div>
      <div className="trip-row">
        <div className="trip-row-left">
          <div className="">Close Booking</div>
        </div>
        <div className="trip-row-right with-content">
          Auto close booking
          <PlainInput
            placeholder="x hour"
            size="mini"
            type="number"
            value={closeBooking}
            onchange={(e) => setCloseBooking(e.target.value)}
          />
          hours before departure
        </div>
      </div>
      <div className="trip-row btn-group-wrapper">
        <Button type="outlined" color="error" onClick={()=> setWarningActive(true)}>
          Discard
        </Button>
        <Button onClick={handleContinueClick}>Save and Continue</Button>
      </div>
    </div>
    <Warning isActive={warningActive} type="error" tagline="All the details saved will be lost" continueClick={handleCancelClick} cancelClick={()=> setWarningActive(false)}/>
    </>
  );
};

export default BasicTripConfig;
