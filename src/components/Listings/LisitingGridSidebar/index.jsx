import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { ProfileAvatar02, listgrid_1 } from "../../imagepath";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { getCategoryNameById } from "../../../utils/commonApis";

const GridSidebar = () => {
  const parms = useLocation().pathname;
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState({
    listing_title: "",
    category_id: "",
    location: "",
    price_from: "",
    price_to: "",
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category_id = query.get("category") || "";
  const urlLocation = query.get("location") || "";

  const fetchPublicBusinessListing = async (filters) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const queryParams = new URLSearchParams();
      for (const key in filters) {
        if (filters[key]) {
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
      setListing(response?.data?.data || []);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    // Set filters based on URL parameters
    setFilters((prevFilters) => ({
      ...prevFilters,
      category_id,
      location: urlLocation,
    }));

    // Fetch data based on URL parameters
    fetchPublicBusinessListing({ category_id, location: urlLocation });
  }, [category_id, urlLocation]);

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
          <div className="row">
            <Sidebar
              setFilters={setFilters}
              filters={filters}
              fetchPublicBusinessListing={fetchPublicBusinessListing}
            />
            <div className="col-lg-8">
              <div className="grid-view listgrid-sidebar">
                <div className="row">
                  {listing?.map((item) => (
                    <div className="col-lg-6 col-md-4">
                      <div className="card">
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
                                height={70}
                                width={70}
                                style={{ border: "1px solid black" }}
                              />
                            </Link>
                            <div className="fav-item">
                              <span className="Featured-text">Featured</span>
                              <Link to="#" className="fav-icon">
                                <i className="feather-heart" />
                              </Link>
                            </div>
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
                                      <i className="fa-regular fa-circle-stop" />{" "}
                                      {getCategoryNameById(item?.category_id) ||
                                        "-"}
                                    </span>
                                  </Link>
                                </div>
                                <div className="blog-author text-end">
                                  <span>
                                    {" "}
                                    <i className="feather-eye" />
                                    {item?.listing_title || "-"}
                                  </span>
                                </div>
                              </div>
                              <h6>
                                <Link
                                  to={`/listing-details/${item?.uuid} `}
                                  state={{ id: item?.id }}
                                >
                                  {item?.listing_description || null}
                                </Link>
                              </h6>
                              <div className="blog-location-details">
                                <div className="location-info">
                                  <i className="feather-map-pin" />{" "}
                                  {item?.location || "-"}
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
                                <div className="amount">
                                  <span className="validrate">
                                    ${item?.price_from || 0} -{" "}
                                  </span>
                                  <span className="validrate">
                                    ${item?.price_to || 0}
                                  </span>
                                </div>
                                <div className="ratings">
                                  <span>{item?.status}</span>
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

              {/*Pagination*/}
              {/* <div className="blog-pagination">
                <nav>
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
                              <span className="visually-hidden">(current)</span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              ...
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              14
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
                </nav>
              </div> */}
              {/*Pagination*/}
            </div>
          </div>
        </div>
      </div>
      {/* /Main Content Section */}

      <Footer />
    </>
  );
};
export default GridSidebar;
