import React, { useEffect, useState } from "react";

export const PriceAndFeaturesForm = ({ basicInfo2, error, handleChange }) => {
  const [features, setFeatures] = useState(
    basicInfo2?.featuresInformation?.length > 0 &&
      basicInfo2?.featuresInformation !== null
      ? basicInfo2?.featuresInformation
      : [""]
  );

  useEffect(() => {
    if (
      typeof basicInfo2?.featuresInformation === "string" &&
      basicInfo2?.featuresInformation?.length > 0
    ) {
      setFeatures(JSON.parse(basicInfo2?.featuresInformation));
    }
  }, [basicInfo2?.featuresInformation]);

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

  const handleFeatureBlur = () => {
    handleChange({
      target: {
        name: "featuresInformation",
        value: features,
        dataset: { handler: "basicInfo2" },
      },
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>Features Information</h4>
        </div>
        <div className="card-body">
          <div className="form-group featuresform-list mb-0">
            {/* Render feature inputs */}
            <div className="row">
              {features?.map((feature, index) => (
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
