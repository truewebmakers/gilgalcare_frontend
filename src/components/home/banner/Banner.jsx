import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

export const Banner = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Debounce function to delay API calls
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Use useCallback for memoizing debounced function
  const debouncedGetSuggestions = useCallback(
    debounce((query) => getSuggestions(query), 300),
    []
  );

  useEffect(() => {
    if (location.length > 1) {
      debouncedGetSuggestions(location);
    } else {
      setSuggestions([]);
    }
  }, [location, debouncedGetSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/listing-grid-sidebar?category=${selectedCategory}&location=${location}`
    );
  };

  const getSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${query}`
      );
      const countries = response?.data?.map((country) => country.name.common);
      setSuggestions(countries);
    } catch (error) {
      setSuggestions([]);
      return error;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]); // Hide suggestions on selection
  };

  return (
    <section className="banner-section banner-five">
      <div className="container">
        <div className="home-banner">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <div className="section-search aos" data-aos="fade-up">
                <h1>Discover your amazing world</h1>
                <div className="search-box">
                  <form onSubmit={handleSearch} className="form-block d-flex">
                    <div className="search-input line">
                      <div className="form-group mb-0">
                        <div className="discover">
                          <div
                            className="select-container"
                            style={{ position: "relative" }}
                          >
                            <select
                              className="form-control select category-select"
                              name="category"
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                            >
                              <option value="">Choose Category</option>
                              {categories?.map((item) => (
                                <option key={item?.value} value={item?.value}>
                                  {item?.label}
                                </option>
                              ))}
                            </select>
                            <span
                              style={{
                                position: "absolute",
                                right:
                                  "10px" /* Adjust this value for alignment */,
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
                        </div>
                      </div>
                    </div>
                    <div
                      className="search-input"
                      style={{ position: "relative" }}
                    >
                      <div className="form-group mb-0">
                        <div className="group-img">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search For Country"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                          <i className="feather-map-pin"></i>
                        </div>
                        {suggestions.length > 0 && (
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
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                style={{ padding: "10px", cursor: "pointer" }}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="search-btn">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search m-0" aria-hidden="true"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
