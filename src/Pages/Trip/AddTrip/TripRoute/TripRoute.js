import React, { useEffect, useState } from "react";
import "./tripRoute.css";
import Address from "../../../../components/Core/Trip/Address/Address";
import Button from "../../../../components/UI/Button/Button";
import { useGetAllCitiesQuery } from "../../../../services/api";
import { useGlobalContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/UI/Loader/Loader";

const TripRoute = () => {
  const navigate = useNavigate()
  const { addTripDetails, setAddTripDetails, setFrontendMessage } = useGlobalContext();
  const {
    data: allCityFetch,
    isError: allCityFetchError,
    isFetching: allCityFetchFetching,
    isLoading: allCityFetchLoading,
    isSuccess: allCityFetchSuccess,
  } = useGetAllCitiesQuery();

  const [allCityData, setAllCityData] = useState(allCityFetch?.cities);
  const [pickupCity, setPickupCity] = useState(addTripDetails?.pickupCity || "")
  const [dropCity, setDropCity] = useState(addTripDetails?.dropCity || "")

  const [pickupAddress, setPickUpAddress] = useState(addTripDetails?.pickupPoints || []);
  const [dropAddress, setDropAddress] = useState(addTripDetails?.dropPoints || []);

  const handleContinueClick = () => {
    if(pickupCity.length === 0 || dropCity.length===0 || pickupAddress.length === 0 || dropAddress.length===0){
      setFrontendMessage({status: "error", msg: "All fields are compulsory"})
      return;
    }
    setAddTripDetails({...addTripDetails, pickupPoints: pickupAddress, dropPoints: dropAddress, pickupCity, dropCity})
    navigate("/trip/add/fare")
  };
  useEffect(() => {
    allCityFetchSuccess && setAllCityData(allCityFetch?.cities);
  }, [allCityFetchSuccess]);

  useEffect(()=> {
    setPickupCity(addTripDetails?.pickupCity || "")
  setDropCity(addTripDetails?.dropCity || "")

  setPickUpAddress(addTripDetails?.pickupPoints || []);
  setDropAddress(addTripDetails?.dropPoints || []);
  },[addTripDetails])




  if(allCityFetchLoading || allCityFetchFetching){
    return(
      <Loader/>
    )
  }


  return (
    <div className="trip-form-wrapper">
      <div className="pickup-address-outer-wrapper">
        <Address
          type="Pickup"
          allCityData={allCityData}
          address={pickupAddress}
          setAddress={setPickUpAddress}
          setCityId={setPickupCity}
          cityId={pickupCity}
        />
      </div>
      <div className="drop-address-outer-wrapper">
        <Address
          type="Drop"
          allCityData={allCityData}
          address={dropAddress}
          setAddress={setDropAddress}
          setCityId={setDropCity}
          cityId={dropCity}

        />
      </div>
      <div className="trip-row btn-group-wrapper">
        <Button type="outlined" color="error" onClick={()=> navigate(-1)}>
          Back
        </Button>
        <Button onClick={handleContinueClick}>Save and Continue</Button>
      </div>
    </div>
  );
};

export default TripRoute;
