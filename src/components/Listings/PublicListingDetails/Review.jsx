import React, { useEffect, useState } from "react";
import { dateFormat } from "../../../constants/constant";
import { CapitalizeFirstLetter } from "../../../utils/commonFunctions";
import { AddReview } from "./addReview";
import moment from "moment";
import { useSelector } from "react-redux";

export const Review = ({ getListingReview = () => {} }) => {
  const [reviewList, setReviewList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListingReview();
      setReviewList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="card review-sec  mb-0">
      {reviewList?.length ? (
        <div className="card-header  align-items-center">
          <i className="fa-regular fa-comment-dots" />
          <h4 id="write-review">Review</h4>
        </div>
      ) : null}
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
            {/* add review component */}
            <AddReview getListingReview={getListingReview} user={user} />
          </ul>
        </div>
      </div>
    </div>
  );
};
