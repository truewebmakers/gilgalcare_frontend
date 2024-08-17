import React from "react";

export const BasicInfoForm = ({
  basicInfo1,
  error,
  handleChange,
  categoriesList,
}) => {
  return (
    <div className="card-body">
      <div className="form-group">
        <label className="col-form-label">
          Listing Title <span>*</span>
        </label>
        <input
          type="text"
          className="form-control pass-input"
          placeholder="Title"
          name="listingTitle"
          value={basicInfo1?.listingTitle}
          onChange={(e) => handleChange(e)}
          data-handler="basicInfo1"
          autoComplete="off"
        />
        {error?.listingTitle && (
          <p style={{ color: "red" }}>{error?.listingTitle}</p>
        )}
      </div>
      <div className="form-group">
        <label className="col-form-label">
          Listing Description <span>*</span>
        </label>
        <textarea
          rows={6}
          className="form-control listingdescription"
          placeholder="Message"
          name="listingDiscription"
          value={basicInfo1?.listingDiscription}
          onChange={handleChange}
          data-handler="basicInfo1"
          autoComplete="off"
        />
        {error?.listingDiscription && (
          <p style={{ color: "red" }}>{error?.listingDiscription}</p>
        )}
      </div>
      <div className="form-group">
        <label className="col-form-label label-heading">Category </label>
        <div className="row category-listing">
          <div className="col-lg-4">
            <ul>
              {categoriesList?.map((item) => (
                <li key={item?.id}>
                  <label className="custom_check">
                    <input
                      type="radio"
                      name="categoryId"
                      value={item?.id}
                      checked={basicInfo1?.categoryId == item?.id}
                      onChange={handleChange}
                      data-handler="basicInfo1"
                      autoComplete="off"
                    />
                    <span className="checkmark" /> {item?.name}
                  </label>
                </li>
              ))}
            </ul>
            {error?.categoryId && (
              <p style={{ color: "red" }}>{error?.categoryId}</p>
            )}
          </div>
        </div>
      </div>
      <div className="form-group formlast-input">
        <label className="col-form-label label-heading">Tagline</label>
        <textarea
          rows={2}
          className="form-control tagline"
          placeholder=""
          name="tagline"
          value={basicInfo1?.tagline}
          onChange={handleChange}
          data-handler="basicInfo1"
          autoComplete="off"
        />
        {error?.tagline && <p style={{ color: "red" }}>{error?.tagline}</p>}
      </div>
    </div>
  );
};
