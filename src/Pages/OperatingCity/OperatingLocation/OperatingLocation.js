import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import InputWithLabel from "../../../components/UI/InputWithLabel/InputWithLabel";
import SelectComponent from "../../../components/UI/Select/SelectComponent";
import Title from "../../../components/UI/Title/Title";
import "./operatingLocation.css";
import Button from "../../../components/UI/Button/Button";
import TextArea from "../../../components/UI/TextArea/TextArea";
import { useAddCityLocationMutation, useDeleteSingleCityMutation, useGetAllLocationsQuery, useGetSingleCityQuery } from "../../../services/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import Loader from "../../../components/UI/Loader/Loader";
import Warning from "../../../components/UI/Warning/Warning";


const OperatingLocation = () => {
  const {cityId} = useParams() 
  const navigate = useNavigate()
  const {frontendMessage, setFrontendMessage} = useGlobalContext()


  const {data: allLocationFetch,  isSuccess: allLocationFetchSuccess, isLoading: allLocationFetchLoading, isFetching: allLocationFetchFetching} = useGetAllLocationsQuery(cityId)
  const {data: singleCityFetch, isSuccess: singleCityFetchSuccess, error: singleCityFetchError, isLoading: singleCityFetchLoading, isFetching: singleCityFetchFetching} = useGetSingleCityQuery(cityId)
  const [addLocation, {error: addLocationError, isLoading: addLocationLoading, isSuccess: addLocationSuccess}] = useAddCityLocationMutation()
  const [deleteCity, {error: deleteCityError, isLoading: deleteCityLoading, isSuccess: deleteCitySuccess}] = useDeleteSingleCityMutation()


  const [city, setCity] = useState(singleCityFetch?.city)
  const [allLocation, setAllLocation] = useState(allLocationFetch?.locations)

  // trigger warning 
  const [warningActive, setWarningActive] = useState(false)


  // values to add
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [landmark, setLandmark] = useState("")

  const handleAddLocationClick = async () => {
    const val = {
      _id: cityId,
      name: location,
      address,
      phone,
      landmark
    }
    await addLocation(val)
  }

  const openWarning = () => {
    setWarningActive(true)
  }
  const handleDeleteCityClick = async() => {
    setWarningActive(false)
    await deleteCity(cityId)
  }

  // set all location data
  useEffect(()=> {
      allLocationFetchSuccess && setAllLocation(allLocationFetch?.locations)
  }, [allLocationFetchSuccess, allLocationFetch])

  useEffect(()=> {
    singleCityFetchSuccess && setCity(singleCityFetch?.city)
  }, [singleCityFetchSuccess, singleCityFetch])

  useEffect(()=> {
      if(addLocationSuccess){
        setLocation("")
        setAddress("")
        setPhone("")
        setLandmark("")
      }
  }, [addLocationSuccess])

  useEffect(()=> {
    deleteCitySuccess && navigate("/operatingCity")
  }, [deleteCitySuccess])

  // handle error
  useEffect(()=> {
    addLocationError && setFrontendMessage({status: "error", msg: addLocationError?.data?.message})
    deleteCityError && setFrontendMessage({status: "error", msg: deleteCityError?.data?.message})
    singleCityFetchError && setFrontendMessage({status: "error", msg: singleCityFetchError?.data?.message})
  }, [addLocationError, deleteCityError])  


  if(addLocationLoading || deleteCityLoading || singleCityFetchFetching || singleCityFetchLoading || allLocationFetchFetching || allLocationFetchLoading){
    return (
        <Loader/>
    )
  }
  return (
    <div className="operating-city-container-outer outer-cover">
      <div className="operating-location-top top-title m-y-m">
        <Title backIcon={true}>{city?.name}</Title>
        <Button onClick={openWarning} disabled={deleteCityLoading ? true: false}>
          Delete City
        </Button>
      </div>

      <Warning isActive={warningActive} tagline="All the locations associated will also be deleted." continueClick={handleDeleteCityClick} cancelClick={()=> setWarningActive(false)} isDisabled={deleteCityLoading || deleteCitySuccess}/>
      <div className="separator"></div>
      <div className="operating-location-main">
        <div className="operating-location-left font-regular primary-500 h5 ">
          {
            allLocation?.map((item, index)=> {
              const {name, id} = item;
              return <NavLink key={index} to={`/operatingCity/${cityId}/locations/${id}/edit`} className="primary-500"><div className="location-list-item click">{name}</div></NavLink>
            })
          }
          
        </div>
        <div className="operating-location-right">
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
                <Button size="default" onClick={handleAddLocationClick} disabled={(addLocationLoading) ? true: false}>
                  {
                    (addLocationLoading ? "Loading" : "Save Location")
                  }
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingLocation;
