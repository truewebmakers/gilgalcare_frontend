import React, { useState } from "react";
import { customToast } from "../../common/Toast";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import Loader from "../../common/Loader";
import { useLocation } from "react-router-dom";

export const ContactBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const parms = useLocation();
  const id = parms?.pathname?.split("/")?.[2];

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
    setIsLoading(true);
    // Destructure form data
    const { name, email, query } = formData;

    // Validation for required fields
    if (!name || !email || !query) {
      customToast.error("Please fill all the required fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Send the form data to the API
      const response = await UseApi(
        apiUrls.contact_us + `?listingid=${id}`,
        apiMethods.POST,
        {
          first_name: name,
          email: email,
          query: query,
        }
      );

      if (response?.data?.message === "Email Sent") {
        customToast.success("Your message has been sent successfully!");
        // Optionally reset the form
        setFormData({
          name: "",
          email: "",
          query: "",
        });
      } else {
        customToast.error("Something went wrong." + response?.message);
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
    <form className="contactbusinessform" onSubmit={handleContactUs}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <textarea
          rows={6}
          className="form-control"
          placeholder="Message"
          name="query"
          value={formData?.query}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="submit-section">
        <button className="btn btn-primary submit-btn" type="submit">
          {isLoading ? <Loader /> : "Send Message"}
        </button>
      </div>
    </form>
  );
};
