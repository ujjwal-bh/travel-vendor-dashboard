import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import InputWithLabel from "../../../components/UI/InputWithLabel/InputWithLabel";
import SelectComponent from "../../../components/UI/Select/SelectComponent";
import Title from "../../../components/UI/Title/Title";
import Button from "../../../components/UI/Button/Button";
import TextArea from "../../../components/UI/TextArea/TextArea";
import { useDeleteCityLocationMutation, useGetAllLocationsQuery, useGetSingleCityQuery, useGetSingleLocationQuery, useUpdateCityLocationMutation } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/UI/Loader/Loader";
import { useGlobalContext } from "../../../context";


const EditLocation = () => {
    const navigate = useNavigate()
  const {cityId, locationId} = useParams() 
const {setFrontendMessage} = useGlobalContext()

  const {data: singleCityFetch, isLoading: singleCityFetchLoading, isFetching: singleCityFetchFetching,isSuccess: singleCityFetchSuccess} = useGetSingleCityQuery(cityId)

  const {data: singleLocationFetch, error: singleLocationFetchError, isSuccess: singleLocationFetchSuccess, isLoading: singleLocationFetchLoading, isFetching: singleLocationFetchFetching} = useGetSingleLocationQuery({cityId, locationId})
  




  const [editLocation, {error: editLocationError, isLoading: editLocationLoading, isSuccess: editLocationSuccess}] = useUpdateCityLocationMutation()
  const [deleteLocation, {error: deleteLocationError, isSuccess: deleteLocationSuccess, isLoading: deleteLocationLoading}] = useDeleteCityLocationMutation()
  const [city, setCity] = useState(singleCityFetch?.city)
  const [singleLocation, setSingleLocation] = useState(singleLocationFetch?.location)

  // values to add
  const [location, setLocation] = useState(singleLocationFetch?.location?.name || "");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [landmark, setLandmark] = useState("")

  const handleEditLocationClick = async () => {
    const val = {
        cityId,
        locationId,
        name: location,
        address,
        phone,
        landmark
      }
      await editLocation(val)
  }

  const handleDeleteLocationClick = async () => {
    await deleteLocation({cityId, locationId})
  }


  useEffect(()=> {
    singleCityFetchSuccess && setCity(singleCityFetch?.city)
  }, [singleCityFetchSuccess, singleCityFetch])

  useEffect(()=> {
    if(singleLocationFetchSuccess){
        setSingleLocation(singleLocationFetch?.location || "")
        setLocation(singleLocationFetch?.location?.name || "")
        setAddress(singleLocationFetch?.location?.address || "")
        setPhone(singleLocationFetch?.location?.phone || "")
        setLandmark(singleLocationFetch?.location?.landmark || "")
    }
  }, [singleLocationFetchSuccess, singleLocationFetch])


//   navigate on edit success
useEffect(()=> {
    (editLocationSuccess || deleteLocationSuccess) && navigate(`/operatingCity/${cityId}/addLocation`)
}, [editLocationSuccess, deleteLocationSuccess])


useEffect(()=> {
    editLocationError && setFrontendMessage({status: "error", msg: editLocationError?.data?.message})
    singleLocationFetchError && setFrontendMessage({status: "error", msg: singleLocationFetchError?.data?.message})
}, [editLocationError, singleLocationFetchError])

if(singleCityFetchFetching || singleCityFetchLoading || singleLocationFetchFetching || singleLocationFetchLoading || deleteLocationLoading || editLocationLoading){
  return (
      <Loader/>
  )
}
  

  return (
    <div className="operating-city-container-outer outer-cover">
      <div className="operating-location-top m-y-m">
        <Title backIcon={true}>{city?.name} ({singleLocation?.name})</Title>
      </div>
      <div className="separator"></div>
      <div className="operating-location-main">
        <div className="operating-city-form">
          <div className="info primary-500 para">
            {" "}
            <FaInfoCircle />{" "}
            <span>
              Please enter all the location details responsibly as this address
              is shown to users.
            </span>
          </div>

          <div className="location-form-container">
            <div className="form-control">
            <InputWithLabel
                placeholder="Enter the location name"
                label="Location"
                labelTag="select among the known location"
                value={location}
                onchange={(e)=> setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <InputWithLabel
                label="Name Of Place"
                placeholder="Enter the famous name of place"
                labelTag="Enter popular name of place so that passenger can identify"
                value={address}
                onchange={(e) => setAddress(e.target.value)}
                
              />
            </div>
            <div className="form-control">
              <InputWithLabel
                label="Contact Number"
                placeholder="Enter the contact details"
                labelTag="This number will be used by users to contact in case of any difficulty"
                value={phone}
                onchange={(e)=> setPhone(e.target.value)}
              />
            </div>
            <div className="form-control">
              <TextArea
                label="Landmark"
                labelTag="e.g. opposite to front gate of Taj Mahal"
                placeholder="Enter a landmark..."
                value={landmark}
                onchange={(e)=> setLandmark(e.target.value)}
              />
            </div>
            <div className="form-control form-btn-control">

                  <Button size="default" type="outlined" color="error" onClick={handleDeleteLocationClick} disabled={(deleteLocationSuccess || deleteLocationLoading) ? true: false}>
                    {
                        deleteLocationLoading? "Loading": "Delete"
                    }
                  </Button>
                <Button size="default" onClick={handleEditLocationClick} disabled={(editLocationSuccess || editLocationLoading) ? true: false}>
                    {
                        editLocationLoading? "Loading": "Save Location"
                    }
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLocation;
