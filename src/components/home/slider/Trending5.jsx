import React, { useEffect, useState } from "react";
import { Business1, ProfileAvatar03 } from "../../imagepath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Trending5.css";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";

const Trending5 = () => {
  const [trendingData, setTrendingData] = useState([]);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const trendingPlaces = async () => {
    try {
      const response = await UseApi(apiUrls.trendingListings, apiMethods.GET);

      setTrendingData(response?.data?.data);
    } catch (err) {
      return err?.message;
    }
  };

  useEffect(() => {
    trendingPlaces();
  }, []);

  return (
    <section className="business-section">
      {trendingData?.length ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                className="section-heading heading-five aos"
                data-aos="fade-up"
              >
                <h2>Trending Listings</h2>
              </div>
            </div>
          </div>
          <Slider
            {...settings}
            className="silderBotton business-slider grid-view"
          >
            {trendingData?.map((item, index) => (
              <div className="card business-card aos" data-aos="fade-up" key={index}>
                <div className="blog-widget">
                  <div className="blog-img">
                    <Link
                      to={`/listing-details/${item?.uuid}`}
                      state={{ id: item?.id }}
                    >
                      <img
                        src={
                          item?.featured_image || "/img/trendingDefault.jpeg"
                        }
                        alt=""
                        width={256}
                        height={168}
                      />
                    </Link>
                  </div>
                  <div className="bloglist-content" key={index}>
                    <div className="card-body">
                      <span className="Featured-text">Featured</span>
                      <div className="grid-author">
                        <img src={item?.logo} />
                      </div>
                      <div className="blogfeaturelink">
                        <div className="blog-author text-end">
                          <span>
                            <i className="feather-map-pin"></i>{" "}
                            {item?.address
                              ? CapitalizeFirstLetter(item?.address)
                              : "-"}
                          </span>
                        </div>
                      </div>
                      <h6>
                        <Link
                          to={`/listing-details/${item?.uuid}`}
                          state={{ id: item?.id }}
                        >
                          {item?.listing_title
                            ? CapitalizeFirstLetter(item?.listing_title)
                            : "-"}
                        </Link>
                      </h6>
                      <div className="amount-details">
                        <div className="amount d-none">
                          <span className="validrate">
                            ${item?.price_to ? item?.price_to : null}
                          </span>
                        </div>
                        <div className="ratings">
                          <span>Published </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Repeat for other cards */}
          </Slider>
        </div>
      ) : null}
    </section>
  );
};

export default Trending5;
