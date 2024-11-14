import React, { useState } from "react";
import { Link } from "react-router-dom";
import { contactform_img } from "../imagepath";

import Header from "../home/header/Header";
import Footer from "../home/footer/Footer";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { customToast } from "../common/Toast";

const Contract = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    query: "",
  });

  // Handle input changes to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle contact form submission
  const handleContactUs = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Check if all required fields are filled
    const { first_name, last_name, email, subject, query } = formData;
    if (!first_name || !last_name || !email || !subject || !query) {
      customToast.error("Please fill all the required fields.");
      return;
    }

    try {
      // Send the form data to the API
      const response = await UseApi(
        apiUrls.contact_us,
        apiMethods.POST,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        customToast.success("Your message has been sent successfully!");
        // Optionally reset the form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          subject: "",
          query: "",
        });
      } else {
        customToast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      customToast.error(
        err?.message || "An error occurred while submitting the form."
      );
    }
  };

  return (
    <>
      <Header />
      {/* Inner Banner */}
      <div className="contactbanner innerbanner">
        <div className="inner-breadcrumb">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-md-12 col-12">
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
      {/* /Inner Banner */}

      {/* Contact Form */}
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
                <form onSubmit={handleContactUs}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name*"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name*"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject*"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      rows={4}
                      className="form-control"
                      placeholder="Query*"
                      name="query"
                      value={formData.query}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="submit-section text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
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
      {/* /Contact Form */}

      <Footer />
    </>
  );
};

export default Contract;
