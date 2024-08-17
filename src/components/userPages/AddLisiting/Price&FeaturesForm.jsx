import React from "react";

export const PriceAndFeaturesForm = ({ basicInfo2, error, handleChange }) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>Price And Features</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="col-form-label">Price Range</label>
            <input
              type="text"
              className="form-control pass-input"
              placeholder="$$$"
              name="priceRange"
              value={basicInfo2?.priceRange}
              onChange={handleChange}
              autoComplete="off"
              data-handler="basicInfo2"
            />
            {error?.priceRange && (
              <p style={{ color: "red" }}>{error?.priceRange}</p>
            )}
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="form-group formlast-input">
                <label className="col-form-label">Price From</label>
                <input
                  type="text"
                  className="form-control pass-input"
                  placeholder="$$$"
                  name="priceFrom"
                  value={basicInfo2?.priceFrom}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="basicInfo2"
                />
              </div>
              {error?.priceFrom ? (
                <p style={{ color: "red" }}>{error?.priceFrom}</p>
              ) : null}
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group formlast-input formlast-input-inner">
                <label className="col-form-label">Price To</label>
                <input
                  type="text"
                  className="form-control pass-input"
                  placeholder="$$$"
                  name="priceTo"
                  value={basicInfo2?.priceTo}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="basicInfo2"
                />
              </div>
              {error?.priceTo ? (
                <p style={{ color: "red" }}>{error?.priceTo}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4>Features Information</h4>
        </div>
        <div className="card-body">
          <div className="form-group featuresform-list mb-0">
            <ul>
              {[
                "Accepts Credit Cards",
                "Bike Parking",
                "Parking Street",
                "Pets Friendly",
                "Wheelchair Accessible",
                "Wireless Internet",
              ].map((feature) => (
                <li key={feature}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      value={feature}
                      checked={basicInfo2?.featuresInformation?.includes(
                        feature
                      )}
                      name="featuresInformation"
                      onChange={handleChange}
                      data-handler="basicInfo2"
                    />
                    <span className="checkmark" /> {feature}
                  </label>
                </li>
              ))}
            </ul>
            {error?.featuresInformation && (
              <p style={{ color: "red" }}>{error?.featuresInformation}</p>
            )}
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </>
  );
};
