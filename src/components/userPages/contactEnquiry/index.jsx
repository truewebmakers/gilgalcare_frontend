import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import { myContactEnquiryTable } from "../../../constants/tableColumns";

const ContactEnquiry = () => {
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
          apiUrls.getContactEnquiryList,
          apiMethods.GET,
          null,
          headers
        );
        if (response?.status === 200 || response?.status === 201) {
          setMyListings(response?.data?.data);
        }
      }
    } catch (err) {
      customToast.error(err?.message);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadcrumb Section */}
      <UserBreadCrumb path={"Home"} pageName={"My Plans"} />
      {/* /Breadcrumb Section */}

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="contact-enquiry" />
          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div className="card-header">
                <h4>Contact Enquiry</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="listing-table datatable"
                    columns={myContactEnquiryTable()}
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

export default ContactEnquiry;
