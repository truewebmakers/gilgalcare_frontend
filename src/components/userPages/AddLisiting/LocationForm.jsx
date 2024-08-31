import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { customToast } from "../../common/Toast";

const mapContainerStyle = {
  width: "100%",
  height: "430px",
};

export const LocationForm = ({
  locationInfo,
  setLocation,
  error,
  handleChange,
  markerPosition,
  setMarkerPosition,
}) => {
  const handleMapClick = async (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Geocoding API URL
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDk_TbPERImCZCd7YmCzYacT6wGayV-Lmk`;

    try {
      const response = await axios.get(geocodeUrl);
      const results = response?.data?.results;

      if (results?.length > 0) {
        const addressComponents = results[0]?.address_components;
        const formattedAddress = results[0]?.formatted_address;

        // Extract state and country
        const state = addressComponents?.find((component) =>
          component?.types?.includes("administrative_area_level_1")
        )?.long_name;

        const country = addressComponents?.find((component) =>
          component?.types?.includes("country")
        )?.long_name;

        // Construct address excluding state and country
        const addressParts = addressComponents
          ?.filter(
            (component) =>
              !component?.types?.includes("administrative_area_level_1") &&
              !component?.types?.includes("country")
          )
          ?.map((component) => component?.long_name)
          ?.join(", ");

        // Format location and address
        const location = state && country ? `${state}, ${country}` : "";
        const address = formattedAddress
          ? addressParts || formattedAddress
          : "";

        setLocation((prevState) => ({
          ...prevState,
          location: location,
          address: address,
          mapLat: lat?.toString(),
          mapLong: lng?.toString(),
        }));
        setMarkerPosition({ lat, lng });
      } else {
        customToast.error("No address found");
      }
    } catch (error) {
      customToast.error("Error fetching address: ", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4>Location information</h4>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="col-form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={locationInfo?.location}
            onChange={handleChange}
            data-handler="locationInfo"
            autoComplete="off"
          />
          {error?.location && <p style={{ color: "red" }}>{error?.location}</p>}
        </div>
        <div className="form-group">
          <label className="col-form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={locationInfo?.address}
            onChange={handleChange}
            data-handler="locationInfo"
            autoComplete="off"
          />
          {error?.address && <p style={{ color: "red" }}>{error?.address}</p>}
        </div>
        <div className="listing-map">
          <LoadScript googleMapsApiKey="AIzaSyDk_TbPERImCZCd7YmCzYacT6wGayV-Lmk">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="form-group formlast-input lat-input">
              <label className="col-form-label">Latitude</label>
              <input
                type="text"
                className="form-control"
                name="mapLat"
                value={locationInfo?.mapLat}
                onChange={handleChange}
                data-handler="locationInfo"
                autoComplete="off"
              />
              {error?.mapLat && <p style={{ color: "red" }}>{error?.mapLat}</p>}
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group formlast-input">
              <label className="col-form-label">Longitude</label>
              <input
                type="text"
                className="form-control"
                name="mapLong"
                value={locationInfo?.mapLong}
                onChange={handleChange}
                data-handler="locationInfo"
                autoComplete="off"
              />
              {error?.mapLong && (
                <p style={{ color: "red" }}>{error?.mapLong}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
