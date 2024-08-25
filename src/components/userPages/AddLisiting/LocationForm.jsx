import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "430px",
};

const defaultCenter = {
  lat: 26.045130803169,
  lng: -80.26548188573862,
};

export const LocationForm = ({
  locationInfo,
  setLocation,
  error,
  handleChange,
  markerPosition,
  setMarkerPosition,
}) => {
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLocation((prevState) => ({
      ...prevState,
      mapLat: lat.toString(),
      mapLong: lng.toString(),
    }));
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
