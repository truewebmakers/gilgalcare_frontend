import React from "react";
import { Link } from "react-router-dom";
import { FeaturePng } from "../../imagepath";

export const Space = () => {
    return (
        <section className="adventure-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-0 aos" data-aos="fade-up">
                        <div className="featuring-img">
                            <img src={FeaturePng} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 aos" data-aos="fade-up">
                        <div className="adventure-info">
                            <div
                                className="section-heading heading-five aos"
                                data-aos="fade-up"
                            >
                                <h6>Why Choose Us</h6>
                                <h2>
                                    Its Time For New Adventures Escapes thrills & experiences
                                </h2>
                            </div>
                            <div className="advent-info">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit
                                    voluptatem accusantium doloremque architecto beatae vitae
                                    dicta sunt explicabo.
                                </p>
                            </div>
                            <Link to="/service-details" className="btn btn-grey">
                                Get Started <i className="feather-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}