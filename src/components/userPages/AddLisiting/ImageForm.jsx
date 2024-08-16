import React from "react";
import { mediaimg_1, mediaimg_2 } from "../../imagepath";

export const ImageForm = ({
  selectedImage,
  setSelectedImage,
  setUploadedPic,
  error,
}) => {
  const handleImageChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    if (file) {
      // Update the uploadPic state with the File object
      setUploadedPic((prevState) => ({
        ...prevState,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        // Update the selectedImage state with the Data URL
        setSelectedImage((prevState) => ({
          ...prevState,
          [name]: loadEvent.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card media-section">
      <div className="card-header">
        <h4>Media Information </h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 col-md-6 featured-img1">
            <h6 className="media-title">Featured Image</h6>
            <div className="media-image">
              <img
                src={selectedImage?.featuredImage || mediaimg_2}
                alt="Featured"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="settings-upload-btn">
              <input
                type="file"
                accept="image/*"
                className="hide-input image-upload"
                id="file"
                name="featuredImage"
                onChange={handleImageChange}
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
            <div className="media-image">
              <img
                src={selectedImage?.logo || mediaimg_1}
                alt="Logo"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="settings-upload-btn">
              <input
                type="file"
                accept="image/*"
                className="hide-input image-upload"
                id="file1"
                name="logo"
                onChange={handleImageChange}
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
