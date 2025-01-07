import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { customToast } from "../../common/Toast";
import Loader from "../../common/Loader";

export const AddReview = ({ getListingReview, user }) => {
  const parms = useLocation();
  const id = parms.state?.id;
  const reviewFields = {
    title: "",
    name: "",
    email: user?.userInfo?.email || "",
    review: "",
  };
  const [addReview, setAddReview] = useState(reviewFields);
  const [rating, setRating] = useState(0); // State to track current rating
  const [hover, setHover] = useState(0); // State to track current hover
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addListingReview = async (e) => {
    e.preventDefault();
    try {
      if (user?.token?.length) {
        setIsLoading(true);
        if (user?.token) {
          // set headers
          const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          };
          const body = {
            title: addReview?.title,
            name: addReview?.name,
            email: addReview?.email,
            review: addReview?.review,
            rating: rating,
            business_listing_id: id,
            user_id: user?.userInfo?.id,
          };
          // Call signup API
          const response = await UseApi(
            apiUrls.addReview,
            apiMethods.POST,
            body,
            headers
          );
          if (response?.status == 200 || response?.status == 201) {
            customToast.success(response?.data?.message);
            setAddReview(reviewFields);
            getListingReview();
            return;
          } else {
            customToast.error(response?.data?.message);
          }
        }
      } else {
        customToast.error("Please login to leave review");
      }
    } catch (err) {
      customToast.error(err?.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddReview({ ...addReview, [name]: value });
  };

  return (
    <li className="review-box feedbackbox mb-0" id="write-review">
      <div className="review-details">
        <h6>Leave feedback about this </h6>
      </div>
      <div className="card-body">
        <form className="">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title*"
              name="title"
              onChange={(e) => handleChange(e)}
              value={addReview?.title}
              required
            />
          </div>
          <div className="namefield">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name*"
                required
                onChange={(e) => handleChange(e)}
                value={addReview?.name}
              />
            </div>
            <div className="form-group me-0">
              <input
                type="email"
                className="form-control"
                placeholder="Email*"
                name="email"
                required
                value={user?.userInfo?.email}
                readOnly={true}
              />
            </div>
          </div>
          <div className="form-group">
            <textarea
              rows={4}
              className="form-control"
              placeholder="Write a Review*"
              name="review"
              required
              value={addReview?.review}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="reviewbox-rating">
            <p>
              <span> Rating</span>
              {[...Array(5)].map((star, index) => {
                const starRating = index + 1; // Star rating value (1 to 5)

                return (
                  <i
                    key={index}
                    className={`fas fa-star ${
                      starRating <= (hover || rating) ? "filled" : ""
                    }`}
                    onClick={() => setRating(starRating)} // Set rating on click
                    onMouseEnter={() => setHover(starRating)} // Set hover effect on mouse enter
                    onMouseLeave={() => setHover(0)} // Remove hover effect on mouse leave
                    style={{
                      color:
                        starRating <= (hover || rating) ? "#ffc107" : "#e4e5e9", // Filled stars are yellow, others are gray
                      cursor: "pointer",
                      fontSize: "24px", // Adjust the size of the stars as needed
                      margin: "0 5px", // Space between stars
                    }}
                  />
                );
              })}
            </p>
          </div>
          <div className="submit-section">
            <button
              className="btn btn-primary submit-btn"
              type="submit"
              onClick={(e) => addListingReview(e)}
            >
              {isLoading ? (
                <>
                  &nbsp;&nbsp; <Loader />
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </li>
  );
};
