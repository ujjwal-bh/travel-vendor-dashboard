import React, { useEffect, useState } from "react";
import "./select.css";
import SelectOption from "./SelectOption";
import PlainInput from "../PlainInput/PlainInput";

const SelectComponent = ({
  placeholder = "Select",
  label = "",
  selectValue,
  setSelectValue,
  labelTag = "",
  options = [],
}) => {
  const [search, setSearch] = useState(selectValue?.option || "");
  const [isActive, setIsActive] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const filterOptions = (e) => {
    const val = e.target.value;
    setSearch(val);
    const tempArr = [];
    options?.map((item) => {
      if(typeof(item) === "object"){
        if (item?.option?.toLowerCase().includes(val.toLowerCase())) {
          tempArr.push({option: item.option, value: item.value});
        }  
      } else {
        if (item?.toLowerCase().includes(val.toLowerCase())) {
          tempArr.push(item);
        }
      }
      return;
    });
    setFilteredOptions(tempArr);
  };

  const handleClick = () => {
    setIsActive(true);
  };

  useEffect(() => {
    options.length > 0 && setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    selectValue?.option?.length === 0 && setSearch("");
    selectValue?.option?.length > 0  && setSearch(selectValue?.option)
  }, [selectValue]);

  return (
    <div className="select-container-wrapper dark-500">
      {label?.length > 0 && (
        <div className="select-label m-y-s font-regular dark-500">
          {label}{" "}
          <span className="font-small grey-500 font-regular p-x-xs">
            {labelTag}
          </span>
        </div>
      )}
      <div className="select-container light-bg-900" onClick={handleClick}>
        <PlainInput
          placeholder={placeholder}
          value={search}
          onchange={filterOptions}
        />
      </div>
      <div className={`option-wrapper ${isActive && "active"}`}>
        {filteredOptions?.map((item, index) => {
          if (typeof item === "string") {
            return (
              <SelectOption
                key={index}
                option={item}
                value={item}
                {...{ selectValue, setSelectValue, setIsActive, setSearch }}
              />
            );
          } else {
            const { option, value } = item;
            return (
              <SelectOption
                key={index}
                option={option}
                value={value}
                {...{ selectValue, setSelectValue, setIsActive, setSearch }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SelectComponent;
