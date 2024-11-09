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
              <img
                src={FeaturePng}
                className="img-fluid"
                alt=""
                style={{ borderRadius: "168px" }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 aos" data-aos="fade-up">
            <div className="adventure-info">
              <div
                className="section-heading heading-five aos"
                data-aos="fade-up"
              >
                <h6>Why Choose Us</h6>
                <h2>Trusted by Participants Nationwide</h2>
              </div>
              <div className="advent-info">
                <p>
                  Our commitment to quality and reliability means every provider
                  listed has been thoroughly vetted to ensure they meet our high
                  standards. From support coordinators to personal caregivers,
                  we feature a diverse range of services to cover all your
                  needs.
                </p>
                <ul>
                  <li style={{ color: "white", fontWeight: "bolder" }}>
                    Vetted Providers
                  </li>
                  <li style={{ color: "white", fontWeight: "bolder" }}>
                    Wide Range of Services
                  </li>
                  <li style={{ color: "white", fontWeight: "bolder" }}>
                    Community Focused
                  </li>
                </ul>
              </div>
              <Link to="/listing-grid-sidebar" className="btn btn-grey">
                Get Started <i className="feather-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
