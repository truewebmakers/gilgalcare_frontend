import React, { useEffect, useState } from "react";
import { profile_img } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import { LogoBGR } from "../../imagepath";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails, logOutSuccess } from "../../../redux/auth";
import { getProfile, logoutHandler } from "../../../utils/commonApis";
import { path } from "../../../constants/routesConstant";

const UserHeader = () => {
  const [drops, setDrops] = useState(false);
  const { user, profileData, isLoggedIn } = useSelector((state) => state.auth);
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
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link id="mobile_btn" to="#">
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </Link>
              <Link to="/" className="navbar-brand logo">
                <img src={LogoBGR} className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="/" className="menu-logo">
                  <img src={LogoBGR} className="img-fluid" alt="Logo" />
                </Link>
                <Link id="menu_close" className="menu-close" to="#">
                  {" "}
                  <i className="fas fa-times"></i>
                </Link>
              </div>
              <ul className="main-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                {/* <HomeMenu activeMenu={"Business"} /> */}
                <li>
                  <Link to="/listing-grid-sidebar">Listing</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                {/* <ListingMenu /> */}
                {/* <PagesMenu /> */}
                {/* <UserPagesMenu /> */}
                {/* <BlogMenu /> */}
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            {isLoggedIn ? (
              <ul className="nav header-navbar-rht">
                {user?.userInfo?.user_type !== "user" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link header-login add-listing"
                      to="/add-listing"
                    >
                      <i className="fa-solid fa-plus" /> Add Listing
                    </Link>
                  </li>
                )}
                <li className="nav-item dropdown has-arrow logged-item">
                  <Link
                    to="#"
                    className={`${
                      drops === true
                        ? "dropdown-toggle profile-userlink show "
                        : "dropdown-toggle profile-userlink"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setDrops(!drops)}
                    // className={`${change1===true ? 'dropdown-menu dropdown-menu-end show' : "dropdown-menu dropdown-menu-end"}`}
                  >
                    <img src={profileData?.profile_pic || profile_img} alt="" />
                    <span>{profileData?.name ? profileData?.name : null}</span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link className="dropdown-item" to="/profile">
                      Profile Settings
                    </Link>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="nav header-navbar-rht nav">
                <li className="nav-item">
                  <div className="cta-btn">
                    <Link to={path.login} className="btn">
                      <i className="feather-user"></i> sign in /
                    </Link>
                    <Link to="/signup" className="btn ms-1">
                      {" "}
                      register
                    </Link>
                  </div>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
      {/* /Header */}
    </>
  );
};
export default UserHeader;
