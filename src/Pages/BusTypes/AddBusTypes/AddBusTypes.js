import React, { useEffect, useState } from "react";
import Title from "../../../components/UI/Title/Title";
import SelectComponent from "../../../components/UI/Select/SelectComponent";
import "./addBusTypes.css";
import InputWithLabel from "../../../components/UI/InputWithLabel/InputWithLabel";
import Button from "../../../components/UI/Button/Button";
import { useCreateBusTypeMutation } from "../../../services/api";
import { useGlobalContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { statusCodeToMsg } from "../../../utils";
import Loader from "../../../components/UI/Loader/Loader";
import MultiSelect from "../../../components/UI/MultiSelect/MultiSelect";
import Seat from "../../../components/Core/Seat/Seat";

const AddBusTypes = () => {
  const { setFrontendMessage } = useGlobalContext();
  const navigate = useNavigate();
  const [busTypeName, setBusTypeName] = useState("");
  const [vehicleMake, setVehicleMake] = useState({ option: "", value: "" });
  const [seatingType, setSeatingType] = useState({ option: "", value: "" });
  // we have to create multiple select for this
  const [otherDetails, setOtherDetails] = useState([]);
  const [ac, setAc] = useState({ option: "False", value: false });
  const [lowerSeats, setLowerSeats] = useState([])
  const [upperSeats, setUpperSeats] = useState([])
  const [seats, setSeats] = useState([...lowerSeats, ...upperSeats])

  const [
    createBusType,
    {
      error: createBusTypeError,
      isSuccess: createBusTypeSuccess,
      isLoading: createBusTypeLoading,
    },
  ] = useCreateBusTypeMutation();

  const handleCreateBusType = async () => {
    const val = {
      name: busTypeName,
      vehicleMake: vehicleMake.value,
      seatingType: seatingType.value,
      features: otherDetails,
      hasAC: ac.value,
      seats
    };
    await createBusType(val);
  };

  useEffect(()=> {
    setSeats([...lowerSeats, ...upperSeats])
  }, [lowerSeats, upperSeats])
  useEffect(() => {
    createBusTypeError &&
      setFrontendMessage({
        status: "error",
        msg: statusCodeToMsg[createBusTypeError?.status],
      });
  }, [createBusTypeError]);

  useEffect(() => {
    createBusTypeSuccess && navigate("/busConfig");
  }, [createBusTypeSuccess]);


  if (createBusTypeLoading) {
    return <Loader />;
  }
  return (
    <div className="outer-cover">
      <div className="bus-types-top top-title">
        <Title backIcon={true}>Bus Types</Title>
      </div>
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
                  { option: "Charging", value: "Charging" },
                  { option: "Wifi", value: "Wifi" },
                ]}
                label="Other Details"
                selectValue={otherDetails}
                setSelectValue={setOtherDetails}
              />
            </div>
          </div>
          <div className="bus-types-seat-container">
            <Seat  seats={lowerSeats} setSeats={setLowerSeats} deck="lower"/>
          </div>
          <div className="bus-types-seat-container">
            <Seat seats={upperSeats} setSeats={setUpperSeats} deck="upper"/>

          </div>
          <div className="bus-type-button-container">
            <Button
              onClick={handleCreateBusType}
              disabled={createBusTypeLoading ? true : false}
            >
              Add Bus Type
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusTypes;
