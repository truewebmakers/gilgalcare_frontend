import React from "react";
import MapSection from "./LocationAutoComplete";

export const LocationForm = ({
  locationInfo,
  setLocation,
  error,
  handleChange,
  markerPosition,
  setMarkerPosition,
  setError,
  isDisable,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Location Information</h4>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="col-form-label">Address</label>
          <input
            id="address-input"
            type="text"
            className="form-control"
            name="address"
            value={locationInfo?.address}
            onChange={handleChange}
            data-handler="locationInfo"
            autoComplete="off"
            placeholder="Search for your address"
          />
          {error?.address && <p style={{ color: "red" }}>{error?.address}</p>}
        </div>
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
        <MapSection
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          locationInfo={locationInfo}
          setLocation={setLocation}
          setError={setError}
          isDisable={isDisable}
        />
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
