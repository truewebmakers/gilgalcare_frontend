import React from "react";

export const SocialMediaForm = ({ socialMedia, error, handleChange }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Social Information </h4>
      </div>
      <div className="card-body">
        <div className="row social-info">
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label className="col-form-label">Facebook</label>
              <div className="pass-group group-img">
                <span className="lock-icon">
                  <i className="fab fa-facebook-f" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Facebook Link"
                  name="facebook"
                  value={socialMedia?.facebook}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="socialMediaInfo"
                />
                {error?.facebook && (
                  <p style={{ color: "red" }}>{error?.facebook}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label className="col-form-label">Twitter</label>
              <div className="pass-group group-img">
                <span className="lock-icon">
                  <i className="fab fa-twitter" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Twitter Link"
                  name="twitter"
                  value={socialMedia?.twitter}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="socialMediaInfo"
                />
                {error?.twitter && (
                  <p style={{ color: "red" }}>{error?.twitter}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row social-info">
          <div className="col-lg-6 col-md-6">
            <div className="form-group formlast-input lat-input">
              <label className="col-form-label">Google+</label>
              <div className="pass-group group-img">
                <span className="lock-icon">
                  <i className="fa-brands fa-google-plus-g" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Google+ Link"
                  name="googlePlus"
                  value={socialMedia?.googlePlus}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="socialMediaInfo"
                />
                {error?.googlePlus && (
                  <p style={{ color: "red" }}>{error?.googlePlus}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group formlast-input">
              <label className="col-form-label">Instagram</label>
              <div className="pass-group group-img">
                <span className="lock-icon">
                  <i className="fab fa-instagram" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Instagram Link"
                  name="instagram"
                  value={socialMedia?.instagram}
                  onChange={handleChange}
                  autoComplete="off"
                  data-handler="socialMediaInfo"
                />
                {error?.instagram && (
                  <p style={{ color: "red" }}>{error?.instagram}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
