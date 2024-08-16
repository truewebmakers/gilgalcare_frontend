import React from "react";

export const ContactInfoForm = ({ contactInfo, setContactInfo, error }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4>Contact Information </h4>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="col-form-label">Email </label>
          <input
            type="text"
            className="form-control pass-input"
            placeholder=""
            name="email"
            value={contactInfo?.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {error?.email && <p style={{ color: "red" }}>{error?.email}</p>}
        </div>
        <div className="form-group">
          <label className="col-form-label">Website </label>
          <input
            type="text"
            className="form-control pass-input"
            placeholder=""
            name="website"
            value={contactInfo?.website}
            onChange={handleChange}
            autoComplete="off"
          />
          {error?.website && <p style={{ color: "red" }}>{error?.website}</p>}
        </div>
        <div className="form-group formlast-input">
          <label className="col-form-label">Phone </label>
          <input
            type="text"
            className="form-control pass-input"
            placeholder=""
            name="phone"
            value={contactInfo?.phone}
            onChange={handleChange}
            autoComplete="off"
          />
          {error?.phone && <p style={{ color: "red" }}>{error?.phone}</p>}
        </div>
      </div>
    </div>
  );
};
