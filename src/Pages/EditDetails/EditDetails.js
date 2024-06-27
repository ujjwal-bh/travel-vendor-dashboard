import React, { useEffect, useState } from "react";
import "./editDetails.css";
import Title from "../../components/UI/Title/Title";
import PlainInput from "../../components/UI/PlainInput/PlainInput";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/UI/ImageUpload/ImageUpload";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader"
import { useGlobalContext } from "../../context";
import {
  useUpdateCurrentVendorMutation,
  useUploadImageMutation,
} from "../../services/api";
import { statusCodeToMsg } from "../../utils";

const EditDetails = () => {
  const { serverUrl, vendorDetail, setFrontendMessage } = useGlobalContext();
  const navigate = useNavigate();

  const [
    editVendorDetails,
    {
      error: editVendorDetailsError,
      isLoading: editVendorDetailsLoading,
      isSuccess: editVendorDetailsSuccess,
    },
  ] = useUpdateCurrentVendorMutation();


  const [travelName, setTravelName] = useState(vendorDetail?.name || "");
  const [email, setEmail] = useState(vendorDetail?.email || "");
  const [phone, setPhone] = useState(vendorDetail?.phone || "");
  const [picture, setPicture] = useState(vendorDetail?.picture || "");
  
  const handleEditDetails = async () => {
    await editVendorDetails({
      name: travelName,
      email,
      phone,
      photo: picture,
    });
  };
  const handelCancelClick = () => {
    navigate("/details")
  }

  useEffect(() => {
    editVendorDetailsError &&
      setFrontendMessage({
        status: "error",
        msg: editVendorDetailsError?.data?.message,
      });
  }, [editVendorDetailsError]);

  useEffect(() => {
    editVendorDetailsSuccess && navigate("/details");
  }, [editVendorDetailsSuccess]);

  useEffect(() => {
    setTravelName(vendorDetail?.name || "");
    setEmail(vendorDetail?.email || "");
    setPhone(vendorDetail?.phone || "");
    setPicture(vendorDetail?.photo || "");
  }, [vendorDetail]);


  if(editVendorDetailsLoading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="outer-cover edit-detail-outer-container">
      <div className="edit-details-top">
        <Title backIcon={true}>Vendor Details</Title>
      </div>
      <div className="separator"></div>
      <div className="edit-detail-main">
        <form
          className="edit-detail-form dark-500"
          onSubmit={(e)=> e.preventDefault()}
        >
          <div className="form-control">
            <div className="form-left">Travel Name</div>
            <div className="form-right">
              <PlainInput
                placeholder="Enter the travel name"
                value={travelName}
                onchange={(e) => setTravelName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <div className="form-left">Phone</div>
            <div className="form-right">
              <PlainInput
                placeholder="Enter the phone number"
                value={phone}
                onchange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <div className="form-left">Email</div>
            <div className="form-right">
              <PlainInput
                placeholder="Enter the email address"
                value={email}
                onchange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control image-upload-control">
            <div className="form-left">Logo / Trademark</div>
            <div className="form-right">
              <ImageUpload setPicture={setPicture}/>
            </div>
          </div>
          {picture.length > 0 && (
          <div className="form-control show-img">
            <div className="form-left">Image Preview</div>
            <div className="form-right">
                <img src={serverUrl + picture} alt="travel image" />
            </div>
          </div>
           )}
          <div className="form-control group-button-container">
            <Button type="outlined" color="error" onClick={handelCancelClick}>
              Cancel
            </Button>
            <Button type="filled" color="primary" onClick={handleEditDetails}>
              Save Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
