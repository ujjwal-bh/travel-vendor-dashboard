import React, { useEffect, useState } from "react";
import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import TripSearch from "../../components/Core/Trip/TripSearch/TripSearch";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./trip.css"
import { useNavigate } from "react-router-dom";
import { useGetAllTripsQuery } from "../../services/api";
import Loader from "../../components/UI/Loader/Loader";
import TripStrip from "../../components/Core/Trip/TripStrip/TripStrip";

const Trip = () => {
  const navigate = useNavigate()
  const {data: allTripsFetch, error: allTripsFetchError, isLoading: allTripsFetchLoading, isSuccess: allTripsFetchSuccess, isFetching: allTripsFetchFetching} = useGetAllTripsQuery()
  const [tripsData, setTripsData] = useState(allTripsFetch?.trips||[])
  console.log(tripsData);


  const handleAddTripClick = () => {
    navigate("/trip/add/basicTripConfig")
  }





  useEffect(()=> {
  allTripsFetchSuccess && setTripsData(allTripsFetch?.trips||[])
  }, [allTripsFetchSuccess])

  if(allTripsFetchLoading || allTripsFetchFetching){
    return (
      <Loader/>
    )
  }
  return (
    <div className="trip-outer-cover outer-cover">
      <div className="trip-top top-title">
        <Title>Trip Schedule</Title>
        <Button onClick={handleAddTripClick}>Add Trip Schedule</Button>
      </div>
      <div className="separator"></div>
      <TripSearch />

      <div className="table-outer trip-table-outer">
        <div className="table-row table-title-row h5 font-semibold dark-500">
          <div className="row-content table-title">Service Name</div>
          <div className="row-content table-title">Reg No</div>
          <div className="row-content table-title">Source</div>
          <div className="row-content table-title">Destination</div>
          <div className="row-content table-title">Dept time</div>
          <div className="row-content table-title">Arr time</div>
          <div className="row-content table-title">Status</div>
          <div className="small-row-val-title">click</div>

        </div>
        {/* this will be mapped div */}
        {
          tripsData?.map((item, idx)=> {
            const {serviceName, busInfo} = item;
            return <TripStrip/>
          })
        }
        {/* <div className="table-row table-content-row h6">
          <div className="row-content">Bangalore to Mysuru</div>
          <div className="row-content">KA 34 BV 1234</div>
          <div className="row-content">KR puram metro station, Mysuru</div>
          <div className="row-content">Mysuru palace, Mysore</div>
          <div className="row-content">10: 30, 23 Apr</div>
          <div className="row-content">08: 15, 24 Apr</div>
          <div className="row-content btn-content"><Button size="default">Active</Button></div>
          <div className="small-row-val"><FaAngleDoubleRight/></div>
        </div> */}
      </div>
    </div>
  );
};

export default Trip;
