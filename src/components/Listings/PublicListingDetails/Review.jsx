import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls, dateFormat } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import { AddReview } from "./addReview";
import moment from "moment";

export const Review = () => {
  const parms = useLocation()?.pathname;
  const id = parms?.split("/")[2];
  const [reviewList, setReviewList] = useState([]);

  const getListingReview = async () => {
    try {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
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
        <h4 id="write-review">Write a Review</h4>
      </div>
      <div className="card-body">
        <div className="review-list">
          <ul className="">
            {reviewList?.map((item, index) => (
              <li className="review-box" key={index}>
                <div className="review-profile"></div>
                <div className="review-details">
                  <h6>
                    {item?.title ? CapitalizeFirstLetter(item?.title) : null}
                  </h6>
                  <div className="rating">
                    <div className="rating-star">
                      Rating: {item?.rating ? item?.rating : null}
                      &nbsp;&nbsp;
                      <i className="fas fa-star filled" />
                    </div>
                    <div>
                      <i className="fa-sharp fa-solid fa-calendar-days" />{" "}
                      {item?.updated_at
                        ? moment(item?.updated_at).format(dateFormat)
                        : null}
                    </div>
                    <div>
                      by:{" "}
                      {item?.name ? CapitalizeFirstLetter(item?.name) : null}
                    </div>
                  </div>
                  <p>
                    {item?.review ? CapitalizeFirstLetter(item?.review) : null}
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
