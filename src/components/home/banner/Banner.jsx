import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../../utils/commonApis";

export const Banner = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/listing-grid-sidebar?category=${selectedCategory}&location=${location}`
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
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
                            onChange={(e) => setLocation(e.target.value)}
                          />
                          <i className="feather-map-pin"></i>
                        </div>
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
