import React from "react";
import "./textarea.css";

const TextArea = ({ label, labelTag = "", placeholder, value, onchange }) => {
  return (
    <div className="input-with-label-container">
      <div className="input-label m-y-s font-regular dark-500">
        {label}{" "}
        <span className="font-small grey-500 font-regular p-x-xs">
          {labelTag}
        </span>
      </div>
      <textarea className="textarea" placeholder={placeholder} value={value} onChange={onchange}/>
    </div>
  );
};

export default TextArea;
