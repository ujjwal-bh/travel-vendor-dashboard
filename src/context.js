import React, { useContext, useEffect, useState } from "react";
import { useGetCurrentVendorQuery, useGetStateCityQuery } from "./services/api";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const serverUrl = "https://omartravels.the-binaries.xyz";

  const [frontendMessage, setFrontendMessage] = useState({
    status: "",
    msg: "",
  });

  const [sidebarActive, setSidebarActive] = useState(false);

  const {
    data: currentVendorFetch,
    error: currentVendorFetchError,
    isSuccess: currentVendorFetchSuccess,
    isLoading: currentVendorFetchLoading,
    isFetching: currentVendorFetchFetching,
    refetch: currentVendorRefetch,
  } = useGetCurrentVendorQuery();

  const [vendorDetail, setVendorDetail] = useState(currentVendorFetch?.vendor);

  // object for adding trip
  const [addTripDetails, setAddTripDetails] = useState(JSON.parse(localStorage.getItem("addTripDetails"))|| {});

  useEffect(()=> {
    localStorage.setItem("addTripDetails", JSON.stringify(addTripDetails))
  }, [addTripDetails])



  useEffect(() => {
    currentVendorFetchSuccess && setVendorDetail(currentVendorFetch?.vendor);
  }, [currentVendorFetchSuccess, currentVendorFetch]);




  useEffect(() => {
    if (frontendMessage.status.length > 0) {
      setTimeout(() => {
        setFrontendMessage({ status: "", msg: "" });
      }, 3000);
    }
  }, [frontendMessage]);

  const verifyLogin = () => {
    currentVendorRefetch();
  };



  // function to group array based on parameter
  const groupBy = (list, keyGetter) => {
    const map = new Map();
    list?.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return [...map.entries()];
  };

  const optionValuePair = (data, p1, p2) => {
    let temp = [];

    if(data?.length > 0){
      for(const item of data){
        temp.push({option: item[p1], value: item[p2]})
      }
    }
    return temp;


  }
  const filterDataFromParam = (data,id) => {
    let val = data?.filter((item)=> {
      return item.id === id
    })
    if(val?.length > 0){
      return val[0]
    }
    return {};
  }


  return (
    <AppContext.Provider
      value={{
        serverUrl,
        groupBy,
        frontendMessage,
        setFrontendMessage,
        vendorDetail,
        verifyLogin,
        currentVendorFetchError,
        currentVendorFetchLoading,
        currentVendorFetchFetching,
        currentVendorFetchSuccess,
        sidebarActive,
        setSidebarActive,
        addTripDetails,
        setAddTripDetails,
        optionValuePair,
        filterDataFromParam
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
