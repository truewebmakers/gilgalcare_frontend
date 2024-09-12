import React, { useEffect, useState, useCallback } from "react";
import StickyBox from "react-sticky-box";
import { details_icon } from "../../imagepath";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { fetchAllCategories } from "../../../utils/commonApis";
import axios from "axios";

const Sidebar = ({ filters, setFilters, fetchPublicBusinessListing }) => {
  const [categories, setCategories] = useState([]);
  const [countrySuggestions, setCountrySuggestions] = useState([]);

  useEffect(() => {
    fetchAllCategories(setCategories);
  }, []);

  // Debounce function to delay API calls
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Use useCallback for memoizing debounced function
  const debouncedGetCountrySuggestions = useCallback(
    debounce((query) => getCountrySuggestions(query), 300),
    []
  );

  // Fetch country suggestions when location input changes
  useEffect(() => {
    if (filters.location.length > 1) {
      debouncedGetCountrySuggestions(filters.location);
    } else {
      setCountrySuggestions([]);
    }
  }, [filters.location, debouncedGetCountrySuggestions]);

  const getCountrySuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${query}`
      );
      const countries = response?.data?.map((country) => country.name.common);
      setCountrySuggestions(countries);
    } catch (error) {
      console.error("Error fetching country suggestions:", error);
      setCountrySuggestions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCountrySelection = (country) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: country,
    }));
    setCountrySuggestions([]); // Hide suggestions after selection
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
                  autoComplete="off"
                />
              </div>
              <div
                className="filter-content form-group"
                style={{ position: "relative" }}
              >
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
                    right: "10px" /* Adjusted for better alignment */,
                    top: "50%",
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
              <div
                className="filter-content looking-input form-group input-placeholder"
                style={{ position: "relative" }}
              >
                <div className="group-img">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search For Country"
                    name="location"
                    value={filters?.location}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <i className="feather-map-pin" />
                </div>
                {countrySuggestions.length > 0 && (
                  <ul
                    className="suggestions-list"
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: "100%",
                      zIndex: 1000,
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {countrySuggestions.map((country, index) => (
                      <li
                        key={index}
                        onClick={() => handleCountrySelection(country)}
                        style={{ padding: "10px", cursor: "pointer" }}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
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
