import React from "react";
import { Link } from "react-router-dom";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { GalleryImg1 } from "../../imagepath";

const Roomspics = ({ listingDetail }) => {
  return (
    <div className="row">
      {listingDetail?.meta?.map((item, index) => (
        <div class="col-lg-3  col-md-3 col-sm-3" key={index}>
          <div class="review-gallery">
            <Link to={item?.gallery_image || ""} data-fancybox="gallery1">
              <SlideshowLightbox>
                <img
                  className="img-fluid"
                  alt="Image"
                  src={item?.gallery_image || GalleryImg1}
                  style={{
                    width: "677px", // Set your desired width
                    height: "200px", // Set your desired height
                    objectFit: "cover", // Makes the image cover the area without stretching (can use 'contain' if you want the whole image visible)
                    border: "1px solid black",
                  }}
                />
              </SlideshowLightbox>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Roomspics;
