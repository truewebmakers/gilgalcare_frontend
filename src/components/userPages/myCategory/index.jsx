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
import { myCategoryListingColumns } from "../../../constants/tableColumns";

const MyCategory = () => {
  const { user } = useSelector((state) => state.auth);
  const [myListing, setMyListings] = useState([]);
  const parms = useLocation().pathname;

  const getMyCategories = async () => {
    try {
      if (user?.token) {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.getAllCategoriesList,
          apiMethods.GET,
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
    getMyCategories();
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
          apiUrls.deleteCategory + id,
          apiMethods.DELETE,
          null,
          headers
        );

        if (response?.status == 200 || response?.status == 201) {
          getMyCategories();
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

      <UserBreadCrumb path={"Home"} pageName={"My Category"} />
      {/* /Breadscrumb Section */}
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="my-category" />
          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div className="card-header">
                <h4>My Category</h4>
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-category"
                >
                  <i className="fa-solid fa-plus" /> Add Category
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="listing-table datatable"
                    columns={myCategoryListingColumns(handleDeleteListing)}
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
export default MyCategory;
