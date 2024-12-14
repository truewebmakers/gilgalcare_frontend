import React from "react";
import { Ratings } from "./Ratingsx";
import { Review } from "./Review";
import { useLocation } from "react-router-dom";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";

export const ReviewListingComp = () => {
  const parms = useLocation();
  const id = parms.state?.id;

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
        return response?.data?.feedbacks;
      }
    } catch (err) {
      customToast.error(err?.message);
      return;
    }
  };
  return (
    <>
      <Ratings getListingReview={getListingReview} />
      {/* Rating Section */}
      {/*Review  Section*/}
      <Review getListingReview={getListingReview} />
    </>
  );
};
