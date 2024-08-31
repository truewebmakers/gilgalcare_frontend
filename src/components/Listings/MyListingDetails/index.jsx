import React, { useEffect } from "react";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";
import {
  ProfileAvatar12,
  galleryicon,
  profile_img,
  statistic_icon,
  website,
} from "../../imagepath";
import StickyBox from "react-sticky-box";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Rooms from "../PublicListingDetails/myComponent2";
import Roomspics from "../PublicListingDetails/myComponent3";
import { apiMethods, apiUrls, dateFormat } from "../../../constants/constant";
import { useSelector } from "react-redux";
import UseApi from "../../../hooks/useApi";
import { customToast } from "../../common/Toast";
import mailIcon from "../../../assets/svg/mail.svg";
import location from "../../../assets/svg/map-pin.svg";
import eye from "../../../assets/svg/eye.svg";
import locationBig from "../../../assets/svg/locationBig.svg";
import calendar from "../../../assets/svg/calendar.svg";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import { Review } from "../PublicListingDetails/Review";
import { Ratings } from "../PublicListingDetails/Ratingsx";
import { ListDetails } from "../PublicListingDetails/listDetails";
import moment from "moment";

const MyListingDetails = () => {
  const parms = useLocation()?.pathname;
  const { user, profileData } = useSelector((state) => state.auth);
  const [listingDetail, setListingDetail] = useState({});
  const [features, setFeatures] = useState([]);

  const id = parms?.split("/")[2];

  const getListingDetail = async () => {
    try {
      if (user?.token) {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.getMyListingDetail + id,
          apiMethods.GET,
          null,
          headers
        );
        if (response?.status == 200 || response?.status == 201) {
          setListingDetail(response?.data?.data);
          return;
        }
      }
    } catch (err) {
      customToast.error(err?.message);
      return;
    }
  };

  useEffect(() => {
    getListingDetail();
  }, [id]);

  useEffect(() => {
    const listFeatures = listingDetail?.features_information?.split(",");
    setFeatures(listFeatures);
  }, [listingDetail]);

  return (
    <>
      <Header parms={parms} />
      {/*Galler Slider Section*/}
      <div className="bannergallery-section">
        <div className="gallery-slider d-flex">
          <Rooms img={listingDetail?.featured_image} />
        </div>
      </div>
      {/*/Galler Slider Section*/}
      {/*Details Description  Section*/}
      <section className="details-description">
        <div className="container">
          <div className="about-details">
            <div className="about-headings">
              <div className="author-img">
                <img src={listingDetail?.logo || profile_img} alt="authorimg" />
              </div>
              <div className="authordetails">
                <h5>
                  {listingDetail?.listing_title
                    ? listingDetail?.listing_title
                    : "-"}
                </h5>
                <div className="rating">
                  <img src={eye} alt="" />
                  <span className="d-inline-block average-rating">
                    {" "}
                    {listingDetail?.page_views
                      ? listingDetail?.page_views
                      : "0"}{" "}
                  </span>
                </div>
              </div>
            </div>
            {listingDetail?.price_from && listingDetail?.price_to ? (
              <div className="rate-details">
                <h4>
                  ${listingDetail?.price_from} - ${listingDetail?.price_to}
                </h4>
                <p>Fixed</p>
              </div>
            ) : (
              <div className="rate-details">
                <p>Price</p>
                <h6>Not-Disclosed</h6>
              </div>
            )}
          </div>
          <div className="descriptionlinks">
            <div className="row">
              <div className="col-lg-9">
                <ul>
                  <li>
                    <span>
                      <img src={location} alt="" />
                      {listingDetail?.location ? listingDetail?.location : "-"}
                    </span>
                  </li>
                  <li>
                    <Link
                      to={listingDetail?.website ? listingDetail?.website : "#"}
                      target="_blank"
                    >
                      <img src={website} alt="website" />
                      {listingDetail?.website ? listingDetail?.website : "-"}
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-regular fa-comment-dots" /> Write a
                      review
                    </Link>
                  </li>
                  <li>
                    <img src={mailIcon} alt="" />{" "}
                    {listingDetail?.email ? listingDetail?.email : "-"}
                  </li>
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="callnow">
                  <span>
                    {" "}
                    <i className="feather-phone-call" />{" "}
                    {listingDetail?.phone ? listingDetail?.phone : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/Details Description  Section*/}
      {/*Details Main  Section*/}
      <div className="details-main-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card ">
                <div className="card-header">
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                  <h4>Description</h4>
                </div>
                <div className="card-body">
                  <p>{listingDetail?.tagline ? listingDetail?.tagline : "-"}</p>
                  <p>
                    {listingDetail?.listing_description
                      ? listingDetail?.listing_description
                      : "-"}
                  </p>
                </div>
              </div>
              {/*Listing Features Section*/}
              <div className="card ">
                <div className="card-header">
                  <i className="feather-list" />
                  <h4>Listing Features</h4>
                </div>
                <div className="card-body">
                  <div className="lisiting-featues">
                    <div className="row">
                      {features?.map((item, index) => (
                        <div
                          className="featureslist d-flex align-items-center col-lg-4 col-md-4"
                          key={index}
                        >
                          <div className="feature-img">
                            {/* <img src={Feature_1_svg} alt="Room amenties" /> */}
                          </div>
                          <div className="featues-info">
                            <h6>{item}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*/Listing Features Section*/}
              {/*category Section*/}
              <div className="card ">
                <div className="card-header">
                  <i className="feather-list" />
                  <h4>Category</h4>
                </div>
                <div className="card-body">
                  <div className="lisiting-featues">
                    <div className="row">
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <img
                            src={listingDetail?.category?.feature_image || ""}
                            alt=""
                          />
                        </div>
                        <div className="featues-info">
                          <h6>
                            {listingDetail?.category?.name
                              ? listingDetail?.category?.name
                              : "-"}
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img1">
                          <img src={locationBig} alt="" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            {listingDetail?.category?.location
                              ? listingDetail?.category?.location
                              : "-"}
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img1">
                          <img src={calendar} alt="" />
                        </div>
                        <div className="featues-info">
                          <h6>
                            {listingDetail?.category?.created_at
                              ? moment(
                                  listingDetail?.category?.created_at
                                ).format(dateFormat)
                              : "-"}
                          </h6>
                        </div>
                      </div>
                      <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                        <div className="feature-img">
                          <div>Status:</div>
                        </div>
                        <div className="featues-info">
                          <h6>
                            {listingDetail?.category?.status
                              ? CapitalizeFirstLetter(
                                  listingDetail?.category?.status
                                )
                              : "-"}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*/category Section*/}
              {/* Gallery Section */}
              <div className="card gallery-section ">
                <div className="card-header ">
                  <img src={galleryicon} alt="gallery" />
                  <h4>Gallery</h4>
                </div>
                <div className="card-body">
                  <div className="gallery-content">
                    <Roomspics listingDetail={listingDetail} />
                  </div>
                </div>
              </div>
              {/*/Gallery Section*/}
              {/* Rating Section */}
              <Ratings />
              {/* Rating Section */}
              {/*Review  Section*/}
              <Review />
              {/*/Review Section*/}
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <ListDetails listingDetail={listingDetail} />
                  <div className="card">
                    <h4>
                      <img src={statistic_icon} alt="location" /> Statisfic
                    </h4>
                    <ul className="statistics-list">
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="fa-regular fa-eye" />
                          </span>
                          Views{" "}
                        </div>
                        <span className="text-end">
                          {" "}
                          {listingDetail?.page_views
                            ? listingDetail?.page_views
                            : "0"}
                        </span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-star" />
                          </span>
                          Ratings{" "}
                        </div>
                        <span className="text-end">
                          {" "}
                          {listingDetail?.ratings
                            ? listingDetail?.ratings
                            : "0"}
                        </span>
                      </li>
                      <li>
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-heart" />
                          </span>
                          Reviews{" "}
                        </div>
                        <span className="text-end">
                          {" "}
                          {listingDetail?.reviews
                            ? listingDetail?.reviews
                            : "0"}
                        </span>
                      </li>
                      <li className="mb-0">
                        <div className="statistic-details">
                          <span className="icons">
                            <i className="feather-share-2" />
                          </span>
                          Shares{" "}
                        </div>
                        <span className="text-end">
                          {" "}
                          {listingDetail?.total_shares
                            ? listingDetail?.total_shares
                            : "0"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="card">
                    <h4>
                      {" "}
                      <i className="feather-user" /> Author
                    </h4>
                    <div className="sidebarauthor-details align-items-center">
                      <div className="sideauthor-img">
                        <img
                          src={profileData?.profile_pic || ProfileAvatar12}
                          alt="author"
                        />
                      </div>
                      <div className="sideauthor-info">
                        <p className="authorname">{profileData?.name || "-"}</p>
                        <p>{profileData?.created_at || "-"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-0">
                    <h4>
                      {" "}
                      <i className="feather-phone-call" /> Contact Business
                    </h4>
                    <form className="contactbusinessform">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          rows={6}
                          className="form-control"
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                      <div className="submit-section">
                        <button
                          className="btn btn-primary submit-btn"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
      {/* /Details Main Section */}
      <Footer />
    </>
  );
};
export default MyListingDetails;
