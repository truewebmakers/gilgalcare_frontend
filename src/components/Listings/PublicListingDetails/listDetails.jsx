import React from "react";
import { details_icon, website } from "../../imagepath";
import { Link } from "react-router-dom";

export const ListDetails = ({ listingDetail }) => {
  const googleMapsApiKey = "AIzaSyDk_TbPERImCZCd7YmCzYacT6wGayV-Lmk";
  const mapLat = listingDetail?.map_lat && Math.round(+listingDetail?.map_lat); // Replace with valid latitude
  const mapLong =
    listingDetail?.map_long && Math.round(+listingDetail?.map_long);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${mapLat},${mapLong}`;
  return (
    <>
      {/* <div className="card">
        <h4>
          <img src={details_icon} alt="details-icon" /> Details
        </h4>
        <ul>
          <li>
            Contract <span>For Rent</span>
          </li>
          <li>
            Location <span>New York, USA</span>
          </li>
          <li>
            Year Built <span>1988</span>
          </li>
          <li>
            Rooms <span>3</span>
          </li>
          <li>
            Beds <span>4</span>
          </li>
          <li>
            Baths<span>8</span>
          </li>
          <li>
            Gadgets <span>6</span>
          </li>
          <li>
            Home Area <span>30sqft</span>
          </li>
          <li>
            Lot Dimensions <span>30*30*20 ft</span>
          </li>
          <li className="p-0">
            Lot Area <span>50 ft</span>
          </li>
        </ul>
      </div> */}
      <div className="card">
        <h4>
          <img src="assets/img/breifcase.svg" alt="" /> Business Info
        </h4>
        <div className="map-details">
          <div className="map-frame">
            <iframe
              src={mapUrl}
              width={200}
              height={160}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ul className="info-list">
            <li>
              <i className="feather-map-pin" />{" "}
              {listingDetail?.address ? listingDetail?.address : "-"},
              <br />
              {listingDetail?.location ? listingDetail?.location : "-"}
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
            <li className="socialicons pb-0">
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
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
