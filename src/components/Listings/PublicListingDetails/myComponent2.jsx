import React, { useEffect } from "react";
import "lightbox.js-react/dist/index.css";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import { useLocation } from "react-router-dom";

const Rooms = ({ img }) => {
  const parms = useLocation();
  const id = parms?.state?.id;

  const pageViewsApi = async () => {
    try {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.incrementViews + id,
        apiMethods.POST,
        null,
        headers
      );
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    pageViewsApi();
  }, []);

  return (
    <div className="bannergallery-section">
      <div className="gallery-slider d-flex">
        <div
          className="gallery-widget"
          style={{ marginTop: "88px", height: "70%" }}
        >
          <span data-fancybox="gallery1">
            <img
              className="img-fluid"
              alt="Image"
              src={img}
              style={{
                width: "100vw", // Full viewport width
                height: "300px", // Fixed height
                objectFit: "contain", // Cover to ensure it fills width
                borderBottom: "1px solid #dee2e7",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
