import React, { useEffect, useState } from "react";

import Header from "../../../home/header/Header";
import Footer from "../../../home/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import UseApi from "../../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../../constants/constant";
import { customToast } from "../../../common/Toast";
import { useSelector } from "react-redux";
import { CapitalizeFirstLetter } from "../../../../utils/commonFunctions";

const Pricing = () => {
  const parms = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [myPlans, setMyPlans] = useState([]);
  const registerData = parms?.state?.signupData;

  // Fetch user's plans
  const getPlans = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };

      const response = await UseApi(
        apiUrls.getPlans,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        setMyPlans(response?.data?.plans);
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const formatFeatureName = (featureKey) => {
    const match = featureKey?.match(/features\['(.*?)'\]/);
    if (match && match[1]) {
      // Convert snake_case or other formats into a readable string
      return match[1]
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    }
    return featureKey;
  };

  return (
    <>
      <Header parms={parms?.pathname} />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Pricing Plan</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Pricing Plan
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Pricing Plan Section */}
      <section className="pricingplan-section pricing-page">
        <div className="section-heading">
          <div className="container">
            <div className="row text-center">
              <h2>
                Our Pricing <span>Pla</span>n
              </h2>
              <p>Checkout these subscription plans for our clients</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-3 d-flex col-md-6">
              <div className="price-card flex-fill">
                <div className="price-head">
                  <div className="price-level">
                    <h6>Intro</h6>
                  </div>
                  <h4>
                    $10 <span>/ month</span>
                  </h4>
                </div>
                <div className="price-body">
                  <p>For most business that want to optimize web queries</p>
                  <ul>
                    <li className="active">Basic listing submission</li>
                    <li className="active">One Listing</li>
                    <li className="active">30 days Availabilty</li>
                    <li className="inactive">Limited Support</li>
                    <li className="inactive">Edit your listing</li>
                  </ul>
                  <div>
                    <Link
                      to={`/paynow/${"5ed3fd38-8cc6-49a7-821e-024b6b9a1486"}`}
                      state={{
                        id: "5ed3fd38-8cc6-49a7-821e-024b6b9a1486",
                        registerData,
                        price: 500,
                      }}
                      className="btn viewdetails-btn"
                    >
                      Choose Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
            {myPlans?.map((item, index) => (
              <div className="col-lg-3 d-flex col-md-6" key={index}>
                <div className="price-card flex-fill">
                  <div className="price-head">
                    <div className="price-level">
                      <h6>
                        {item?.name ? CapitalizeFirstLetter(item?.name) : "-"}
                      </h6>
                    </div>
                    <h4>
                      ${item?.price ? item?.price : "0"}{" "}
                      <span>/ {item?.term}</span>
                    </h4>
                  </div>
                  <div className="price-body">
                    {/* <p>For most business that want to optimize web queries</p> */}
                    <ul>
                      {Object.keys(item?.features).map((key) => (
                        <li
                          key={key}
                          className={
                            item?.features[key] ? "active" : "inactive"
                          }
                        >
                          {formatFeatureName(key)}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Link
                        to={`/paynow/${item?.uuid}`}
                        state={{
                          id: item?.uuid,
                          registerData,
                          price: item?.price,
                        }}
                        className="btn viewdetails-btn"
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* /Pricing Plan Section */}

      <Footer />
    </>
  );
};
export default Pricing;
