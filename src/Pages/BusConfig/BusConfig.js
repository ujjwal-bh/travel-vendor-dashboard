import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader";
import Title from "../../components/UI/Title/Title";
import {
  useGetAllBusesQuery,
  useGetAllBusTypesQuery,
} from "../../services/api";
import "./busConfig.css";

const BusConfig = () => {
  const navigate = useNavigate();

  const {
    data: allBusTypesFetch,
    isError: allBusTypesFetchError,
    isSuccess: allBusTypesFetchSuccess,
    isFetching: allBusTypesFetchFetching,
    isLoading: allBusTypesFetchLoading,
  } = useGetAllBusTypesQuery();
  const {
    data: allBusFetch,
    isError: allBusFetchError,
    isSuccess: allBusFetchSuccess,
    isFetching: allBusFetchFetching,
    isLoading: allBusFetchLoading,
  } = useGetAllBusesQuery();

  const [allBusTypesData, setAllBusTypesData] = useState(
    allBusTypesFetch?.busTypes
  );
  const [allBusData, setAllBusData] = useState(allBusFetch?.buses);

  useEffect(() => {
    allBusFetchSuccess && setAllBusData(allBusFetch?.buses);
    allBusTypesFetchSuccess && setAllBusTypesData(allBusTypesFetch?.busTypes);
  }, [allBusFetchSuccess, allBusTypesFetchSuccess]);
  const handleAddBusTypesClick = () => {
    navigate("/busConfig/busTypes/add");
  };
  const handleAddBusClick = () => {
    navigate("/busConfig/bus/add");
  };


  if (
    allBusTypesFetchFetching ||
    allBusTypesFetchLoading ||
    allBusFetchFetching ||
    allBusFetchLoading
  ) {
    return (
        <Loader />
    );
  }
  return (
    <div className="bus-config-container-outer outer-cover">
      <div className="bus-types-table-cover">
        <div className="bus-config-top top-title">
          <Title>Bus Types</Title>
          <Button onClick={handleAddBusTypesClick}>Add Bus types</Button>
        </div>
        <div className="separator"></div>
        <div className="table-outer bus-type-table-outer">
          <div className="table-row table-title-row h5 light-bg-100 font-semibold">
            <div className="row-content table-title">Type Name</div>
            <div className="row-content table-title">Type Detail</div>
          </div>
          {allBusTypesData?.map((item, index) => {
            const { name, vehicleMake, seatingType, features, hasAC, id } = item;
            return (
              <NavLink to={`/busConfig/busTypes/${id}/edit`} key={index}>
                <div className="table-row table-content-row h6" key={index}>
                  <div className="row-content">{name} </div>
                  <div className="row-content">
                    {vehicleMake} / {seatingType} / {hasAC ? "AC" : "Non-AC"} &nbsp;
                    {features?.map((item) => {
                      return `${item} `;
                    })}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="bus-table-cover">
        <div className="bus-config-top top-title">
          <Title>Operating Buses</Title>
          <Button onClick={handleAddBusClick}>Add Buses</Button>
        </div>
        <div className="separator"></div>
        <div className="table-outer bus-table-outer">
          <div className="table-row table-title-row h5 light-bg-100">
            <div className="row-content table-title">Reg No</div>
            <div className="row-content table-title">Bus Type</div>
            <div className="row-content table-title">Depo Name</div>
          </div>

          {allBusData?.map((item, index) => {
            const { regNo, busTypeInfo, depoName,id } = item;
            return (
              <NavLink to={`/busConfig/bus/${id}/edit`} key={index}>
              <div className="table-row table-content-row h6">
                <div className="row-content">{regNo}</div>
                <div className="row-content">{busTypeInfo?.name}</div>
                <div className="row-content">{depoName}</div>
              </div>

              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusConfig;
