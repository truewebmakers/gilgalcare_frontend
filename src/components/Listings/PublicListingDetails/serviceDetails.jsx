import React, { useEffect } from "react";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";
import { defaultPic, galleryicon } from "../../imagepath";
import StickyBox from "react-sticky-box";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Rooms from "./myComponent2";
import Roomspics from "./myComponent3";
import { apiMethods, apiUrls } from "../../../constants/constant";
import UseApi from "../../../hooks/useApi";
import { customToast } from "../../common/Toast";
import mailIcon from "../../../assets/svg/mail.svg";
import shareIcon from "../../../assets/svg/share-2.svg";
import location from "../../../assets/svg/map-pin.svg";
import eye from "../../../assets/svg/eye.svg";
import locationBig from "../../../assets/svg/locationBig.svg";
import { truncateName } from "../../../utils/commonFunctions";
import { ListDetails } from "./listDetails";
import { Statistics } from "./Statistics";
import { incrementShares } from "../../../services/incrementShares";
import BookmarkIcon from "../../../assets/svg/bookmark.svg";
import { ReviewListingComp } from "./ReviewListingComp";
import WorkingHoursModal from "./WorkingHoursModal";
import { fetchAvailability } from "../../../services/fetchAvailablity";

const ServiceDetails = () => {
  const parms = useLocation();
  const id = parms?.state?.id;
  const [listingDetail, setListingDetail] = useState({});
  const [features, setFeatures] = useState([]);
  const [shareUpdated, setShareUpdated] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);

  const getListingDetail = async () => {
    try {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.getPublicListingDetails + id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        setListingDetail(response?.data?.data);
        return;
      }
    } catch (err) {
      customToast.error(err?.message);
      return;
    }
  };

  useEffect(() => {
    getListingDetail();
    fetchAvailability(
      setWorkingHours,
      id,
      "111|EcL6b1VnXnz2b7Fg2VUsCvXrsrnyqXfdOX63gPW011bd0d10"
    );
  }, [id]);

  useEffect(() => {
    const listFeatures = listingDetail?.features_information?.split(",");
    setFeatures(listFeatures);
  }, [listingDetail]);

  const handleShareClick = async () => {
    try {
      const response = await incrementShares(id);
      if (response?.result?.message == "Shares updated successfully") {
        setShareUpdated(true);
        const pathname = window.location.href;
        await navigator.clipboard.writeText(pathname);
        customToast.success("Copied successfully!"); // Example feedback
      }
    } catch (error) {
      return error;
    }
  };

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
                    <a
                      href="#write-review"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents default hash behavior
                        document
                          .getElementById("write-review")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <i className="fa-regular fa-comment-dots" /> Write a
                      review
                    </a>
                  </li>
                  <li>
                    <img src={shareIcon} alt="" />
                    <span
                      onClick={handleShareClick}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Share
                    </span>
                  </li>
                  <li>
                    <img src={mailIcon} alt="" />{" "}
                    {listingDetail?.email ? listingDetail?.email : "-"}
                  </li>
                </ul>
              </div>
              <div className="col-lg-3">
                <div className="callnow">
                  <a
                    href={`tel:${listingDetail?.phone}`}
                    className="btn btn-link"
                  >
                    <span>
                      <i
                        className="feather-phone-call"
                        style={{ color: "red" }}
                      />{" "}
                      {listingDetail?.phone ? listingDetail?.phone : "-"}
                    </span>
                  </a>
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
                  <h6>
                    {listingDetail?.tagline ? listingDetail?.tagline : "-"}
                  </h6>
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
              {listingDetail?.meta?.length ? (
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
              ) : null}
              {/*/Gallery Section*/}
              {/* Rating Section */}
              <ReviewListingComp />
              {/*/Review Section*/}
            </div>
            <div className="col-lg-3 theiaStickySidebar">
              <StickyBox>
                <div className="rightsidebar">
                  <ListDetails listingDetail={listingDetail} />
                  <Statistics
                    listingDetail={listingDetail}
                    shareUpdated={shareUpdated}
                  />
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
export default ServiceDetails;
