import React, { useEffect, useState } from "react";
import Title from "../../../components/UI/Title/Title";
import SelectComponent from "../../../components/UI/Select/SelectComponent";
import InputWithLabel from "../../../components/UI/InputWithLabel/InputWithLabel";
import Button from "../../../components/UI/Button/Button";
import MultiSelect from "../../../components/UI/MultiSelect/MultiSelect";
import {
  useDeleteSingleBusTypeMutation,
  useGetSingleBusTypeQuery,
  useUpdateSingleBusTypeMutation,
} from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { statusCodeToMsg } from "../../../utils";
import Loader from "../../../components/UI/Loader/Loader";
import Warning from "../../../components/UI/Warning/Warning";
import ShowSeats from "../../../components/Core/Seat/ShowSeats/ShowSeats";

const EditBusTypes = () => {
  const { busTypeId } = useParams();
  const navigate = useNavigate();

  const [warningActive, setWarningActive] = useState(false);

  const {
    data: singleBusTypeFetch,
    isLoading: singleBusTypeFetchLoading,
    isFetching: singleBusTypeFetchFetching,
    isSuccess: singleBusTypeFetchSuccess,
    isError: singleBusTypeFetchError,
  } = useGetSingleBusTypeQuery(busTypeId);

  const [
    updateSingleBusType,
    {
      isError: updateSingleBusTypeError,
      isLoading: updateSingleBusTypeLoading,
      isSuccess: updateSingleBusTypeSuccess,
    },
  ] = useUpdateSingleBusTypeMutation();

  const [
    deleteBusType,
    {
      error: deleteBusTypeError,
      isLoading: deleteBusTypeLoading,
      isSuccess: deleteBusTypeSuccess,
    },
  ] = useDeleteSingleBusTypeMutation();

  const [busTypeName, setBusTypeName] = useState(
    singleBusTypeFetch?.busType?.name || ""
  );
  const [vehicleMake, setVehicleMake] = useState({
    option: singleBusTypeFetch?.busType?.vehicleMake || "",
    value: singleBusTypeFetch?.busType?.vehicleMake || "",
  });
  const [seatingType, setSeatingType] = useState({
    option: singleBusTypeFetch?.busType?.seatingType || "",
    value: singleBusTypeFetch?.busType?.seatingType || "",
  });
  const [otherDetails, setOtherDetails] = useState(
    singleBusTypeFetch?.busType?.features || []
  );
  const [seats, setSeats] = useState(singleBusTypeFetch?.busType?.seats || []);
  const [ac, setAc] = useState({
    option: singleBusTypeFetch?.busType?.hasAC.toString() || "false",
    value: singleBusTypeFetch?.busType?.hasAC || false,
  });

  const handleEditBusTypes = async () => {
    await updateSingleBusType({
      singleBusTypeId: busTypeId,
      name: busTypeName,
      vehicleMake: vehicleMake.value,
      seatingType: seatingType.value,
      features: otherDetails,
      hasAC: ac.value,
    });
  };

  const handleWarningActive = () => {
    setWarningActive(true);
  };
  const handleDeleteBusTypes = async () => {
    await deleteBusType({ singleBusTypeId: busTypeId });
  };

  useEffect(() => {
    (updateSingleBusTypeSuccess || deleteBusTypeSuccess) &&
      navigate("/busConfig");
  }, [deleteBusTypeSuccess, updateSingleBusTypeSuccess]);

  useEffect(() => {
    if (singleBusTypeFetchSuccess) {
      setBusTypeName(singleBusTypeFetch?.busType?.name || "");
      setVehicleMake({
        option: singleBusTypeFetch?.busType?.vehicleMake || "",
        value: singleBusTypeFetch?.busType?.vehicleMake || "",
      });
      setSeatingType({
        option: singleBusTypeFetch?.busType?.seatingType || "",
        value: singleBusTypeFetch?.busType?.seatingType || "",
      });
      setOtherDetails(singleBusTypeFetch?.busType?.features || []);
      setAc({
        option: singleBusTypeFetch?.busType?.hasAC.toString() || "false",
        value: singleBusTypeFetch?.busType?.hasAC || false,
      });
      setSeats(singleBusTypeFetch?.busType?.seats || []);
    }
  }, [singleBusTypeFetchSuccess]);

  if (
    deleteBusTypeLoading ||
    singleBusTypeFetchFetching ||
    singleBusTypeFetchLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="outer-cover">
      <div className="bus-types-top top-title">
        <Title backIcon={true}>Edit Bus Types</Title>
      </div>
      <Warning
        isActive={warningActive}
        tagline="Bus type will be permanently deleted."
        continueClick={handleDeleteBusTypes}
        cancelClick={() => setWarningActive(false)}
        isDisabled={deleteBusTypeLoading || deleteBusTypeSuccess}
      />
      <div className="separator"></div>
      <div className="bus-types-main">
        <div className="bus-types-form-wrapper">
          <div className="row-wrapper">
            <div className="form-control">
              <InputWithLabel
                placeholder="Enter name of the bus"
                label="Name"
                value={busTypeName}
                onchange={(e) => setBusTypeName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <SelectComponent
                options={["Leyland"]}
                label="Vehicle Make"
                selectValue={vehicleMake}
                setSelectValue={setVehicleMake}
              />
            </div>
          </div>
          <div className="row-wrapper">
            <div className="form-control">
              <SelectComponent
                options={["2+1", "2+2"]}
                label="Seating Type"
                selectValue={seatingType}
                setSelectValue={setSeatingType}
              />
            </div>
            <div className="form-control">
              <SelectComponent
                options={[
                  { option: "True", value: true },
                  { option: "False", value: false },
                ]}
                label="AC"
                selectValue={ac}
                setSelectValue={setAc}
              />
            </div>
          </div>
          <div className="row-wrapper other-details-wrapper">
            <div className="form-control">
              <MultiSelect
                options={[
                  { option: "charging", value: "Charging" },
                  { option: "wifi", value: "Wifi" },
                ]}
                label="Other Details"
                selectValue={otherDetails}
                setSelectValue={setOtherDetails}
              />
            </div>
          </div>
          <div className="warning-text bus-type-warning-text">
            Seats cannot be edited once created. Delete the Bustype and create
            new one for updated seat.
          </div>
          <div className="preview-seats-wrapper">
            <ShowSeats seats={seats} index="lower" />
            <ShowSeats seats={seats} index="upper" />
          </div>
          <div className="bus-type-button-container">
            <Button color="error" type="outlined" onClick={handleWarningActive}>
              Delete Bus Type
            </Button>
            <Button onClick={handleEditBusTypes}>Edit Bus Type</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusTypes;
