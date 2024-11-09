import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import { myPlansColumns } from "../../../constants/tableColumns";

const MyPlans = () => {
  const { user } = useSelector((state) => state.auth);
  const [myListing, setMyListings] = useState([]);
  const parms = useLocation().pathname;

  // Fetch user's plans
  const getMyListings = async () => {
    try {
      if (user?.token) {
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
          setMyListings(response?.data?.plans);
        }
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  // Handle plan deletion
  const handleDeleteListing = async (e, id) => {
    e.preventDefault();
    try {
      if (user?.token) {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };

        const response = await UseApi(
          apiUrls.deletePlan + id,
          apiMethods.POST,
          null,
          headers
        );

        if (response?.status === 200 || response?.status === 201) {
          getMyListings();
        }
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadcrumb Section */}
      <UserBreadCrumb path={"Home"} pageName={"My Plans"} />
      {/* /Breadcrumb Section */}

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="my-plans" />
          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div className="card-header">
                <h4>My Plans</h4>
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-plans"
                >
                  <i className="fa-solid fa-plus" /> Add Plan
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="listing-table datatable"
                    columns={myPlansColumns(handleDeleteListing)}
                    dataSource={myListing}
                    rowKey={(record) => record?.id}
                    showSizeChanger={false}
                    pagination={false}
                  />
                </div>
                <div className="blog-pagination"></div>
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

export default MyPlans;
