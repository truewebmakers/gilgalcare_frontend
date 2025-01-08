import React, { useState, useEffect } from "react";

export const Ratings = ({ getListingReview = () => {} }) => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListingReview();
      setReviewList(data);
    };
    fetchData();
  }, []);

  // Calculate overall rating
  const calculateAverageRating = () => {
    if (reviewList?.length === 0 || !reviewList) return 0;
    const totalRating = reviewList?.reduce(
      (sum, review) => sum + review?.rating,
      0
    );
    return (totalRating / reviewList?.length)?.toFixed(1); // One decimal precision
  };

  // Create rating distribution
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // Initialize with 0 counts for 1-star to 5-star
    reviewList?.forEach((review) => {
      if (review?.rating >= 1 && review?.rating <= 5) {
        distribution[review.rating - 1] += 1;
      }
    });
    return distribution;
  };

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();

  // Render filled and empty stars
  const renderStars = (rating) => {
    const filledStars = Math?.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(filledStars)
          .fill()
          .map((_, i) => (
            <i key={`filled-${i}`} className="fas fa-star filled" />
          ))}
        {halfStar && <i className="fas fa-star-half-alt filled" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <i key={`empty-${i}`} className="fa-regular fa-star rating-color" />
          ))}
      </>
    );
  };

  return (
    <div className="card">
      <div className="card-header align-items-center">
        <i className="feather-star" />
        <h4>Ratings</h4>
      </div>
      <div className="card-body">
        <div className="ratings-content">
          <div className="row">
            <div className="col-lg-3">
              <div className="ratings-info">
                <p className="ratings-score">
                  <span>{averageRating}</span>/5
                </p>
                <p>OVERALL</p>
                <p>{renderStars(averageRating)}</p>
                <p>Based on {reviewList?.length} Reviews</p>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="ratings-table table-responsive">
                <table className="">
                  <tbody>
                    {ratingDistribution.map((count, index) => (
                      <tr key={`rating-${index}`}>
                        <td className="star-ratings">
                          {renderStars(index + 1)}{" "}
                          {/* Direct mapping for 1-star to 5-star */}
                        </td>
                        <td>{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
