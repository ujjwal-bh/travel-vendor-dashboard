import React from "react";
import Button from "../../../UI/Button/Button";
import { FaAngleDoubleRight } from "react-icons/fa";

const TripStrip = ({}) => {
  return (
    <div className="table-row table-content-row h6">
      <div className="row-content">Bangalore to Mysuru</div>
      <div className="row-content">KA 34 BV 1234</div>
      <div className="row-content">KR puram metro station, Mysuru</div>
      <div className="row-content">Mysuru palace, Mysore</div>
      <div className="row-content">10: 30, 23 Apr</div>
      <div className="row-content">08: 15, 24 Apr</div>
      <div className="row-content btn-content">
        <Button size="default">Active</Button>
      </div>
      <div className="small-row-val">
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};

export default TripStrip;
