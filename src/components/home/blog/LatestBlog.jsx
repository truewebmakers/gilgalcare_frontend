import React from "react";
import { Link } from "react-router-dom";
import { Blog16, Blog17, Blog18, Blog19 } from "../../imagepath";

export const LatestBlogs = () => {
    return (
        <section className="latest-blog-five">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div
                            className="section-heading heading-five aos"
                            data-aos="fade-up"
                        >
                            <h2>Our Latest Blog</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex aos" data-aos="fade-up">
                        <div className="articles-grid w-100">
                            <div className="articles-info">
                                <div className="articles-left">
                                    <Link to="#">
                                        <div className="articles-img">
                                            <img src={Blog16} className="img-fluid" alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="articles-right">
                                    <div className="articles-content">
                                        <ul className="articles-list nav">
                                            <li>
                                                <i className="feather-user"></i> John Doe
                                            </li>
                                            <li>
                                                <i className="feather-calendar"></i> 13 Aug, 2023
                                            </li>
                                        </ul>
                                        <h4>
                                            <Link to="#">
                                                Lorem ipsum dolor amet, adipiscing ut labore{" "}
                                            </Link>
                                        </h4>
                                        <p>
                                            Sed perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium doloremque laudantium
                                        </p>
                                        <Link
                                            to="#"
                                            className="btn articles-read-more"
                                        >
                                            Read More<i className="feather-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex aos" data-aos="fade-up">
                        <div className="articles-grid w-100">
                            <div className="articles-info">
                                <div className="articles-left">
                                    <Link to="#">
                                        <div className="articles-img">
                                            <img src={Blog17} className="img-fluid" alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="articles-right">
                                    <div className="articles-content">
                                        <ul className="articles-list nav">
                                            <li>
                                                <i className="feather-user"></i> Darren Elder
                                            </li>
                                            <li>
                                                <i className="feather-calendar"></i> 10 Sep, 2023
                                            </li>
                                        </ul>
                                        <h4>
                                            <Link to="#">
                                                Lorem ipsum dolor amet, adipiscing ut labore{" "}
                                            </Link>
                                        </h4>
                                        <p>
                                            Sed perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium doloremque laudantium
                                        </p>
                                        <Link
                                            to="#"
                                            className="btn articles-read-more"
                                        >
                                            Read More<i className="feather-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex aos" data-aos="fade-up">
                        <div className="articles-grid w-100">
                            <div className="articles-info">
                                <div className="articles-left">
                                    <Link to="#">
                                        <div className="articles-img">
                                            <img src={Blog18} className="img-fluid" alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="articles-right">
                                    <div className="articles-content">
                                        <ul className="articles-list nav">
                                            <li>
                                                <i className="feather-user"></i> Ruby Perrin
                                            </li>
                                            <li>
                                                <i className="feather-calendar"></i> 30 Oct, 2023
                                            </li>
                                        </ul>
                                        <h4>
                                            <Link to="#">
                                                Lorem ipsum dolor amet, adipiscing ut labore{" "}
                                            </Link>
                                        </h4>
                                        <p>
                                            Sed perspiciatis unde omnis iste natus error sit
                                            voluptatem accusantium doloremque laudantium
                                        </p>
                                        <Link
                                            to="#"
                                            className="btn articles-read-more"
                                        >
                                            Read More<i className="feather-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex aos" data-aos="fade-up">
                        <div className="articles-grid w-100">
                            <div className="articles-info">
                                <div className="articles-left">
                                    <Link to="#">
                                        <div className="articles-img">
                                            <img src={Blog19} className="img-fluid" alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="articles-right">
                                    <div className="articles-content">
                                        <ul className="articles-list nav">
                                            <li>
                                                <i className="feather-user"></i> John Doe
                                            </li>
                                            <li>
                                                <i className="feather-calendar"></i> 22 Sep 2023
                                            </li>
                                        </ul>
                                        <h4>
                                            <Link to="#">
                                                Lorem ipsum dolor consectetur adipiscing{" "}
                                            </Link>
                                        </h4>
                                        <p>
                                            Sed perspiciatis unde omnis iste voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam
                                        </p>
                                        <Link
                                            to="#"
                                            className="btn articles-read-more"
                                        >
                                            Read More<i className="feather-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}