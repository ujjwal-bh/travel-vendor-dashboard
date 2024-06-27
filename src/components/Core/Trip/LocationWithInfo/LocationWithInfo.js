import React, { useEffect, useState } from "react";
import "./locationWithInfo.css";
import Button from "../../../UI/Button/Button";
import { useGetSingleLocationQuery } from "../../../../services/api";

const LocationWithInfo = ({location, time, cityId, address, setAddress, type, dropDay}) => {

  const {data: singleLocationFetch, isLoading, isError, isSuccess} = useGetSingleLocationQuery({cityId, locationId: location})


  const [singleLocationData, setSingleLocationData] = useState(singleLocationFetch?.location || {})
    const [active, setActive] = useState(false)

    const handleCancelClick = () => {
        setActive(false)
    }
    const handleRemoveLocationClick = () => {
      let val = address?.filter((item)=> {
        return item.location != location
      })
      setAddress(val)
    }


    useEffect(()=> {
        isSuccess && setSingleLocationData(singleLocationFetch?.location || {})
    }, [isSuccess])
  return (
    <div className="location-with-info-wrapper">
      <div className="h5 primary-500 click" onClick={()=> setActive(true)}>{singleLocationData?.name}</div>
      <div className={`location-absolute-container ${active ? "active" : "inactive"}`}>
        <div className="location-absolute-top">Location Info</div>
        <div className="location-absolute-main">
          <div className="location-absolute-row-wrapper">
            <div className="row-left">Location</div>
            <div className="row-right">{singleLocationData?.name}</div>
          </div>
          <div className="location-absolute-row-wrapper">
            <div className="row-left">Address</div>
            <div className="row-right">{singleLocationData?.address}</div>
          </div>
          <div className="location-absolute-row-wrapper">
            <div className="row-left">Landmark</div>
            <div className="row-right">{singleLocationData?.landmark}</div>
          </div>
          <div className="location-absolute-row-wrapper">
            <div className="row-left">Pickup time</div>
            <div className="row-right">{time}

            {(type==="Drop" && dropDay > 0) && <span className="h6 p-x-s">{dropDay === 1 ? "Next day": "Third Day"}</span>}

            </div>
          </div>
          <div className="location-absolute-row-wrapper btn-wrapper">
            <Button type="outlined" color="error" onClick={handleCancelClick}>Cancel</Button>
            <Button color="error" onClick={handleRemoveLocationClick}>Remove Location</Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LocationWithInfo;
