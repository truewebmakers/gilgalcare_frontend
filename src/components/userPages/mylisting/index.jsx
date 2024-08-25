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
import { myListingColumns } from "../../../constants/tableColumns";

const MyListe = () => {
  const { user } = useSelector((state) => state.auth);
  const [myListing, setMyListings] = useState([]);
  const parms = useLocation().pathname;

  const getMyListings = async () => {
    try {
      if (user?.token) {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.getUserSpecificListing + user?.userInfo?.id,
          apiMethods.POST,
          null,
          headers
        );

        if (response?.status == 200 || response?.status == 201) {
          setMyListings(response?.data);
        }
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  const handleDeleteListing = async (e, id) => {
    e.preventDefault();
    try {
      if (user?.token) {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.deleteListing + id,
          apiMethods.DELETE,
          null,
          headers
        );

        if (response?.status == 200 || response?.status == 201) {
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
      {/* Breadscrumb Section */}

      <UserBreadCrumb path={"Home"} pageName={"My Listing"} />
      {/* /Breadscrumb Section */}
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="my-listing" />
          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div className="card-header">
                <h4>My Listings</h4>
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-listing"
                >
                  <i className="fa-solid fa-plus" /> Add Listing
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="listing-table datatable"
                    columns={myListingColumns(handleDeleteListing)}
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
export default MyListe;
