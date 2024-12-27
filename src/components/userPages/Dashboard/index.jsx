import React, { useEffect } from "react";
import {
  ProfileAvatar01,
  ProfileAvatar11,
  rating,
  verified,
} from "../../imagepath";
import Footer from "../../home/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const parms = useLocation().pathname;
  const [dashboardStats, setDashboardStats] = useState({});

  const getDashboardStats = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getActiveListing,
        apiMethods.GET,
        null,
        headers
      );
      setDashboardStats(response?.data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  console.log(user?.userInfo?.user_type === "business", "userrrrr");

  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadscrumb Section */}
      <UserBreadCrumb path={"Home"} pageName={"Dashboard"} />

      {/* /Breadscrumb Section */}
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="dashboard" />
          <div className="dashboard-details">
            <div className="row">
              {user?.userInfo?.user_type === "business" ? (
                <div className="col-lg-3 col-md-3">
                  <div className="card dash-cards">
                    <div className="card-body">
                      <div className="dash-top-content">
                        <div className="dashcard-img">
                          <img src={verified} className="img-fluid" alt="" />
                        </div>
                      </div>

                      <div className="dash-widget-info">
                        <h6>Active Listing</h6>
                        <h3 className="counter">
                          {dashboardStats?.listing_count || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="col-lg-3 col-md-3">
                <div className="card dash-cards">
                  <div className="card-body">
                    <div className="dash-top-content">
                      <div className="dashcard-img">
                        <img src={rating} className="img-fluid" alt="" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6>Total Reviews</h6>
                      <h3> {dashboardStats?.review_count || 0} </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Dashboard Content */}
      <Footer />
    </>
  );
};
export default Dashboard;
