import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../../utils/commonApis";

export const Banner = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [countryList, setCountryList] = useState([]); // List of countries or locations
  const [location, setLocation] = useState(""); // User input for location
  const [locationSuggestions, setLocationSuggestions] = useState([]); // Suggestions based on user input
  const navigate = useNavigate();

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/listing-grid-sidebar?category=${selectedCategory}&location=${location}`
    );
  };

  // Handle location input change and update suggestions
  const handleLocationChange = (e) => {
    const query = e.target.value;
    setLocation(query);

    if (query?.length > 1) {
      // Filter the countryList based on the input query (case-insensitive match)
      const filteredSuggestions = countryList.filter((country) =>
        country?.name?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setLocationSuggestions(filteredSuggestions);
    } else {
      // Clear suggestions if input length is less than 3 characters
      setLocationSuggestions([]);
    }
  };

  // Handle location selection from suggestions
  const handleLocationSelect = (suggestion) => {
    setLocation(suggestion?.name); // Set the selected location to input
    setLocationSuggestions([]); // Clear the suggestions list
  };

  // Fetch countries on component mount
  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        // Fetch countries if not already in sessionStorage
        await getCountries(setCountryList);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="banner-section banner-five">
      <div className="container">
        <div className="home-banner">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <div className="section-search aos" data-aos="fade-up">
                <h1>Discover Quality NDIS Providers Near You</h1>
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
                                right: "10px",
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
                            id="location-input"
                            type="text"
                            className="form-control"
                            placeholder="Your Location (suburb e.g.)"
                            value={location}
                            onChange={handleLocationChange}
                            autoComplete="off"
                          />
                          <i className="feather-map-pin"></i>
                        </div>
                        {locationSuggestions.length > 0 && (
                          <ul className="location-suggestions">
                            {locationSuggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handleLocationSelect(suggestion)}
                                className="suggestion-item"
                              >
                                {suggestion.name}
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
