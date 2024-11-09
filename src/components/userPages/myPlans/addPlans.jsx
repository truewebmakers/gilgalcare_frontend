import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import { customToast } from "../../common/Toast";
import { addPlanValidation } from "../../../utils/validations";
import Loader from "../../common/Loader";
import { planFeatures } from "../../../constants/constant";
import { addPlanService } from "../../../services/addPlanService";
import { editPlanService } from "../../../services/editPlanService";
import { getPlanById } from "../../../services/getPlansById";

const AddPlans = () => {
  const [addPlans, setAddPlans] = useState({
    name: "",
    term: "",
    price: "",
    features: {
      "business-name": false,
      "owner-name": false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const parms = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState({
    name: "",
    term: "",
    price: "",
  });

  const id = parms?.pathname?.includes("edit-plans") ? parms?.state?.id : null;

  const fetchPlansById = async () => {
    try {
      // Fetch the plan data from the API
      const response = await getPlanById(user?.token, id);

      // Set state based on the API response
      setAddPlans((prevFields) => {
        return Object.entries(prevFields).reduce((acc, [key, value]) => {
          if (
            key === "features" &&
            typeof value === "object" &&
            value !== null
          ) {
            // Map the features from the API response
            const updatedFeatures = planFeatures?.reduce(
              (nestedAcc, { value: featureKey, name }) => {
                // Convert the feature key to match the API format, e.g., 'business-name' -> 'features['business_name']'
                const apiFeatureKey = `features['${featureKey.replace(
                  /-/g,
                  "_"
                )}']`;

                // Set the checkbox to true if the feature is present in the response
                nestedAcc[featureKey] =
                  response?.plans.features?.[apiFeatureKey] || false;
                return nestedAcc;
              },
              {}
            );

            acc[key] = {
              ...value, // Preserve existing values for features
              ...updatedFeatures, // Update with features from the response
            };
          } else if (key === "name" || key === "term" || key === "price") {
            // Update simple fields like name, term, and price from the response
            acc[key] = response?.plans[key] || value;
          } else {
            // For other fields, preserve their default values or use the response
            acc[key] = value;
          }
          return acc;
        }, {});
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlansById();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "features") {
      setAddPlans((prevState) => ({
        ...prevState,
        features: {
          ...prevState.features,
          [value]: checked, // Update the specific feature
        },
      }));
    } else {
      setAddPlans({ ...addPlans, [name]: value });
    }
  };

  const hasErrors = (error) => {
    return Object.values(error).some((err) => err);
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((field) => field);
  };

  useEffect(() => {
    if (hasErrors(error)) {
      setIsDisable(true);
      return;
    }
    setIsDisable(false);
  }, [error]);

  const handleAddPlans = async (e) => {
    e.preventDefault();
    let newErr = {};
    for (let key in addPlans) {
      if (key !== "features") {
        newErr = { ...newErr, ...addPlanValidation(key, addPlans[key]) };
      }
    }
    setError(newErr);
    if (!hasErrors(newErr) && areAllFieldsFilled(addPlans)) {
      setIsLoading(true);

      try {
        const payload = {
          ...addPlans,
          features: addPlans.features,
        };

        let res;
        if (id) {
          res = await editPlanService(payload, user?.token, id);
        } else {
          res = await addPlanService(payload, user?.token);
        }
        if (res?.successStatus === true) {
          setAddPlans({
            name: "",
            term: "",
            price: "",
            features: {
              "business-name": false,
              "owner-name": false,
            },
          });
        }
      } catch (err) {
        customToast.error(err?.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <UserHeader parms={parms?.pathname} />
      <UserBreadCrumb
        path="Home"
        pageName={id ? "Update Plans" : "Add Plans"}
      />
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl={id ? "" : "add-plans"} />
          <div className="profile-content">
            <div className="messages-form">
              <div className="card">
                <div className="card-header">
                  <h4>{id ? "Update Plan" : "Add Plan"}</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="col-form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control pass-input"
                      placeholder="Name"
                      value={addPlans?.name}
                      name="name"
                      onChange={handleChange}
                    />
                    {error?.name && (
                      <p style={{ color: "red" }}>{error?.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="col-form-label">
                      Term <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control pass-input"
                      placeholder="Term"
                      value={addPlans?.term}
                      name="term"
                      onChange={handleChange}
                    />
                    {error?.term && (
                      <p style={{ color: "red" }}>{error?.term}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="col-form-label">
                      Price <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control pass-input"
                      placeholder="Price"
                      value={addPlans?.price}
                      name="price"
                      onChange={handleChange}
                    />
                    {error?.price && (
                      <p style={{ color: "red" }}>{error?.price}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="col-form-label label-heading">
                      Features
                    </label>
                    <div className="row category-listing">
                      <div className="col-lg-4">
                        <ul>
                          {planFeatures?.map((item, index) => (
                            <li key={index}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name="features"
                                  value={item?.value}
                                  checked={addPlans.features[item?.value]}
                                  onChange={handleChange}
                                  autoComplete="off"
                                />
                                <span className="checkmark" /> {item?.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                        {error?.features && (
                          <p style={{ color: "red" }}>{error?.features}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleAddPlans}
                disabled={isDisable}
              >
                {isLoading ? (
                  <>
                    <Loader />
                    &nbsp;&nbsp;
                  </>
                ) : id ? (
                  "Update Plan"
                ) : (
                  "Add Plan"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddPlans;
