import React from "react";
import { galleryicon } from "../../imagepath";
import Roomspics from "./myComponent3";

export const Gallery = ({ listingDetail }) => {
  return (
    <div className="card gallery-section ">
      <div className="card-header ">
        <img src={galleryicon} alt="gallery" />
        <h4>Gallery</h4>
      </div>
      <div className="card-body">
        <div className="gallery-content">
          <Roomspics />
        </div>
      </div>
    </div>
  );
};
