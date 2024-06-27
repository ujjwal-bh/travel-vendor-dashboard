import React, { useEffect } from 'react'
import "./imageUpload.css"
import Img from "../../../assets/placeholder.jpg"
import { useUploadImageMutation } from '../../../services/api';
import { useGlobalContext } from '../../../context';

const ImageUpload = ({setPicture}) => {
  const {setFrontendMessage} = useGlobalContext()
  const [
    uploadImage,
    {
      data: imageData,
      status: uploadImageStatus,
      error: uploadImageError,
      isSuccess: uploadImageSuccess,
      isLoading: uploadImageLoading,
    },
  ] = useUploadImageMutation();

    const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    let img = new FormData();
    img.append("file", image);
    await uploadImage(img);
  };


  useEffect(() => {
    uploadImageSuccess && setPicture(imageData?.path || "");
  }, [imageData, uploadImageSuccess]);
    useEffect(() => {
    uploadImageError &&
      setFrontendMessage({
        status: "Error",
        msg: "Couldnt upload image, try again later",
      });
  }, [uploadImageError]);
  return (
    <div className='image-upload-wrapper'>
        <div className='upload-image'>
            <img src={Img} alt="placeholder img"/>
        </div>
        <div className='m-y-l h5 image-upload-text'>Drop your image here or <span className='primary-500'>Browse</span></div>
        <input type="file" accept='image/*' onChange={handleImageUpload}/>

    </div>
  )
}

export default ImageUpload