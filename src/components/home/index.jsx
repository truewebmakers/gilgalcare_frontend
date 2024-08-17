import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Blog16,
  Blog17,
  Blog18,
  Blog19,
  Category18Svg,
  Category19Svg,
  Category20Svg,
  Category21Svg,
  Category22Svg,
  Category23Svg,
  Category24Svg,
  Category25Svg,
  Category26Svg,
  Category27Svg,
  Category28Svg,
  City1,
  City2,
  City3,
  City4,
  FeaturePng,
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
} from "../imagepath";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Select5 from "./select5/Select5";
import LatestAds from "./slider/LatestAds";
import Testimonial5 from "./slider/Testimonial5";
import Trending5 from "./slider/Trending5";
import AOS from "aos";
import "aos/dist/aos.css";
import { LatestBlogs } from "./blog/LatestBlog";
import { StayTuned } from "./stayTuned/StayTuned";
import { PricingPlan } from "./pricingPlan/PricingPlan";
import { BestPlace } from "./bestPlace/BestPlace";
import { Space } from "./space/Space";
import { Category } from "./category/Category";
import { Banner } from "./banner/Banner";
import { useSelector } from "react-redux";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";

const Home5 = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleSwitchClick = () => {
      if ($("body").hasClass("light")) {
        $("body").removeClass("light");
        $(".switch").removeClass("switched");
      } else {
        $("body").addClass("light");
        $(".switch").addClass("switched");
      }
    };
    const handleScroll = () => {
      const e = document.querySelector(".progress-wrap path");
      const t = e.getTotalLength();
      const o = window.scrollY;
      const r = document.body.clientHeight - window.innerHeight;
      const i = t - (o * t) / r;
      e.style.strokeDashoffset = i;

      if ($(window).scrollTop() > 50) {
        $(".progress-wrap").addClass("active-progress");
      } else {
        $(".progress-wrap").removeClass("active-progress");
      }
    };

    $(".switch").on("click", handleSwitchClick);

    $(window).on("scroll", handleScroll);

    $(".progress-wrap").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 550);
      return false;
    });

    return () => {
      $(".switch").off("click", handleSwitchClick);
      $(window).off("scroll", handleScroll);
      $(".progress-wrap").off("click");
    };
  }, []);

  const fetchAllCategories = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const response = await UseApi(
        apiUrls.getAllCategoriesPublic,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.data) {
        const formattedCategories = response?.data?.map((category) => ({
          label: category?.name,
          value: category?.id,
          image: category?.feature_image,
          location: category?.location,
        }));
        setCategories(formattedCategories);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <Header />

        {/* Banner */}
        <Banner categories={categories} />
        {/* Banner */}

        {/* Category */}
        <Category categories={categories} />
        {/* Category */}

        {/* Business */}
        <Trending5 />
        {/* Business */}

        {/* Featured Cities */}
        {/* <section className="feature-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="section-heading heading-five aos"
                data-aos="fade-up"
              >
                <h2>Featured Cities</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="city-box aos" data-aos="fade-up">
                <div className="citi-img">
                  <Link to="#">
                    <img src={City1} className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="city-overlay">
                  <div className="city-name">
                    <h5>New York</h5>
                    <ul>
                      <li>
                        <i className="feather-map-pin"></i> 10 Cities
                      </li>
                      <li>
                        <i className="feather-map"></i> 30+ Listing
                      </li>
                    </ul>
                  </div>
                  <div className="rating d-flex">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="city-box aos" data-aos="fade-up">
                <div className="citi-img">
                  <Link to="#">
                    <img src={City2} className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="city-overlay">
                  <div className="city-name">
                    <h5>London</h5>
                    <ul>
                      <li>
                        <i className="feather-map-pin"></i> 15 Cities
                      </li>
                      <li>
                        <i className="feather-map"></i> 23+ Listing
                      </li>
                    </ul>
                  </div>
                  <div className="rating d-flex">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="city-box aos" data-aos="fade-up">
                <div className="citi-img">
                  <Link to="#">
                    <img src={City3} className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="city-overlay">
                  <div className="city-name">
                    <h5>Korea</h5>
                    <ul>
                      <li>
                        <i className="feather-map-pin"></i> 12 Cities
                      </li>
                      <li>
                        <i className="feather-map"></i> 32+ Listing
                      </li>
                    </ul>
                  </div>
                  <div className="rating d-flex">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="city-box aos" data-aos="fade-up">
                <div className="citi-img">
                  <Link to="#">
                    <img src={City4} className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="city-overlay">
                  <div className="city-name">
                    <h5>Malaysia</h5>
                    <ul>
                      <li>
                        <i className="feather-map-pin"></i> 18 Cities
                      </li>
                      <li>
                        <i className="feather-map"></i> 24+ Listing
                      </li>
                    </ul>
                  </div>
                  <div className="rating d-flex">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
        {/* Cities */}

        {/* Space */}
        <Space />
        {/* Space */}

        {/*--------- Best place -------------*/}
        {/* <BestPlace/> */}
        {/*------ Best place --------*/}

        {/* Latest Ads */}
        <LatestAds />
        {/* Latest Ads */}

        {/* Pricing Plan */}
        <PricingPlan />
        {/* Pricing Plan */}

        {/* Testimonial */}
        <Testimonial5 />
        {/* Testimonial */}

        {/* Our Latest Blog */}
        <LatestBlogs />
        {/* Our Latest Blog */}

        {/* Stay Tuned */}
        <StayTuned />
        {/* Stay Tuned */}

        <Footer />
      </div>
      {/* scrollToTop start */}
      <div className="progress-wrap active-progress">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: "stroke-dashoffset 10ms linear 0s",
              strokeDasharray: "307.919px, 307.919px",
              strokeDashoffset: "228.265px",
            }}
          />
        </svg>
      </div>
      {/* scrollToTop end */}
    </>
  );
};

export default Home5;
