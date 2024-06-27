import React, { useEffect, useState } from "react";
import SelectComponent from "../../../UI/Select/SelectComponent";
import Button from "../../../UI/Button/Button";
import LocationWithInfo from "../LocationWithInfo/LocationWithInfo";
import Title from "../../../UI/Title/Title";
import "./address.css";
import PlainInput from "../../../UI/PlainInput/PlainInput";
import { useGlobalContext } from "../../../../context";
import { FaCheck } from "react-icons/fa";

const Address = ({
  type,
  allCityData,
  address,
  setAddress,
  setCityId,
  cityId,
}) => {
  const { optionValuePair, filterDataFromParam, setFrontendMessage } =
    useGlobalContext();


  const [active, setActive] = useState(false);

  const [hours, setHours] = useState(12);
  const [min, setMin] = useState(1);
  const [time, setTime] = useState({ option: "AM", value: "AM" });
  const [locationOptions, setLocationOptions] = useState([]);

  // just for drop
  const [dropDay, setDropDay] = useState(0);
  const [selectActive, setSelectActive] = useState("none");

  const handleSelectNextDayClick = () => {
    if (selectActive === "next") {
      setSelectActive("none");
      setDropDay(0);
    } else {
      setSelectActive("next");
      setDropDay(1);
    }
  };
  const handleSelectThirdDayClick = () => {
    if (selectActive === "third") {
      setSelectActive("none");
      setDropDay(0);
    } else {
      setSelectActive("third");
      setDropDay(2);
    }
  };

  const [currCity, setCurrCity] = useState(
    filterDataFromParam(allCityData, cityId)
  );
  const [selectCityValue, setSelectCityValue] = useState({
    option: currCity?.name || "",
    value: cityId || "",
  });
  const [selectLocationValue, setSelectLocationValue] = useState({
    option: "",
    value: "",
  });

  const handleSetLocationOption = () => {
    const val = allCityData?.filter((item) => {
      return item.name === selectCityValue.option;
    });
    if (val && val.length > 0) {
      setLocationOptions(val[0].locations || []);
    }
  };

  const makePopupActive = () => {
    if (selectLocationValue.value.length === 0) {
      return;
    }
    setActive((prev) => !prev);
  };

  const handleChangeClick = () => {
    setSelectCityValue({ option: "", value: "" });
  };

  const handleAddPickupPoint = () => {
    if (hours < 1 || hours > 12 || min < 0 || min > 59) {
      setFrontendMessage({ status: "error", msg: "Invalid timing" });
      return;
    }
    let minutes = min < 10 ? `0${min}` : `${min}`;
    let hrs =
      time.value === "PM" && hours < 12
        ? 12 + parseInt(hours)
        : time.value === "PM" && hours === 12
        ? 0
        : hours === 12
        ? 0
        : hours;

    hrs = hrs < 10 ? `0${hrs}` : `${hrs}`;

    let val = address.filter((item) => {
      return item.location != selectLocationValue.value;
    });
    let singleLocation = {
      location: selectLocationValue.value,
      time: `${hrs}:${minutes}`,
    };

    if (type == "Drop") {
      singleLocation.days = dropDay;
    }
    setAddress([...val, singleLocation]);

    setSelectLocationValue({ option: "", value: "" });
    makePopupActive();
    setHours(12);
    setMin(0);
    setSelectActive("none");
  };

  useEffect(() => {
    handleSetLocationOption();
  }, [selectCityValue]);

  useEffect(() => {
    setCityId(selectCityValue.value);

    selectCityValue.value.length === 0 && setAddress([]);
  }, [selectCityValue]);

  useEffect(() => {
    setSelectCityValue({ option: currCity?.name || "", value: cityId || "" });
  }, [currCity]);

  useEffect(() => {
    setCurrCity(filterDataFromParam(allCityData, cityId));
  }, [allCityData]);

  return (
    <>
      <div className="trip-route-top title-top">
        <Title size="h4">
          {" "}
          {type} Address <div className="separator"></div>
        </Title>
      </div>
      <div className="trip-route-main">
        <div className="trip-row">
          <div className="trip-row-left">
            <div className="">{type} city</div>
          </div>
          <div className="trip-row-right">
            {selectCityValue.option.length > 0 ? (
              <div className="trip-city-address">
                <div className="trip-city-address-name">
                  {selectCityValue?.option}
                </div>
                <div className="change-option h6" onClick={handleChangeClick}>
                  Change
                </div>
              </div>
            ) : (
              <SelectComponent
                placeholder={`Select ${type} city`}
                options={optionValuePair(allCityData, "name", "id")}
                selectValue={selectCityValue}
                setSelectValue={setSelectCityValue}
              />
            )}
          </div>
        </div>
        <div className="trip-row">
          <div className="trip-row-left">
            <div className="">{type} Address</div>
          </div>
          <div className="trip-row-right">
            <SelectComponent
              placeholder={`Select ${type} Address`}
              options={optionValuePair(locationOptions, "name", "id")}
              selectValue={selectLocationValue}
              setSelectValue={setSelectLocationValue}
            />
          </div>
          <div className="trip-row-additional">
            <Button size="default" onClick={makePopupActive}>
              Add {type} Point
            </Button>
          </div>
        </div>
        <div className="trip-row">
          <div className="trip-row-left"></div>
          <div className="trip-row-right location-right">
            {address?.map((item, index) => {
              const { location, time } = item;
              // console.log({type, location});
              return (
                <LocationWithInfo
                  key={index}
                  {...{ location, time, address, setAddress, cityId, type, dropDay }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={`absolute-wrapper ${active ? "active" : ""}`}>
        <div className="absolute-container address-absolute-container">
          <div className="absolute-top p-m primary-bg">
            <div className="light-900 h4">{type} point</div>
          </div>
          <div className="absolute-main address-absolute-main">
            <Title size="h5">
              {selectLocationValue.option} / {selectCityValue.option}
            </Title>
            <div className="address-absolute-row-wrapper">
              <div className="absolute-row-left">{type} time</div>
              <div className="absolute-row-right">
                <PlainInput
                  type="number"
                  placeholder="HH"
                  size="mini"
                  value={hours}
                  onchange={(e) => setHours(e.target.value)}
                  min={1}
                  max={12}
                />
                <PlainInput
                  type="number"
                  placeholder="MM"
                  size="mini"
                  value={min}
                  onchange={(e) => setMin(e.target.value)}
                  min={0}
                  max={60}
                />
                <div className="address-select-wrapper">
                  <SelectComponent
                    options={["AM", "PM"]}
                    placeholder="AM"
                    selectValue={time}
                    setSelectValue={setTime}
                  />
                </div>
              </div>
            </div>
            {type === "Drop" && (
              <div className="address-absolute-row-wrapper">
                <div className="address-checkbox-wrapper">
                  <div
                    className="address-absolute-select-box"
                    onClick={handleSelectNextDayClick}
                  >
                    {selectActive === "next" && <FaCheck />}
                  </div>
                  <div className="day">Next day</div>
                </div>
                <div className="address-checkbox-wrapper">
                  <div
                    className="address-absolute-select-box"
                    onClick={handleSelectThirdDayClick}
                  >
                    {selectActive === "third" && <FaCheck />}
                  </div>
                  <div className="day">Third Day</div>
                </div>
              </div>
            )}
            <div className="address-btn-wrapper">
              <Button
                type="outlined"
                color="error"
                size="default"
                onClick={makePopupActive}
              >
                Cancel
              </Button>
              <Button size="default" onClick={handleAddPickupPoint}>
                Add Timing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
