import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gallerymedia_1, gallerymedia_2, gallerymedia_3, gallerymedia_4, gallerymedia_5, mediaimg_1, mediaimg_2, profile_img } from "../../imagepath";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";




const AddCategory = () => {
const [selectedImage, setSelectedImage] = useState(null);
const [uploadPic, setUploadedPic] = useState(null);
    const parms=useLocation().pathname

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
    return (
        <>
        <UserHeader parms={parms}/>
            {/* Breadscrumb Section */}
            <UserBreadCrumb path="Home" pageName={'Add Category'} />
            
            {/* /Breadscrumb Section */}
            {/* Profile Content */}
            <div className="dashboard-content">
                <div className="container">
                <UserMenu activeUrl={'add-category'}/>
                    <div className="profile-content">
                        <div className="messages-form">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add Category</h4>
                                </div>
                                <div className="card-body">
                                <div className="profile-photo">
                                            <div className="profile-img">
                                                <div className="settings-upload-img">
                                                    <img src={
                                                        selectedImage
                                                            ? selectedImage
                                                            : profile_img
                                                    } alt="profile" />
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
                                                        Feature Image
                                                    </label>
                                                </div>
                                                <span>Max file size: 10 MB</span>
                                            </div>
                                            <div className="profile-img-del" onClick={() => setSelectedImage(null)}
                                            >
                                                <i className="feather-trash-2" />
                                            </div>
                                        </div>
                                    <div className="form-group addCategoryName">
                                        <label className="col-form-label">
                                            Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control pass-input"
                                            placeholder="Name"
                                        />
                                    </div>
                                       
                                    <div className="form-group">
                                        <label className="col-form-label">
                                           Location <span>*</span>
                                        </label>
                                        <input
                                            className="form-control pass-input"
                                            placeholder="Location"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="filter-content form-group">
                                    <label className="col-form-label">
                                           Status <span>*</span>
                                        </label>
                                                <select className="form-control select category-select">
                                                    <option value="">Status</option>
                                                    <option>Published</option>
                                                    <option>Unpublished</option>
                                                </select>
                                            </div>
                                    <div className="form-group">
                                            <label className="col-form-label">
                                            Details <span>*</span>
                                            </label>
                                            <textarea
                                                rows={6}
                                                className="form-control listingdescription"
                                                placeholder="Details"
                                                defaultValue={""}
                                            />
                                        </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                {" "}
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Profile Content */}
           <Footer/>
        </>

    );
}
export default AddCategory;