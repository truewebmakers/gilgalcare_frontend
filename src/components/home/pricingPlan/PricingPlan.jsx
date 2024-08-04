import React from "react";
import { Link } from "react-router-dom";

export const PricingPlan = () => {
    return (
        <section className="pricing-plan">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div
                            className="section-heading heading-five price-head-five aos"
                            data-aos="fade-up"
                        >
                            <h2>Our Pricing Plan</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 d-flex col-md-6">
                        <div className="price-card price-three price-five flex-fill">
                            <div className="price-head">
                                <div className="price-level">
                                    <h6>Intro</h6>
                                </div>
                            </div>
                            <div className="price-body">
                                <ul>
                                    <li className="active">
                                        Upload Video up to 720p Resolution
                                    </li>
                                    <li className="inactive">Attachment & Post Scheduling</li>
                                    <li className="inactive">Set your rates</li>
                                    <li className="inactive">Exclusive Deals</li>
                                    <li className="inactive">Advanced Statistics</li>
                                </ul>
                                <h4>
                                    $123 <span>/ month</span>
                                </h4>
                                <div>
                                    <Link to="/login" className="btn viewdetails-btn">
                                        Choose Plan <i className="feather-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 d-flex col-md-6">
                        <div className="price-card price-three price-five flex-fill">
                            <div className="price-head">
                                <div className="price-level">
                                    <h6>Basic</h6>
                                </div>
                            </div>
                            <div className="price-body">
                                <ul>
                                    <li className="active">
                                        Upload Video up to 720p Resolution
                                    </li>
                                    <li className="active">Attachment & Post Scheduling</li>
                                    <li className="active">Set your rates</li>
                                    <li className="inactive">Exclusive Deals</li>
                                    <li className="inactive">Advanced Statistics</li>
                                </ul>
                                <h4>
                                    $123 <span>/ month</span>
                                </h4>
                                <div>
                                    <Link to="/login" className="btn viewdetails-btn">
                                        Choose Plan <i className="feather-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 d-flex col-md-6">
                        <div className="price-card price-three price-five flex-fill active">
                            <div className="price-head">
                                <div className="price-level">
                                    <h6>Popular</h6>
                                    <span>Save $40</span>
                                </div>
                            </div>
                            <div className="price-body">
                                <ul>
                                    <li className="active">
                                        Upload Video up to 720p Resolution
                                    </li>
                                    <li className="active">Attachment & Post Scheduling</li>
                                    <li className="active">Set your rates</li>
                                    <li className="active">Exclusive Deals</li>
                                    <li className="inactive">Advanced Statistics</li>
                                </ul>
                                <h4>
                                    $123 <span>/ month</span>
                                </h4>
                                <div>
                                    <Link to="/login" className="btn viewdetails-btn">
                                        Choose Plan <i className="feather-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 d-flex col-md-6">
                        <div className="price-card price-three price-five flex-fill">
                            <div className="price-head">
                                <div className="price-level">
                                    <h6>Enterprise</h6>
                                </div>
                            </div>
                            <div className="price-body">
                                <ul>
                                    <li className="active">
                                        Upload Video up to 720p Resolution
                                    </li>
                                    <li className="active">Attachment & Post Scheduling</li>
                                    <li className="active">Set your rates</li>
                                    <li className="active">Exclusive Deals</li>
                                    <li className="active">Advanced Statistics</li>
                                </ul>
                                <h4>
                                    $123 <span>/ month</span>
                                </h4>
                                <div>
                                    <Link to="/login" className="btn viewdetails-btn">
                                        Choose Plan <i className="feather-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}