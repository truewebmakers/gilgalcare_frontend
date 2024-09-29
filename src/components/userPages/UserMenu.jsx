import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../../utils/commonApis";
import { logOutSuccess } from "../../redux/auth";

export default function UserMenu({ activeUrl }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logoutHandler(user);
    if (res === true) {
      dispatch(logOutSuccess());
      navigate("/login");
    }
  };

  return (
    <div className="">
      <ul className="dashborad-menus">
        <li className={activeUrl == "dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <i className="feather-grid" /> <span>Dashboard</span>
          </Link>
        </li>
        <li className={activeUrl == "profile" ? "active" : ""}>
          <Link to="/profile">
            <i className="fa-solid fa-user" /> <span>Profile</span>
          </Link>
        </li>
        {user?.userInfo?.user_type !== "user" ? (
          <li className={activeUrl == "my-listing" ? "active" : ""}>
            <Link to="/my-listing">
              <i className="feather-list" /> <span>My Listing</span>
            </Link>
          </li>
        ) : null}
        {user?.userInfo?.user_type === "admin" && (
          <li className={activeUrl == "my-category" ? "active" : ""}>
            <Link to="/my-category">
              <i className="feather-list" /> <span>My Category</span>
            </Link>
          </li>
        )}
        <li>
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            <i className="fas fa-light fa-circle-arrow-left" />{" "}
            <span>Logout</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
