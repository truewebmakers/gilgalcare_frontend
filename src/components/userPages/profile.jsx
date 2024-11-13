import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile_img } from "../imagepath";
import Footer from "../home/footer/Footer";
import UserHeader from "./Userheader";
import UserMenu from "./UserMenu";
import { ChangePassword } from "./changePassword";
import { useSelector } from "react-redux";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import GetUserSubscription from "./getUserSubscription";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    fb_link: "",
    twitter_link: "",
    googleplus_link: "",
    insta_link: "",
  });
  const { user, profileData } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadPic, setUploadedPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setProfileDetails({
        name: profileData?.name,
        email: profileData?.email,
        phone: profileData?.phone,
        notes: profileData?.notes,
        fb_link: profileData?.fb_link,
        twitter_link: profileData?.twitter_link,
        googleplus_link: profileData?.googleplus_link,
        insta_link: profileData?.insta_link,
      });
      setSelectedImage(profileData?.profile_pic);
    }
  }, [user?.token]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUploadedPic(file); // Store the File object directly, this will be sent to api
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result); // This image will be shown on the ui
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      // set body
      const bodyData = {
        name: profileDetails?.name,
        phone: profileDetails?.phone,
        email: profileDetails?.email,
        notes: profileDetails?.notes,
        fb_link: profileDetails?.fb_link,
        twitter_link: profileDetails?.twitter_link,
        googleplus_link: profileDetails?.googleplus_link,
        insta_link: profileDetails?.insta_link,
        profile_pic: uploadPic,
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.updateProfile + user?.userInfo?.id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        toast.success(response?.data?.message);
        return;
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Profile</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Profile Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl="profile" />
          <div className="profile-content">
            <div className="row dashboard-info">
              <div className="col-lg-9">
                <div className="card dash-cards">
                  <div className="card-header">
                    <h4>Profile Details</h4>
                  </div>
                  <div className="card-body">
                    <div className="profile-photo">
                      <div className="profile-img">
                        <div className="settings-upload-img">
                          <img
                            src={selectedImage ? selectedImage : profile_img}
                            alt="profile"
                          />
                        </div>
                        <div className="settings-upload-btn">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageChange}
                            name="image"
                            className="hide-input image-upload"
                            id="file"
                          />
                          <label htmlFor="file" className="file-upload">
                            Upload New photo
                          </label>
                        </div>
                        <span>Max file size: 10 MB</span>
                      </div>
                      <div
                        className="profile-img-del"
                        onClick={() => setSelectedImage(null)}
                      >
                        <i className="feather-trash-2" />
                      </div>
                    </div>
                    <div className="profile-form">
                      <form>
                        <div className="form-group">
                          <label className="col-form-label">
                            Your Full Name
                          </label>
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <i className="feather-user" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Enter Your Name"
                              value={profileDetails?.name}
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">
                                Phone Number
                              </label>
                              <div className="pass-group group-img">
                                <span className="lock-icon">
                                  <i className="feather-phone-call" />
                                </span>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="phone"
                                  placeholder="Enter Your Phone No."
                                  value={profileDetails?.phone}
                                  readOnly={true}
                                  // onChange={handleOnChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label className="col-form-label">
                                Email Address
                              </label>
                              <div className="group-img">
                                <i className="feather-mail" />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  readOnly={true}
                                  placeholder="Enter Your Email"
                                  value={profileDetails?.email}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Notes</label>
                          <div className="pass-group group-img">
                            <textarea
                              rows={4}
                              className="form-control"
                              name="notes"
                              placeholder="Enter Notes Here"
                              value={profileDetails?.notes}
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* get user subscription section */}
              </div>
              <ChangePassword />
            </div>
          </div>
          <button
            className="btn btn-primary updateProfileButton"
            type="submit"
            onClick={(e) => handleSave(e)}
          >
            {" "}
            {isLoading ? (
              <>
                &nbsp;&nbsp; <Loader />
              </>
            ) : (
              `Update Profile`
            )}
          </button>
        </div>
        {profileData?.user_type?.toLowerCase() === "business" ? (
          <GetUserSubscription />
        ) : null}
      </div>
      {/* /Profile Content */}
      <Footer />
    </>
  );
};
export default Profile;
