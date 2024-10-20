import React, { useEffect, useState, useCallback } from "react";
import StickyBox from "react-sticky-box";
import { details_icon } from "../../imagepath";
import "rc-slider/assets/index.css";
import { fetchAllCategories } from "../../../utils/commonApis";

const Sidebar = ({ filters, setFilters, fetchPublicBusinessListing }) => {
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
        types: ["address"],
      }
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place && place.formatted_address) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          location: place.formatted_address,
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "category_ids") {
      // Handle checkbox changes
      setFilters((prevFilters) => {
        const newCategoryIds = checked
          ? [...(prevFilters.category_ids || []), value] // Add value if checked
          : prevFilters.category_ids.filter((id) => id !== value); // Remove value if unchecked

        return {
          ...prevFilters,
          category_ids: newCategoryIds,
        };
      });
    } else {
      // For other inputs
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
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
                className="filter-content looking-input form-group input-placeholder"
                style={{ position: "relative" }}
              >
                <div className="group-img">
                  <input
                    id="location-input"
                    type="text"
                    className="form-control"
                    placeholder="Your Location (suburb e.g.)"
                    name="location"
                    value={filters?.location}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <i className="feather-map-pin" />
                </div>
              </div>

              <div className="filter-content form-group">
                <label style={{ fontWeight: "bold", color: "black" }}>
                  Choose Categories:
                </label>
                {categories?.map((item) => (
                  <div key={item?.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`category-${item?.id}`}
                      name="category_ids"
                      value={item?.id}
                      checked={filters?.category_ids?.includes(
                        item?.id?.toString()
                      )}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`category-${item?.id}`}
                    >
                      {item?.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="filter-content amenities mb-0">
                <div className="search-btn">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSearch}
                  >
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </button>
                  <button
                    className="btn btn-reset mb-0"
                    type="button"
                    onClick={handleReset}
                  >
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
