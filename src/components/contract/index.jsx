import React, { useState } from "react";
import { Link } from "react-router-dom";
import { contactform_img } from "../imagepath";

import Header from "../home/header/Header";
import Footer from "../home/footer/Footer";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { customToast } from "../common/Toast";
import Loader from "../common/Loader";

const Contract = () => {
  // State to manage form data, including phone number
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    query: "",
    phone: "", // New phone field
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Ensure only numbers are entered in the phone field
  const handlePhoneChange = (e) => {
    // Allow only numbers and update the state
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setFormData({
      ...formData,
      phone: value,
    });
  };

  // Handle contact form submission
  const handleContactUs = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setIsLoading(true);
    // Destructure form data
    const { first_name, last_name, email, subject, query, phone } = formData;

    // Validation for required fields
    if (!first_name || !last_name || !email || !subject || !query || !phone) {
      customToast.error("Please fill all the required fields.");
      setIsLoading(false);
      return;
    }

    // Validate phone number (should be 10 digits)
    if (phone.length !== 10) {
      customToast.error("Phone number should be 10 digits.");
      setIsLoading(false);
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
          phone: "", // Reset phone field
        });
      } else {
        customToast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      customToast.error(
        err?.message || "An error occurred while submitting the form."
      );
    } finally {
      setIsLoading(false);
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
            {/* <div className="col-lg-5 col-md-5">
              <div className="contactform-img">
                <img
                  src="/img/contactform-img.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div> */}
            <div className="col-lg-12col-md-7">
              <div className="contactus-form">
                <form onSubmit={handleContactUs}>
                  <div className="row">
                    <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name*"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                    </div>
                    <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Name*"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                      </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number*"
                      value={formData.phone}
                      onChange={handlePhoneChange} // Handle phone input change
                      maxLength={10} // Limit to 10 digits
                      required
                    />
                    </div>
                    </div>
                  
                  <div className="form-group mt-3">
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
                      placeholder="How Can We Help You?*"
                      name="How Can We Help You?"
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
                      {isLoading ? <Loader /> : "Submit"}
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
