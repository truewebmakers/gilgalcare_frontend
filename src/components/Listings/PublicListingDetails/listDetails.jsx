import React from "react";
import { details_icon, website } from "../../imagepath";
import { Link } from "react-router-dom";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import { env } from "../../../constants/constant";

export const ListDetails = ({ listingDetail }) => {
  const googleMapsApiKey = env.GOOGLE_MAP_KEY;
  const mapLat = listingDetail?.map_lat && Math.round(+listingDetail?.map_lat); // Replace with valid latitude
  const mapLong =
    listingDetail?.map_long && Math.round(+listingDetail?.map_long);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${mapLat},${mapLong}`;
  return (
    <>
      <div className="card">
        <h4>
          <img
            src={
              "https://gilgalcareprovider.s3.ap-southeast-1.amazonaws.com/breifcase.svg"
            }
            alt=""
          />{" "}
          Business Info
        </h4>
        <div className="map-details">
          <div className="map-frame">
            <iframe
              src={`${mapUrl}&zoom=6`}
              width={400}
              height={300}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ul className="info-list">
            <li>
              <i className="feather-map-pin" />{" "}
              {listingDetail?.address
                ? CapitalizeFirstLetter(listingDetail?.address)
                : "-"}
              ,&nbsp;
              {listingDetail?.location
                ? CapitalizeFirstLetter(listingDetail?.location)
                : "-"}
            </li>
            <li>
              <i className="feather-phone-call" />{" "}
              {listingDetail?.phone ? listingDetail?.phone : "-"}
            </li>
            <li>
              <i className="feather-mail" />{" "}
              {listingDetail?.email ? listingDetail?.email : "-"}
            </li>
            <li>
              <img src={website} alt="website" />{" "}
              {listingDetail?.website ? listingDetail?.website : "-"}
            </li>
            {/* <li className="socialicons pb-0">
              <Link to={listingDetail?.facebook || "#"} target="_blank">
                <i className="fab fa-facebook-f" />{" "}
              </Link>
              <Link to={listingDetail?.twitter || "-"} target="_blank">
                <i className="fab fa-twitter" />
              </Link>
              <Link to={listingDetail?.instagram || "-"} target="_blank">
                <i className="fab fa-instagram" />
              </Link>
              <Link to={listingDetail?.google_plus || "-"} target="_blank">
                <i className="fab fa-linkedin-in" />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
