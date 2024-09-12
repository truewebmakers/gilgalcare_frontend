import React from "react";
import { mediaimg_1 } from "../../imagepath";
import defaultPic from "../../../assets/img/defaultProfile.png";

export const ImageForm = ({ selectedImage, error, handleChange }) => {
  return (
    <div className="card media-section">
      <div className="card-header">
        <h4>Media Information </h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 col-md-6 featured-img1">
            <h6 className="media-title">Featured Image</h6>
            {/* <div className="media-image"> */}
            <img
              src={selectedImage?.featuredImage || defaultPic}
              alt="Featured"
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
            />
            {/* </div> */}
            <div className="settings-upload-btn">
              <input
                type="file"
                accept="image/*"
                className="hide-input image-upload"
                id="file"
                name="featuredImage"
                onChange={handleChange}
                data-handler="imageInfo"
              />
              {error?.featuredImage && (
                <p style={{ color: "red" }}>{error?.featuredImage}</p>
              )}
              <label htmlFor="file" className="file-upload">
                Upload File
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 featured-img2">
            <h6 className="media-title">Logo</h6>
            {/* <div className="media-image"> */}
            <img
              src={selectedImage?.logo || mediaimg_1}
              alt="Logo"
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
            />
            {/* </div> */}
            <div className="settings-upload-btn">
              <input
                type="file"
                accept="image/*"
                className="hide-input image-upload"
                id="file1"
                name="logo"
                onChange={handleChange}
                data-handler="imageInfo"
              />
              {error?.logo && <p style={{ color: "red" }}>{error?.logo}</p>}
              <label htmlFor="file1" className="file-upload">
                Upload File
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
