import React, { useEffect, useState } from "react";

export const PriceAndFeaturesForm = ({ basicInfo2, error, handleChange }) => {
  // Initialize state with one non-deletable input or split comma-separated string from props
  const [features, setFeatures] = useState(
    basicInfo2?.featuresInformation?.length > 0
      ? basicInfo2.featuresInformation.split(",")
      : [""]
  );

  useEffect(() => {
    // If basicInfo2.featuresInformation is available and a string, split it into an array
    if (typeof basicInfo2?.featuresInformation === "string") {
      setFeatures(basicInfo2.featuresInformation.split(","));
    }
  }, [basicInfo2.featuresInformation]);

  // Handle adding a new feature input
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  // Handle removing a feature input
  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  // Handle updating a feature input value
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Handle concatenation and updating state on blur
  const handleFeatureBlur = () => {
    const concatenatedFeatures = features.filter(Boolean).join(","); // Concatenate non-empty features
    handleChange({
      target: {
        name: "featuresInformation",
        value: concatenatedFeatures,
        dataset: { handler: "basicInfo2" },
      },
    });
  };

  return (
    <>
      {/* <div className="card">
        <div className="card-header">
          <h4>Features</h4>
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
      </div> */}
      <div className="card">
        <div className="card-header">
          <h4>Features Information</h4>
        </div>
        <div className="card-body">
          <div className="form-group featuresform-list mb-0">
            {/* Render feature inputs */}
            <div className="row">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="col-md-6 d-flex align-items-center mb-2"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    onBlur={handleFeatureBlur} // Update onBlur
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleAddFeature}
            >
              Add More
            </button>
            {error?.featuresInformation && (
              <p style={{ color: "red" }}>{error?.featuresInformation}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
