import React, { useEffect } from "react";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";
import { ProfileAvatar12, defaultPic, galleryicon } from "../../imagepath";
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
import { ListDetails } from "../PublicListingDetails/listDetails";
import moment from "moment";
import { Statistics } from "../PublicListingDetails/Statistics";
import BookmarkIcon from "../../../assets/svg/bookmark.svg";
import { fetchAvailability } from "../../../services/fetchAvailablity";
import WorkingHoursModal from "../PublicListingDetails/WorkingHoursModal";
import { truncateName } from "../../../utils/commonFunctions";
import { ReviewListingComp } from "../PublicListingDetails/ReviewListingComp";
import { ContactBusiness } from "../PublicListingDetails/contactBusiness";

const MyListingDetails = () => {
  const parms = useLocation();
  const id = parms?.pathname?.split("/")?.[2];
  const { user, profileData } = useSelector((state) => state.auth);
  const [listingDetail, setListingDetail] = useState({});
  const [features, setFeatures] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);

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
    fetchAvailability(setWorkingHours, id, user?.token);
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
          <Rooms img={listingDetail?.featured_image || defaultPic} />
        </div>
      </div>
      {/*/Galler Slider Section*/}
      {/*Details Description  Section*/}
      <section className="details-description">
        <div className="container">
          <div className="about-details">
            <div className="about-headings">
              <div className="author-img">
                <img src={listingDetail?.logo || defaultPic} alt="authorimg" />
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
          </div>
          <div className="descriptionlinks">
            <div className="row">
              <div className="col-lg-9">
                <ul>
                  <li>
                    <span>
                      <img src={location} alt="" />
                      {listingDetail?.address ? listingDetail?.address : "-"}
                    </span>
                  </li>

                  <li>
                    <Link to="#">
                      <i className="fa-regular fa-comment-dots" /> Write a
                      review
                    </Link>
                  </li>
                  <li>
                    <img src={mailIcon} alt="" />{" "}
                    {listingDetail?.email
                      ? listingDetail?.email?.toLowerCase()
                      : "-"}
                  </li>
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="callnow">
                  <span>
                    {" "}
                    <i
                      className="feather-phone-call"
                      style={{ color: "red !important" }}
                    />
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
                  <h4>Business Description</h4>
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
                  <h4>Key Features</h4>
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
                            <img src={BookmarkIcon} alt="" />
                          </div>{" "}
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
                  <h4>Service Category</h4>
                </div>
                <div className="card-body">
                  <div className="lisiting-featues">
                    {listingDetail?.categories &&
                      listingDetail?.categories?.map((item, index) => (
                        <div className="row" key={index}>
                          <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                            <div className="feature-img">
                              <img src={item?.feature_image || ""} alt="" />
                            </div>
                            <div className="featues-info">
                              <h6 style={{ whiteSpace: "nowrap" }}>
                                {truncateName(item?.name) || "-"}
                              </h6>
                            </div>
                          </div>
                          <div className="featureslist d-flex align-items-center col-lg-4 col-md-4">
                            <div
                              className="feature-img"
                              style={{ marginLeft: "87px" }}
                            >
                              <img src={locationBig} alt="" />
                            </div>
                            <div className="featues-info">
                              <h6>{item?.location || "-"}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <WorkingHoursModal workingHours={workingHours} />
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
              <ReviewListingComp />
              {/*/Review Section*/}
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <ListDetails listingDetail={listingDetail} />
                  <Statistics listingDetail={listingDetail} />
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
                        <p>
                          {moment(profileData?.created_at).format(dateFormat) ||
                            "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-0">
                    <h4>
                      {" "}
                      <i className="feather-phone-call" /> Contact Business
                    </h4>
                    <ContactBusiness />
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
