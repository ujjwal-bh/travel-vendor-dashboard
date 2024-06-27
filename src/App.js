import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom"
import { useGlobalContext } from "./context";
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Details from "./Pages/Details/Details"
import OperatingCity from "./Pages/OperatingCity/OperatingCity"
import OperatinLocation from "./Pages/OperatingCity/OperatingLocation/OperatingLocation"
import EditDetails from "./Pages/EditDetails/EditDetails"
import EditLocation from "./Pages/OperatingCity/EditLocation/EditLocation";
import BusConfig from "./Pages/BusConfig/BusConfig"
import AddBusTypes from "./Pages/BusTypes/AddBusTypes/AddBusTypes";
import EditBusTypes from "./Pages/BusTypes/EditBusTypes/EditBusTypes";
import AddBus from "./Pages/Bus/AddBus/AddBus";
import EditBus from "./Pages/Bus/EditBus/EditBus";
import Trip from "./Pages/Trip/Trip";
import AddTrip from "./Pages/Trip/AddTrip/AddTrip";
import BasicTripConfig from "./Pages/Trip/AddTrip/BasicTripConfig/BasicTripConfig";
import TripRoute from "./Pages/Trip/AddTrip/TripRoute/TripRoute";
import TripFare from "./Pages/Trip/AddTrip/TripFare/TripFare"
import OperatingDays from "./Pages/Trip/AddTrip/OperatingDays/OperatingDays";
import Reservation from "./Pages/Trip/AddTrip/Reservation/Reservation";

function App() {
  const navigate = useNavigate()
  const {frontendMessage, currentVendorFetchError, currentVendorFetchLoading, currentVendorFetchFetching, currentVendorFetchSuccess} = useGlobalContext()

  useEffect(()=> {
    currentVendorFetchError && navigate("/login")
  }, [currentVendorFetchError])

  if(currentVendorFetchError?.status === 401 ){
    return (
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<Navigate to="/login"/>} />
        </Routes>
      </div>
  );
  }
  return (
    <div className="app">
       <div className={`error-message-container ${(frontendMessage?.status?.length > 0) && `active ${frontendMessage?.status}`}`}>{frontendMessage.msg}</div>
        {(!(currentVendorFetchFetching || currentVendorFetchLoading)) &&(
          <Routes>
            <Route path="/login" element={currentVendorFetchSuccess ? <Navigate to="/details"/>:<Login/>} />
            <Route path="/" element={<Home/>}>
              <Route path="details" element={<Details/>}/>
              <Route path="details/edit" element={<EditDetails/>}/>
              <Route path="operatingCity" element={<OperatingCity/>}/>
              <Route path="operatingCity/:cityId/addLocation" element={<OperatinLocation/>}/>
              <Route path="operatingCity/:cityId/locations/:locationId/edit" element={<EditLocation/>}/>
              <Route path="busConfig" element={<BusConfig/>}/>
              <Route path="busConfig/busTypes/add" element={<AddBusTypes/>}/>
              <Route path="busConfig/busTypes/:busTypeId/edit" element={<EditBusTypes/>}/>
              <Route path="busConfig/bus/add" element={<AddBus/>}/>
              <Route path="busConfig/bus/:busId/edit" element={<EditBus/>}/>
              <Route path="trip/all" element={<Trip/>}/>
              <Route path="trip/add" element={<AddTrip/>}>
                <Route path="basicTripConfig" element={<BasicTripConfig/>}/>
                <Route path="route" element={<TripRoute/>}/>
                <Route path="fare" element={<TripFare/>}/>
                <Route path="operatingDays" element={<OperatingDays/>}/>
                <Route path="reservation" element={<Reservation/>}/>
              </Route>
            </Route>
          </Routes>
        )
        
        }
    </div>
  );
}

export default App;
