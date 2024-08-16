import React, { useEffect, useState } from "react";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { useSelector } from "react-redux";

export const BasicInfoForm = ({ basicInfo1, setBasicInfo1, error }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getAllCategoriesList,
        apiMethods.GET,
        null,
        headers
      );
      setCategoriesList(response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    if (name == "categoryId") {
      const categoryName = categoriesList?.find(
        (cat) => cat?.id == value
      )?.name;
      setBasicInfo1((prevState) => ({
        ...prevState,
        categoryId: value,
        categoryName: categoryName,
      }));
    }
    setBasicInfo1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          onChange={handleInfoChange}
          data-set="basicInfo1"
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
          onChange={handleInfoChange}
          data-set="basicInfo1"
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
                      onChange={handleInfoChange}
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
          onChange={handleInfoChange}
          data-set="basicInfo1"
          autoComplete="off"
        />
        {error?.tagline && <p style={{ color: "red" }}>{error?.tagline}</p>}
      </div>
    </div>
  );
};
