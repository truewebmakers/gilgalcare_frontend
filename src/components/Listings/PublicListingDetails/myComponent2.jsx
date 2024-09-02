import React from "react";
import "lightbox.js-react/dist/index.css";

const Rooms = ({ img }) => {
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
