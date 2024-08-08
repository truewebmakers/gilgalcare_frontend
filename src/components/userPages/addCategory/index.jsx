import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gallerymedia_1, gallerymedia_2, gallerymedia_3, gallerymedia_4, gallerymedia_5, mediaimg_1, mediaimg_2, profile_img } from "../../imagepath";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import { apiMethods, apiUrls } from "../../../constants/constant";
import UseApi from "../../../hooks/useApi";
import { customToast } from "../../common/Toast";
import { addCategoryValidation } from "../../../utils/validations";

const AddCategory = () => {
    const [addCategory, setAddCategory] = useState({
        name: '',
        details: '',
        location: '',
        status: ''
    })
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadPic, setUploadedPic] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false)
    const parms = useLocation().pathname
    const { user } = useSelector((state) => state.auth);
    const [error, setError] = useState({
        name: '',
        details: '',
        location: '',
        status: ''
    });


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddCategory({ ...addCategory, [name]: value });
        if (isDisable) {
            const newErr = addCategoryValidation(name, value);
            setError((prevError) => ({ ...prevError, ...newErr }));
        }
    }

    const hasErrors = (error) => {
        return Object.values(error).some((err) => err);
    };

    const areAllFieldsFilled = (data) => {
        return Object.values(data).every((field) => field);
    };

    useEffect(() => {
        if (hasErrors(error)) {
            setIsDisable(true);
            return;
        }
        setIsDisable(false);
    }, [error]);


    const handleAddCategory = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        let newErr = {};
        for (let key in addCategory) {
            newErr = { ...newErr, ...addCategoryValidation(key, addCategory[key]) };
        }
        setError(newErr);
        if (!hasErrors(newErr) && areAllFieldsFilled(addCategory)) {
            // call add category api
            try {
                // set headers
                const headers = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user?.token}`,
                };
                // set body
                const bodyData = {
                    name: addCategory?.name,
                    status: addCategory?.status,
                    details: addCategory?.details,
                    location: addCategory?.location,
                    feature_image: uploadPic,
                };
                // Call signup API
                const response = await UseApi(
                    apiUrls.addCategory,
                    apiMethods.POST,
                    bodyData,
                    headers
                );
                if (response?.status == 200 || response?.status == 201) {
                    customToast.success(response?.data?.message);
                    setAddCategory({
                        name: '',
                        details: '',
                        location: '',
                        status: ''
                    })
                    return;
                } else {
                    customToast.error(response?.data?.message);
                }
            } catch (err) {
                customToast.error(err?.message);
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <>
            <UserHeader parms={parms} />
            {/* Breadscrumb Section */}
            <UserBreadCrumb path="Home" pageName={'Add Category'} />

            {/* /Breadscrumb Section */}
            {/* Profile Content */}
            <div className="dashboard-content">
                <div className="container">
                    <UserMenu activeUrl={'add-category'} />
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
                                            value={addCategory?.name}
                                            name='name'
                                            onChange={handleChange}
                                        />
                                        {error?.name && (
                                            <p style={{ color: "red" }}>{error?.name}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="col-form-label">
                                            Location <span>*</span>
                                        </label>
                                        <input
                                            className="form-control pass-input"
                                            placeholder="Location"
                                            defaultValue={""}
                                            value={addCategory?.location}
                                            name='location'
                                            onChange={handleChange}
                                        />
                                        {error?.location && (
                                            <p style={{ color: "red" }}>{error?.location}</p>
                                        )}
                                    </div>
                                    <div className="filter-content form-group">
                                        <label className="col-form-label">
                                            Status <span>*</span>
                                        </label>
                                        <select className="form-control select category-select"
                                            value={addCategory?.status}
                                            name='status'
                                            onChange={handleChange}
                                        >
                                            <option value="">Status</option>
                                            <option>Published</option>
                                            <option>Unpublished</option>
                                        </select>
                                        {error?.status && (
                                            <p style={{ color: "red" }}>{error?.status}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">
                                            Details <span>*</span>
                                        </label>
                                        <textarea
                                            rows={6}
                                            className="form-control listingdescription"
                                            placeholder="Details"
                                            value={addCategory?.details}
                                            name='details'
                                            onChange={handleChange}
                                        />
                                        {error?.details && (
                                            <p style={{ color: "red" }}>{error?.details}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit" onClick={handleAddCategory}>
                                {" "}
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Profile Content */}
            <Footer />
        </>

    );
}
export default AddCategory;