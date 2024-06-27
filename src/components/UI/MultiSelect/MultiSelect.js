import React, { useEffect, useState } from "react";
import MultiSelectOption from "./MultiSelectOption";
import "./multiselect.css"

const MultiSelect = ({
  label = "",
  selectValue,
  setSelectValue,
  labelTag = "",
  options = [],
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    options.length > 0 && setFilteredOptions(options);
  }, [options]);


  return (
    <div className="multi-select-container-wrapper dark-500">
      {label?.length > 0 && (
        <div className="multi-select-label m-y-s font-regular dark-500">
          {label}{" "}
          <span className="font-small grey-500 font-regular p-x-xs">
            {labelTag}
          </span>
        </div>
      )}
      <div className={`multi-select-option-container`}>
      {filteredOptions?.map((item, index) => {
            const { option, value } = item;
            return (
              <MultiSelectOption
                key={index}
                option={option}
                value={value}
                {...{ selectValue, setSelectValue}}
              />
            );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
