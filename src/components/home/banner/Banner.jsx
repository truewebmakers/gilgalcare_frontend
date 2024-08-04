import React from "react";
import Select5 from "../select5/Select5";
import { cateogoryOptions } from "../../../constants/constant";

export const Banner = () => {
    return (
        <section className="banner-section banner-five">
            <div className="container">
                <div className="home-banner">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto">
                            <div className="section-search aos" data-aos="fade-up">
                                <h1>Discover your amazing city</h1>
                                <p>20 cities, 10 categories, 5662 listings.</p>
                                <div className="search-box">
                                    <form
                                        action="/listing-grid-sidebar"
                                        className="form-block d-flex"
                                    >
                                        <div className="search-input line">
                                            <div className="form-group mb-0">
                                                <div className="discover">
                                                    <Select5 options={cateogoryOptions} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="search-input">
                                            <div className="form-group mb-0">
                                                <div className="group-img">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Choose Location"
                                                    />
                                                    <i className="feather-map-pin"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search-btn">
                                            <button className="btn btn-primary" type="submit">
                                                <i
                                                    className="fa fa-search m-0"
                                                    aria-hidden="true"
                                                ></i>
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
    )
}