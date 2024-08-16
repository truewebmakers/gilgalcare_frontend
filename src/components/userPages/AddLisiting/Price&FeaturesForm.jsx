import React from "react";
export const PriceAndFeaturesForm = ({ basicInfo2, setBasicInfo2, error }) => {
  const handleChange = () => {};
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
            />
            {error?.priceRange && (
              <p style={{ color: "red" }}>{error?.priceRange}</p>
            )}
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="form-group formlast-input">
                <label className="col-form-label">Price From</label>
                <select className="form-control select">
                  <option>65</option>
                  <option>75</option>
                  <option>85</option>
                  <option>95</option>
                  <option>105</option>
                  <option>110</option>
                  <option>115</option>
                </select>
              </div>
              {error?.priceFrom && (
                <p style={{ color: "red" }}>{error?.priceFrom}</p>
              )}
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group formlast-input formlast-input-inner">
                <label className="col-form-label">Price To</label>
                <select className="form-control select">
                  <option>120</option>
                  <option>130</option>
                  <option>140</option>
                  <option>150</option>
                  <option>160</option>
                  <option>170</option>
                  <option>190</option>
                </select>
              </div>
              {error?.priceTo && (
                <p style={{ color: "red" }}>{error?.priceTo}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4>Features information</h4>
        </div>
        <div className="card-body">
          <div className="form-group featuresform-list mb-0">
            <ul>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="wireless-internet" />
                  <span className="checkmark" /> Accepts Credit Cards
                </label>
              </li>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="accept-credit-card" />
                  <span className="checkmark" /> Bike Parking
                </label>
              </li>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="Coupouns" />
                  <span className="checkmark" /> Parking Street
                </label>
              </li>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="parking-street" />
                  <span className="checkmark" /> Pets Friendly
                </label>
              </li>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="Coupouns" />
                  <span className="checkmark" /> Wheelchair Accessible
                </label>
              </li>
              <li>
                <label className="custom_check">
                  <input type="checkbox" name="parking-street" />
                  <span className="checkmark" /> Wireless Internet
                </label>
              </li>
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
