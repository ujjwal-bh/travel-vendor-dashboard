import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import DetailCard from "../../components/Core/DetailCard/DetailCard";
import Button from "../../components/UI/Button/Button";
import { useGlobalContext } from "../../context";
import "./details.css";

const Details = () => {
  return (
    <div className="details-container-outer outer-cover">
      <div className="details-container-top">
        <DetailCard />
        {/* <div className="amount-container container light-bg-500 p-l">
          <div className="grey-500 h4">Uncollected Amount</div>
          <div className="detail-amount font-large primary-500 font-bold">
            $340000
          </div>
          <div className="warning-text p-y-m font-para">
            <FaInfoCircle /> please be patient for atleast 7 working days
          </div>

          <div className="button-container">
            <Button size="default">Request Payment</Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Details;
