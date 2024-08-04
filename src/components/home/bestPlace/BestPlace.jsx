import React from "react";

export const BestPlace = () => {
    return (
        <section className="gallery-section-five">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div
                            className="section-heading heading-five aos"
                            data-aos="fade-up"
                        >
                            <h2>Best Place on Earth</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 aos" data-aos="fade-up">
                        <div className="gal-wrap">
                            <img src={Gallery1} className="img-fluid" alt="img" />
                            <div className="city-overlay city-five-overlay">
                                <div className="city-name">
                                    <h5>Oceania / Africa / US </h5>
                                    <p>The collection of the Department of Africa.</p>
                                </div>
                                <div className="rating d-flex">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 aos" data-aos="fade-up">
                        <div className="gal-wrap">
                            <img src={Gallery2} className="img-fluid" alt="img" />
                            <div className="city-overlay city-five-overlay">
                                <div className="city-name">
                                    <h5>Oceania</h5>
                                </div>
                                <div className="rating d-flex">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="gal-wrap">
                            <img src={Gallery3} className="img-fluid" alt="img" />
                            <div className="city-overlay city-five-overlay">
                                <div className="city-name">
                                    <h5>Africa </h5>
                                </div>
                                <div className="rating d-flex">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 aos" data-aos="fade-up">
                        <div className="gal-wrap">
                            <img src={Gallery4} className="img-fluid" alt="img" />
                            <div className="city-overlay city-five-overlay">
                                <div className="city-name">
                                    <h5>Oceania </h5>
                                </div>
                                <div className="rating d-flex">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="gal-wrap">
                            <img src={Gallery5} className="img-fluid" alt="img" />
                            <div className="city-overlay city-five-overlay">
                                <div className="city-name">
                                    <h5>Africa / US </h5>
                                </div>
                                <div className="rating d-flex">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}