import React from "react";
import "./detailcard.css";
import Illustration from "../../../assets/BusIllustration.png";
import { FaInfoCircle } from "react-icons/fa";
import Button from "../../UI/Button/Button";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../../context";

const DetailCard = () => {
  const {vendorDetail} = useGlobalContext()
  return (
    <div className="detail-card-container primary-container container primary-bg p-l">
      <div className="detail-card-left light-900 font-regular font-46">
        <div className=" h1">{vendorDetail?.name}</div>
        <div className="p-y-xs">{vendorDetail?.email}</div>
        <div className="p-y-xs">{vendorDetail?.phone}</div>
        <div className="warning-text p-y-xs font-para">
          <FaInfoCircle /> these infos are visible to passengers for customer
          support
        </div>
        <div className="m-y-m detail-card-button">
          <NavLink to="/details/edit">
            <Button color="light">Change Details</Button>
          </NavLink>
        </div>
      </div>
      <div className="detail-card-right">
        <img src={Illustration} alt="illustration" />
      </div>
    </div>
  );
};

export default DetailCard;
