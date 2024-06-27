import React, { useEffect, useState } from 'react'
import Title from "../../../components/UI/Title/Title"
import PlainInput from "../../../components/UI/PlainInput/PlainInput"
import ImageUpload from '../../../components/UI/ImageUpload/ImageUpload'
import Button from '../../../components/UI/Button/Button'
import SelectComponent from "../../../components/UI/Select/SelectComponent"
import "./addBus.css"
import { useGetAllBusTypesQuery, useUploadImageMutation } from '../../../services/api'
import Loader from '../../../components/UI/Loader/Loader'
import { useGlobalContext } from '../../../context'
import { useCreateBusesMutation } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import { statusCodeToMsg } from '../../../utils'

const AddBus = () => {
  const {serverUrl, setFrontendMessage} = useGlobalContext()
  const navigate = useNavigate()

  const {
    data: allBusTypesFetch,
    isError: allBusTypesFetchError,
    isSuccess: allBusTypesFetchSuccess,
    isFetching: allBusTypesFetchFetching,
    isLoading: allBusTypesFetchLoading,
  } = useGetAllBusTypesQuery();


  const [
    createBus,
    {
      error: createBusError,
      isLoading: createBusLoading,
      isSuccess: createBusSuccess
    }
  ] = useCreateBusesMutation()


  const [allBusTypesData, setAllBusTypesData] = useState(
    allBusTypesFetch?.busTypes
  );

  const [bustype, setBusType] = useState({option: "", value: ""})
  const [depoName, setDepoName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [picture, setPicture] = useState("");


  const optionValuePairBusTypes = (data) => {
    let temp = [];

    if(data?.length > 0){
      for(const item of data){
        temp.push({option: item.name, value: item.id})
      }
    }
    return temp;

  }

  const handleAddBus = async (e) => {
    e.preventDefault()
    await createBus({
      regNo,
      busType: bustype.value,
      depoName,
      busImages: [picture]
    })
  }



  useEffect(() => {
    allBusTypesFetchSuccess && setAllBusTypesData(allBusTypesFetch?.busTypes);
  }, [allBusTypesFetchSuccess]);



  useEffect(()=> {
    createBusSuccess && navigate("/busConfig")
  }, [createBusSuccess])



  useEffect(() => {
    createBusError &&
      setFrontendMessage({
        status: "error",
        msg: statusCodeToMsg[createBusError?.status],
      });
  }, [createBusError]);



  if( allBusTypesFetchLoading || allBusTypesFetchFetching) {
    return (
      <Loader/>
    )
  }
  return (
    <div className='outer-cover add-bus-outer-container'>
      <div className='add-buss-top'>
        <Title backIcon={true}>Add Bus</Title>
      </div>
      <div className='separator'></div>
      <div className='add-bus-main'>
        <form className='add-bus-form dark-500' onSubmit={e=> e.preventDefault()}>
          <div className='form-control'>
            <div className='form-left'>Reg No</div>
            <div className='form-right'>
              <PlainInput placeholder="Enter the registration number" value={regNo} onchange={(e)=> setRegNo(e.target.value)}/>
            </div>
          </div>
          <div className='form-control'>
            <div className='form-left'>Bus type</div>
            <div className='form-right'>
              <SelectComponent placeholder='Select Bus type' selectValue={bustype} setSelectValue={setBusType} options={optionValuePairBusTypes(allBusTypesData)}/>
            </div>
          </div>
          <div className='form-control'>
            <div className='form-left'>Depo Name</div>
            <div className='form-right'>
              <PlainInput placeholder="Enter the Depo Name" value={depoName} onchange={(e)=> setDepoName(e.target.value)}/>
            </div>
          </div>
          <div className='form-control image-upload-control'>
            <div className='form-left'>Photo of the bus with Registration Plate</div>
            <div className='form-right'>
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
          <div className='form-control group-button-container'>
              <Button type='outlined' color='error'>Cancel</Button>
              <Button type='filled' color='primary' onClick={handleAddBus}>Save Change</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBus