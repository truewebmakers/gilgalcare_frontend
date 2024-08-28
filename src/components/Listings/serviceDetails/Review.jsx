import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Roomsprofile from "./myComponent4";
import { avatar_11, ProfileAvatar01, ProfileAvatar02 } from "../../imagepath";
import { useSelector } from "react-redux";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import { AddReview } from "./addReview";

export const Review = () => {
  const parms = useLocation()?.pathname;
  const id = parms?.split("/")[2];
  const { user } = useSelector((state) => state.auth);
  const [reviewList, setReviewList] = useState([]);

  const getListingReview = async () => {
    try {
      if (user?.token) {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.getListingSpecificReviews + id,
          apiMethods.GET,
          null,
          headers
        );
        if (response?.status == 200 || response?.status == 201) {
          setReviewList(response?.data?.feedbacks);
          return;
        }
      }
    } catch (err) {
      customToast.error(err?.message);
      return;
    }
  };

  useEffect(() => {
    getListingReview();
  }, []);
  return (
    <div className="card review-sec  mb-0">
      <div className="card-header  align-items-center">
        <i className="fa-regular fa-comment-dots" />
        <h4>Write a Review</h4>
      </div>
      <div className="card-body">
        <div className="review-list">
          <ul className="">
            {reviewList?.map((item, index) => (
              <li className="review-box" key={index}>
                <div className="review-profile"></div>
                <div className="review-details">
                  <h6>
                    {item?.title ? CapitalizeFirstLetter(item?.title) : "-"}
                  </h6>
                  <div className="rating">
                    <div className="rating-star">
                      Rating: {item?.rating ? item?.rating : "-"}
                      &nbsp;&nbsp;
                      <i className="fas fa-star filled" />
                    </div>
                    <div>
                      <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                      {item?.updated_at ? item?.updated_at : "-"}
                    </div>
                    <div>
                      by: {item?.name ? CapitalizeFirstLetter(item?.name) : "-"}
                    </div>
                  </div>
                  <p>
                    {item?.review ? CapitalizeFirstLetter(item?.review) : "-"}
                  </p>
                </div>
              </li>
            ))}
            <AddReview getListingReview={getListingReview} />
          </ul>
        </div>
      </div>
    </div>
  );
};
