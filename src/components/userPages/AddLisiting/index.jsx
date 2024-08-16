import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import {
  apiMethods,
  apiUrls,
  listingFields,
} from "../../../constants/constant";
import { BasicInfoForm } from "./BasicInfoForm";
import { PriceAndFeaturesForm } from "./Price&FeaturesForm";
import { LocationForm } from "./LocationForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { SocialMediaForm } from "./SocialMediaForm";
import { ImageForm } from "./ImageForm";
import {
  addCategoryValidation,
  validateListingFields,
} from "../../../utils/validations";
import UseApi from "../../../hooks/useApi";
import { customToast } from "../../common/Toast";
import { facebook } from "../../imagepath";
import Loader from "../../common/Loader";

const AddLisiting = () => {
  const [basicInfo1, setBasicInfo1] = useState({
    listingTitle: "",
    listingDiscription: "",
    categoryId: "", //for now only 1 category is allowed
    tagline: "",
  });
  const [basicInfo2, setBasicInfo2] = useState({
    priceRange: "",
    priceFrom: 0,
    priceTo: 0,
    featuresInformation: "",
  });
  const [locationInfo, setLocation] = useState({
    location: "",
    address: "",
    mapLat: "",
    mapLong: "",
  });
  const [contactInfo, setContactInfo] = useState({
    email: "",
    website: "",
    phone: "",
  });
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    googlePlus: "",
    instagram: "",
  });

  const [selectedImage, setSelectedImage] = useState({
    featuredImage: null,
    logo: null,
  });
  const [uploadPic, setUploadedPic] = useState({
    featuredImage: null,
    logo: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const [error, setError] = useState(listingFields);
  const parms = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

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

  const handleAddListing = async (e) => {
    e.preventDefault();
    let newErr = {};

    const allFields = {
      ...basicInfo1,
      ...basicInfo2,
      ...locationInfo,
      ...contactInfo,
      ...socialMedia,
      ...selectedImage,
      ...uploadPic,
    };

    for (let key in allFields) {
      newErr = {
        ...newErr,
        ...validateListingFields(key, allFields[key], basicInfo2),
      };
    }
    setError(newErr);

    if (!hasErrors(newErr) && areAllFieldsFilled(allFields)) {
      setIsLoading(true);
      // call add category api
      try {
        // set headers
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        };
        // set body
        const bodyData = {
          listing_title: basicInfo1?.listingTitle,
          listing_description: basicInfo1?.listingDiscription,
          category_id: basicInfo1?.categoryId,
          tagline: basicInfo1?.tagline,
          price_range: "987865",
          price_from: 10,
          price_to: 30,
          features_information: "feature1, feature2",
          location: locationInfo?.location,
          address: locationInfo?.address,
          map_lat: locationInfo?.mapLat,
          map_long: locationInfo?.mapLong,
          email: contactInfo?.email,
          website: contactInfo?.website,
          phone: contactInfo?.phone,
          facebook: socialMedia?.facebook,
          twitter: socialMedia?.twitter,
          google_plus: socialMedia?.googlePlus,
          instagram: socialMedia?.instagram,
          featured_image: uploadPic?.featuredImage,
          logo: uploadPic?.logo,
          added_by: user?.userInfo?.id,
        };
        // Call Add Listing API
        const response = await UseApi(
          apiUrls.addListing,
          apiMethods.POST,
          bodyData,
          headers
        );
        if (response?.status == 200 || response?.status == 201) {
          customToast.success(response?.data?.message);
          return;
        } else {
          customToast.error(response?.data?.message);
        }
      } catch (err) {
        customToast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadscrumb Section */}
      <UserBreadCrumb path="Home" pageName={"Add Listing"} />
      {/* /Breadscrumb Section */}
      {/* Profile Content */}
      <div className="dashboard-content">
        <div className="container">
          <UserMenu activeUrl={"add-listing"} />
          <div className="profile-content">
            <div className="messages-form">
              <div className="card">
                <div className="card-header">
                  <h4>Basic information</h4>
                </div>
                <BasicInfoForm
                  basicInfo1={basicInfo1}
                  setBasicInfo1={setBasicInfo1}
                  error={error}
                />
              </div>
              <PriceAndFeaturesForm
                basicInfo2={basicInfo2}
                setBasicInfo2={setBasicInfo2}
                error={error}
              />
              <LocationForm
                locationInfo={locationInfo}
                setLocation={setLocation}
                error={error}
              />
              <ContactInfoForm
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                error={error}
              />
              <SocialMediaForm
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                error={error}
              />
              <ImageForm
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setUploadedPic={setUploadedPic}
                error={error}
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleAddListing}
                disabled={isDisable}
              >
                {" "}
                {isLoading ? (
                  <>
                    &nbsp;&nbsp; <Loader />
                  </>
                ) : (
                  `Add Listing`
                )}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AddLisiting;
