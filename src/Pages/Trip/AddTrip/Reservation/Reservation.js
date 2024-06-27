import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context";
import { useCreateTripMutation, useGetSingleBusQuery } from "../../../../services/api";
import Loader from "../../../../components/UI/Loader/Loader";
import ShowSeats from "../../../../components/Core/Seat/ShowSeats/ShowSeats";
import "./reservation.css";
import Button from "../../../../components/UI/Button/Button";
import Warning from "../../../../components/UI/Warning/Warning"
import { useNavigate } from "react-router-dom";
const separateSeats = (seat, index) => {
  if (seat === undefined || seat.length == 0) return [];
  let separatedSeat = seat.filter((item) => {
    return item.index === index;
  });
  return separatedSeat;
};

const Reservation = () => {
  const navigate = useNavigate()
  const { addTripDetails, setAddTripDetails, setFrontendMessage } = useGlobalContext();
  const [isBusAvailable, setIsBusAvailable] = useState(
    addTripDetails.bus ? true : false
  );
  const {
    data: singleBusFetch,
    isError: singleBusFetchError,
    isLoading: singleBusFetchLoading,
    isSuccess: singleBusFetchSuccess,
  } = useGetSingleBusQuery(addTripDetails?.bus);

  const [createTrip, {error: createTripError, isLoading: createTripLoading, isSuccess: createTripSuccess}] = useCreateTripMutation()

  const [lowerSeats, setLowerSeats] = useState(
    separateSeats(singleBusFetch?.bus?.busTypeInfo?.seats, "lower")
  );
  const [upperSeats, setUpperSeats] = useState(
    separateSeats(singleBusFetch?.bus?.busTypeInfo?.seats, "upper")
  );
  const [reservedSeats, setReservedSeats] = useState(addTripDetails?.reservedSeats || []);
  const [warningActive, setWarningActive] = useState(false)


  useEffect(() => {
    if (singleBusFetchSuccess) {
      setLowerSeats(
        separateSeats(singleBusFetch?.bus?.busTypeInfo?.seats, "lower")
      );
      setUpperSeats(
        separateSeats(singleBusFetch?.bus?.busTypeInfo?.seats, "upper")
      );
    }
  }, [singleBusFetchSuccess]);

  const handleContinueClick= () => {
    setAddTripDetails({...addTripDetails, reservedSeats})
    setWarningActive(true)

  }

  const handleCreateTrip = async () => {
    console.log(addTripDetails);
      const data = await createTrip(addTripDetails)
      if(data?.error){
        setFrontendMessage({status: "error", msg: data?.error?.data?.message})
      }
      setWarningActive(false)
  }

  useEffect(()=> {
    if(createTripSuccess){
      localStorage.removeItem("addTripDetails")
      navigate("/trip/all")
    }
  }, [createTripSuccess])

  useEffect(()=> {
    setIsBusAvailable(
        addTripDetails.bus ? true : false
      );
      setReservedSeats(addTripDetails?.reservedSeats || [])
  }, [addTripDetails])



  if (!isBusAvailable) {
    return (
      <div className="trip-form-wrapper no-data">
        No bus selected to add reservation
      </div>
    );
  }
  if (singleBusFetchLoading || createTripLoading) {
    return <Loader />;
  }
  return (
    <>
    <div className="trip-form-wrapper">
      <div className="appendix-outer">
        <div className="appendix-wrapper">
          <div className="box ladies"></div>
          <div>ladies</div>
        </div>
        <div className="appendix-wrapper">
          <div className="box vendor"></div>
          <div>Personal</div>
        </div>
      </div>
      <div className="reservation-seats-wrapper">
        <ShowSeats
          index="lower"
          seats={lowerSeats}
          actionType="reserve"
          {...{ reservedSeats, setReservedSeats }}
        />
      </div>
      <div className="reservation-seats-wrapper">
        <ShowSeats
          index="upper"
          seats={upperSeats}
          actionType="reserve"
          {...{ reservedSeats, setReservedSeats }}
        />
      </div>
      <div className="trip-row btn-group-wrapper">
        <Button type="outlined" color="error" onClick={()=> navigate(-1)}>
          Back
        </Button>
        <Button onClick={handleContinueClick}>Create Trip</Button>
      </div>
    </div>
    <Warning isActive={warningActive} cancelClick={()=> setWarningActive(false)} continueClick={handleCreateTrip} type="success" tagline="Check the details properly before creating the trip"/>
    </>
  );
};

export default Reservation;
