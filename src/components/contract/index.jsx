import React from "react";
import { Link } from "react-router-dom";
import { contactform_img, contactleftimg } from "../imagepath";

import Header from "../home/header/Header";
import Footer from "../home/footer/Footer";

const Contract = () => {
  return (
    <>
      <Header />
      {/*Inner Banner*/}
      <div className="contactbanner innerbanner">
        <div className="inner-breadcrumb">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-md-12 col-12 ">
                <h2 className="breadcrumb-title">Contact Us</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Contact us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/Inner Banner*/}

      {/*contact Form*/}
      <section className="contactusform-section">
        <div className="container">
          <div className="contact-info">
            <h2>
              Contact <span>Us</span>
            </h2>
            <p>Contact Gilgal Provider Finder | Get Help and Support Today</p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-5">
              <div className="contactform-img">
                <img src={contactform_img} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="contactus-form">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Business Name*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      rows={4}
                      className="form-control"
                      placeholder="Write a Message*"
                      required
                    />
                  </div>
                  <div className="submit-section text-center">
                    <button
                      className="btn btn-primary submit-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*/contact Form*/}
      <Footer />
    </>
  );
};
export default Contract;
