import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import { fetchAllCategories } from "../../../utils/commonApis";

const HeaderFilterBar = ({
  filters,
  setFilters,
  fetchPublicBusinessListing,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories(setCategories);
  }, []);

  useEffect(() => {
    const input = document.getElementById("location-input");
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      input,
      {
        fields: ["formatted_address"],
        // types: ["address"],
        types: ["(regions)"],
        componentRestrictions: { country: "AU" },
      }
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();

      if (place && place?.formatted_address) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          location: place.formatted_address,
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "category_id" ? [value] : value, // Ensure category_id is an array
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

    // Reset the value of the select dropdown
    const categorySelect = document.querySelector('select[name="category_id"]');
    if (categorySelect) categorySelect.value = "";
  };

  const handleSearch = () => {
    fetchPublicBusinessListing(filters);
  };

  return (
    <div className="header-filter-bar">
      <form className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="filter-content form-group">
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
          className="filter-content form-group input-placeholder"
          style={{ position: "relative" }}
        >
          <input
            id="location-input"
            type="text"
            className="form-control"
            placeholder="Your Location "
            name="location"
            value={filters?.location}
            onChange={handleChange}
            autoComplete="off"
          />
          {/* <i className="feather-map-pin" /> */}
        </div>

        <div className="filter-content form-group">
          <select
            className="form-control"
            name="category_id"
            onChange={(e) => handleChange({ ...e, checked: true })}
          >
            <option value="">Choose Category</option>
            {categories.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-content d-flex align-items-center">
          <button
            className="btn btn-primary mx-2"
            type="button"
            onClick={handleSearch}
          >
            <i className="fa fa-search" />
            &nbsp;&nbsp; Search
          </button>
          <button
            className="btn btn-reset mb-0"
            type="button"
            onClick={handleReset}
          >
            <i className="fas fa-arrow-rotate-right" />
            &nbsp;&nbsp; Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeaderFilterBar;
