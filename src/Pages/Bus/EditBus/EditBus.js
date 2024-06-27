import React, { useEffect, useState } from "react";
import Title from "../../../components/UI/Title/Title";
import PlainInput from "../../../components/UI/PlainInput/PlainInput";
import ImageUpload from "../../../components/UI/ImageUpload/ImageUpload";
import Button from "../../../components/UI/Button/Button";
import SelectComponent from "../../../components/UI/Select/SelectComponent";
import {
  useDeleteSingleBusMutation,
  useGetAllBusTypesQuery,
  useGetSingleBusQuery,
  useUpdateSingleBusMutation,
  useUploadImageMutation,
} from "../../../services/api";
import Loader from "../../../components/UI/Loader/Loader";
import { useGlobalContext } from "../../../context";
import { useNavigate, useParams } from "react-router-dom";
import { statusCodeToMsg } from "../../../utils";
import Warning from "../../../components/UI/Warning/Warning";

const EditBus = () => {
  const { serverUrl, setFrontendMessage } = useGlobalContext();
  const navigate = useNavigate();
  const { busId } = useParams();

  const [warningActive, setWarningActive] = useState(false)

  const {
    data: singleBusFetch,
    isLoading: singleBusFetchLoading,
    isFetching: singleBusFetchFetching,
    isError: singleBusFetchError,
    isSuccess: singleBusFetchSuccess,
  } = useGetSingleBusQuery(busId);

  const {
    data: allBusTypesFetch,
    isError: allBusTypesFetchError,
    isSuccess: allBusTypesFetchSuccess,
    isFetching: allBusTypesFetchFetching,
    isLoading: allBusTypesFetchLoading,
  } = useGetAllBusTypesQuery();

  const [
    updateBus,
    {
      error: updateBusError,
      isLoading: updateBusLoading,
      isSuccess: updateBusSuccess,
    },
  ] = useUpdateSingleBusMutation();

  const [
    deleteBus,
    {
      error: deleteBusError,
      isLoading: deleteBusLoading,
      isSuccess: deleteBusSuccess
    }
  ] = useDeleteSingleBusMutation()

  const [allBusTypesData, setAllBusTypesData] = useState(
    allBusTypesFetch?.busTypes
  );

  const [bustype, setBusType] = useState({ option: singleBusFetch?.bus?.busTypeInfo?.name || "", value: singleBusFetch?.bus?.busTypeInfo?.id || "" });
  const [depoName, setDepoName] = useState(singleBusFetch?.bus?.depoName || "");
  const [regNo, setRegNo] = useState(singleBusFetch?.bus?.regNo|| "");
  const [picture, setPicture] = useState(singleBusFetch?.bus?.busImages[0]|| "");

  const optionValuePairBusTypes = (data) => {
    let temp = [];

    if (data?.length > 0) {
      for (const item of data) {
        temp.push({ option: item.name, value: item.id });
      }
    }
    return temp;
  };

  const handleEditBus = async (e) => {
    e.preventDefault();
    await updateBus({
      singleBusId: busId,
      regNo,
      busType: bustype.value,
      depoName,
      busImages: [picture],
    });
  };

  const handleWarningActive = () => {
    setWarningActive(true)
  }

  const handleDeleteBus = async () => {
    await deleteBus({singleBusId: busId})
  };


  useEffect(()=> {
    if(singleBusFetchSuccess){
        setBusType({ option: singleBusFetch?.bus?.busTypeInfo?.name, value: singleBusFetch?.bus?.busTypeInfo?.id });
        setDepoName(singleBusFetch?.bus?.depoName);
        setRegNo(singleBusFetch?.bus?.regNo);
        setPicture(singleBusFetch?.bus?.busImages[0]);

    }
  }, [singleBusFetchSuccess])

  useEffect(() => {
    allBusTypesFetchSuccess && setAllBusTypesData(allBusTypesFetch?.busTypes);
  }, [allBusTypesFetchSuccess]);

  useEffect(() => {
    updateBusSuccess && navigate("/busConfig");
    deleteBusSuccess && navigate("/busConfig")
  }, [updateBusSuccess, deleteBusSuccess]);

  useEffect(() => {
    updateBusError &&
      setFrontendMessage({
        status: "error",
        msg: statusCodeToMsg[updateBusError?.status],
      });
  }, [updateBusError]);

  if (
    allBusTypesFetchLoading ||
    allBusTypesFetchFetching ||
    updateBusLoading ||
    singleBusFetchLoading ||
    singleBusFetchFetching ||
    deleteBusLoading
  ) {
    return <Loader />;
  }
  return (
    <div className="outer-cover add-bus-outer-container">
      <div className="add-buss-top">
        <Title backIcon={true}>Edit Bus</Title>
      </div>
      <Warning isActive={warningActive} tagline="Bus will be permanently deleted." continueClick={handleDeleteBus} cancelClick={()=> setWarningActive(false)} isDisabled={deleteBusLoading || deleteBusSuccess}/>

      <div className="separator"></div>
      <div className="add-bus-main">
        <form
          className="add-bus-form dark-500"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-control">
            <div className="form-left">Reg No</div>
            <div className="form-right">
              <PlainInput
                placeholder="Enter the registration number"
                value={regNo}
                onchange={(e) => setRegNo(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <div className="form-left">Bus type</div>
            <div className="form-right">
              <SelectComponent
                placeholder="Select Bus type"
                selectValue={bustype}
                setSelectValue={setBusType}
                options={optionValuePairBusTypes(allBusTypesData)}
              />
            </div>
          </div>
          <div className="form-control">
            <div className="form-left">Depo Name</div>
            <div className="form-right">
              <PlainInput
                placeholder="Enter the Depo Name"
                value={depoName}
                onchange={(e) => setDepoName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control image-upload-control">
            <div className="form-left">
              Photo of the bus with Registration Plate
            </div>
            <div className="form-right">
              <ImageUpload setPicture={setPicture} />
            </div>
          </div>
          {picture?.length > 0 && (
            <div className="form-control show-img">
              <div className="form-left">Image Preview</div>
              <div className="form-right">
                <img src={serverUrl + picture} alt="travel image" />
              </div>
            </div>
          )}
          <div className="form-control group-button-container">
            <Button type="outlined" color="error" onClick={handleWarningActive}>
              Delete Bus
            </Button>
            <Button type="filled" color="primary" onClick={handleEditBus}>
              Save Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBus;
