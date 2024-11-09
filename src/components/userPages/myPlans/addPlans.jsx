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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "features") {
      setAddPlans((prevState) => ({
        ...prevState,
        features: {
          ...prevState.features,
          [value]: checked,
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
        console.log(res, "resssssssss");

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
                                  type="checkbox" // Corrected to checkbox
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
                  "Update Category"
                ) : (
                  "Add Category"
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
