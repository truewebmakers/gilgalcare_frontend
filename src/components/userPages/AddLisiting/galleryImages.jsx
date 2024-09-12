import React, { useState } from "react";
import { gallerymedia_1 } from "../../imagepath";
import { Link } from "react-router-dom";
import { generateImageLinkService } from "../../../services/generateImageLink";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader";

export const GalleryImages = ({
  galleryImage,
  setGalleryImage,
  showGalleryImage,
  setShowGalleryImage,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      setShowGalleryImage((prevState) => ({
        ...prevState,
        [name]: loadEvent.target.result,
      }));
    };
    reader.readAsDataURL(file);

    const response = await generateImageLinkService(
      user?.token,
      file,
      setIsLoading
    );
    setGalleryImage((prevState) => ({
      ...prevState,
      [name]: response?.path,
    }));
  };

  const handleDeleteImage = (imageKey) => {
    setShowGalleryImage((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[imageKey]; // Remove the image preview from the state
      return updatedState;
    });

    setGalleryImage((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[imageKey]; // Remove the image link from the state
      return updatedState;
    });
  };

  return (
    <div className="gallery-media" style={{ marginTop: "8px" }}>
      <h6 className="media-title">Gallery</h6>
      <div className="galleryimg-upload">
        {/* Gallery Image Uploads */}
        {Array.from({ length: 6 }, (_, index) => {
          const imageKey = `gallery_images[${index}]`;
          return (
            <div key={index} className="gallery-upload">
              <img
                src={showGalleryImage[imageKey] || gallerymedia_1}
                className="img-fluid"
                alt=""
                height={250}
                width={250}
              />
              <span
                className="profile-img-del"
                onClick={() => handleDeleteImage(imageKey)}
              >
                <i className="feather-trash-2" />
              </span>
              <div className="settings-upload-btn" style={{ marginTop: "4px" }}>
                <input
                  type="file"
                  accept="image/*"
                  className="hide-input image-upload"
                  id={`file${index}`}
                  name={imageKey}
                  onChange={handleImageChange}
                />
                <label htmlFor={`file${index}`} className="file-upload">
                  Upload File
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
