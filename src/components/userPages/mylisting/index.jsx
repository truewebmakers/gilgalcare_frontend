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
          apiUrls.getMyListing + user?.userInfo?.uuid,
          apiMethods.GET,
          null,
          headers
        );
        if (response?.status == 200 || response?.status == 201) {
          console.log(response, "responnn");

          const data = response?.data?.user;
          return data;
        }
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  const parms = useLocation().pathname;
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
                    columns={myListingColumns}
                    dataSource={myListing}
                    rowKey={(record) => record?.id}
                    showSizeChanger={false}
                  />
                </div>
                <div className="blog-pagination">
                  {/* <nav>
                    <ul className="pagination">
                      <li className="page-item previtem">
                        <Link className="page-link" to="#">
                          <i className="fas fa-regular fa-arrow-left" /> Prev
                        </Link>
                      </li>
                      <li className="justify-content-center pagination-center">
                        <div className="pagelink">
                          <ul>
                            <li className="page-item">
                              <Link className="page-link" to="#">
                                1
                              </Link>
                            </li>
                            <li className="page-item active">
                              <Link className="page-link" to="#">
                                2{" "}
                                <span className="visually-hidden">
                                  (current)
                                </span>
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="#">
                                3
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="page-item nextlink">
                        <Link className="page-link" to="#">
                          Next <i className="fas fa-regular fa-arrow-right" />
                        </Link>
                      </li>
                    </ul>
                  </nav> */}
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
export default MyListe;
