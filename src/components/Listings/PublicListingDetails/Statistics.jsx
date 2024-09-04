import React, { useEffect, useState } from "react";
import { statistic_icon } from "../../imagepath";
import { useSelector } from "react-redux";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { useLocation } from "react-router-dom";

export const Statistics = ({ listingDetail }) => {
  const [stats, setStats] = useState({});
  const parms = useLocation();
  const id = parms.state?.id;

  const getDashboardStats = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getStats + id,
        apiMethods.GET,
        null,
        headers
      );

      setStats(response?.data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);
  return (
    <div className="card">
      <h4>
        <img src={statistic_icon} alt="location" /> Statistic
      </h4>
      <ul className="statistics-list">
        <li>
          <div className="statistic-details">
            <span className="icons">
              <i className="fa-regular fa-eye" />
            </span>
            Views{" "}
          </div>
          <span className="text-end">
            {" "}
            {stats?.page_views ? stats?.page_views : "0"}
          </span>
        </li>
        <li>
          <div className="statistic-details">
            <span className="icons">
              <i className="feather-star" />
            </span>
            Ratings{" "}
          </div>
          <span className="text-end">
            {" "}
            {listingDetail?.ratings ? listingDetail?.ratings : "0"}
          </span>
        </li>
        <li>
          <div className="statistic-details">
            <span className="icons">
              <i className="feather-heart" />
            </span>
            Reviews{" "}
          </div>
          <span className="text-end">
            {" "}
            {stats?.total_reviews ? stats?.total_reviews : "0"}
          </span>
        </li>
        <li className="mb-0">
          <div className="statistic-details">
            <span className="icons">
              <i className="feather-share-2" />
            </span>
            Shares{" "}
          </div>
          <span className="text-end">
            {" "}
            {stats?.total_shares ? stats?.total_shares : "0"}
          </span>
        </li>
      </ul>
    </div>
  );
};
