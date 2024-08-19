import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import { details_icon } from "../../imagepath";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { fetchAllCategories } from "../../../utils/commonApis";

const Sidebar = ({ filters, setFilters, fetchPublicBusinessListing }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      listing_title: "",
      category_id: "",
      location: "",
      price_from: "",
      price_to: "",
    };
    setFilters(resetFilters);
    fetchPublicBusinessListing(resetFilters);
  };

  const handleSearch = () => {
    fetchPublicBusinessListing(filters);
  };

  return (
    <div className="col-lg-4 theiaStickySidebar">
      <StickyBox>
        <div className="listings-sidebar">
          <div className="card">
            <h4>
              <img src={details_icon} alt="details-icon" /> Filter
            </h4>
            <form>
              <div className="filter-content looking-input form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Listing Title"
                  name="listing_title"
                  value={filters?.listing_title}
                  onChange={handleChange}
                />
              </div>
              <div className="filter-content form-group">
                <select
                  className="form-control select category-select"
                  name="category_id"
                  value={filters?.category_id}
                  onChange={handleChange}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: "10%",
                    top: "32%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#000",
                    zIndex: "10",
                  }}
                >
                  <i
                    className="dropdown-arrow fa fa-sort-desc"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div className="filter-content looking-input form-group input-placeholder">
                <div className="group-img">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type Location"
                    name="location"
                    value={filters?.location}
                    onChange={handleChange}
                  />
                  <i className="feather-map-pin" />
                </div>
              </div>
              <div className="filter-content amenities mb-0">
                <h4> Price Range</h4>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Min"
                    name="price_from"
                    value={filters?.price_from}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control me-0"
                    placeholder="Max"
                    name="price_to"
                    value={filters?.price_to}
                    onChange={handleChange}
                  />
                </div>
                <div className="search-btn">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSearch}
                  >
                    {" "}
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </button>
                  <button
                    className="btn btn-reset mb-0"
                    type="button"
                    onClick={handleReset}
                  >
                    {" "}
                    <i className="fas fa-light fa-arrow-rotate-right" /> Reset
                    Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </StickyBox>
    </div>
  );
};

export default Sidebar;
