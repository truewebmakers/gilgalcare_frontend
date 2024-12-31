import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { ProfileAvatar02, listgrid_1 } from "../../imagepath";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { getCategoryNameById } from "../../../utils/commonApis";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import HeaderFilterBar from "./filterBar";
import PageNotFound from "../../pageNotFound";

const GridSidebar = () => {
  const parms = useLocation().pathname;
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState({
    listing_title: "",
    category_id: [],
    location: "",
    price_from: "",
    price_to: "",
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryIdVal = query.get("category") || "";
  const urlLocation = query.get("location") || "";
  const [loading, setLoading] = useState("init");

  const fetchPublicBusinessListing = async (filters) => {
    try {
      setLoading("fetching");
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const queryParams = new URLSearchParams();
      for (const key in filters) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value) => {
            if (value) queryParams.append(key, value); // Ensure value is defined
          });
        } else if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      }

      const urlWithParams = `${apiUrls.searching}?${queryParams.toString()}`;
      const response = await UseApi(
        urlWithParams,
        apiMethods.GET,
        null,
        headers
      );
      setLoading("success");
      setListing(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching business listings:", err);
      setLoading("error");
      return err;
    }
  };

  useEffect(() => {
    // Set filters based on URL parameters
    setFilters((prevFilters) => ({
      ...prevFilters,
      category_id: categoryIdVal,
      location: urlLocation,
    }));

    // Fetch data based on URL parameters
    fetchPublicBusinessListing({
      category_id: categoryIdVal,
      location: urlLocation,
    });
  }, [categoryIdVal, urlLocation]);

  const handleNavigate = () => {};

  return (
    <>
      <Header parms={parms} />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Listings-Grid</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Main Content Section */}
      <div className="list-content">
        <div className="container">
          <div className="header-bar">
            <HeaderFilterBar
              filters={filters}
              setFilters={setFilters}
              fetchPublicBusinessListing={fetchPublicBusinessListing}
            />
          </div>
          {(loading === "success" || loading === "error") &&
          listing?.length <= 0 ? (
            <PageNotFound />
          ) : (
            <div className="row">
              <div className="container">
                <div className="bookmarks-content grid-view featured-slider">
                  <div className="row align-items-center">
                    {listing?.map((item,key) => (
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 aos aos-init aos-animate" key={key}>
                        <div className="card flex-fill">
                          <div className="blog-widget">
                            <div className="blog-img">
                              <Link
                                to={`/listing-details/${item?.uuid}`}
                                state={{ id: item?.id }}
                              >
                                <img
                                  src={item?.logo || listgrid_1}
                                  className="img-fluid"
                                  alt="blog-img"
                                  style={{
                                    border: "1px solid black",
                                    width: "600px",
                                    height: "310px",
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="bloglist-content">
                              <div className="card-body">
                                <div className="blogfeaturelink">
                                  <div className="grid-author">
                                    <img
                                      src={
                                        item?.featured_image || ProfileAvatar02
                                      }
                                      alt="author"
                                    />
                                  </div>
                                  <div className="blog-features">
                                    <Link to="#">
                                      <span>
                                        {" "}
                                        <b>Categories: </b>
                                        {item?.categories?.length
                                                ? item?.categories.slice(0, 3) // Limit to 3 categories
                                                    .map((category, index) => getCategoryNameById(category?.id)) // Map over the categories
                                                    .join(', ') // Join them with commas
                                                : "-"}
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <h6>
                                  <Link
                                    to={`/listing-details/${item?.uuid} `}
                                    state={{ id: item?.id }}
                                  >
                                    {item?.listing_title || "-"}
                                  </Link>
                                </h6>
                                <div className="blog-location-details">
                                  <div className="location-info">
                                    <i className="feather-map-pin" />{" "}
                                    {item?.address || "-"}
                                  </div>
                                  <div className="location-info">
                                    <i className="feather-phone-call" />
                                    {item?.phone || "-"}
                                  </div>
                                  <div className="location-info">
                                    <i className="feather-email" />{" "}
                                    {item?.email || "-"}
                                  </div>
                                </div>
                                <div className="amount-details">
                                  <div className="amount d-none">
                                    <span className="validrate">
                                      ${item?.price_from || 0} -{" "}
                                    </span>
                                    <span className="validrate">
                                      ${item?.price_to || 0}
                                    </span>
                                  </div>
                                  <div className="ratings d-none">
                                    <span>
                                      {CapitalizeFirstLetter(item?.status)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default GridSidebar;
