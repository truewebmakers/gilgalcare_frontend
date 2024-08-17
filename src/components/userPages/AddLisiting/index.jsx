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
import { validateListingFields } from "../../../utils/validations";
import UseApi from "../../../hooks/useApi";
import { customToast } from "../../common/Toast";
import Loader from "../../common/Loader";

const defaultCenter = {
  lat: 26.045130803169,
  lng: -80.26548188573862,
};

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
  const [markerPosition, setMarkerPosition] = useState({
    lat: parseFloat(locationInfo?.mapLat) || defaultCenter.lat,
    lng: parseFloat(locationInfo?.mapLong) || defaultCenter.lng,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const [error, setError] = useState(listingFields);
  const parms = useLocation().pathname;
  const [categoriesList, setCategoriesList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getAllCategoriesList,
        apiMethods.GET,
        null,
        headers
      );
      setCategoriesList(response?.data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          price_range: basicInfo2?.priceRange,
          price_from: basicInfo2?.priceFrom,
          price_to: basicInfo2?.priceTo,
          features_information: basicInfo2?.featuresInformation,
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

  const handleChange = (e) => {
    const { name, value, type, files, checked, dataset } = e.target;

    switch (dataset.handler) {
      case "basicInfo1":
        if (name === "categoryId") {
          const categoryName = categoriesList?.find(
            (cat) => cat?.id == value
          )?.name;
          setBasicInfo1((prevState) => ({
            ...prevState,
            categoryId: value,
            categoryName: categoryName,
          }));
        }
        setBasicInfo1((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      case "basicInfo2":
        if (type === "checkbox") {
          const features = basicInfo2?.featuresInformation
            ? basicInfo2?.featuresInformation?.split(", ").filter(Boolean)
            : [];

          if (checked) {
            if (!features?.includes(value)) {
              features?.push(value);
            }
          } else {
            const index = features?.indexOf(value);
            if (index > -1) {
              features?.splice(index, 1);
            }
          }

          setBasicInfo2((prevState) => ({
            ...prevState,
            featuresInformation: features.join(", "),
          }));
        } else {
          setBasicInfo2((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "locationInfo":
        const updatedLocationInfo = {
          ...locationInfo,
          [name]: value,
        };

        setLocation(updatedLocationInfo);

        if (name === "mapLat" || name === "mapLong") {
          const lat =
            parseFloat(updatedLocationInfo.mapLat) || markerPosition.lat;
          const lng =
            parseFloat(updatedLocationInfo.mapLong) || markerPosition.lng;
          setMarkerPosition({ lat, lng });
        }
        break;

      case "contactInfo":
        setContactInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      case "socialMediaInfo":
        setSocialMedia((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      case "imageInfo":
        if (files && files[0]) {
          const file = files[0];
          // Update the uploadPic state with the File object
          setUploadedPic((prevState) => ({
            ...prevState,
            [name]: file,
          }));
          const reader = new FileReader();
          reader.onload = function (loadEvent) {
            // Update the selectedImage state with the Data URL
            setSelectedImage((prevState) => ({
              ...prevState,
              [name]: loadEvent.target.result,
            }));
          };
          reader.readAsDataURL(file);
        }
        break;

      default:
        break;
    }

    if (
      (dataset.handler === "basicInfo1" ||
        dataset.handler === "basicInfo2" ||
        dataset.handler === "locationInfo" ||
        dataset.handler === "contactInfo" ||
        dataset.handler === "socialMediaInfo" ||
        dataset.handler === "imageInfo") &&
      isDisable
    ) {
      const newErr = validateListingFields(name, value, basicInfo2);
      setError((prevError) => ({ ...prevError, ...newErr }));
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
                  error={error}
                  handleChange={handleChange}
                  categoriesList={categoriesList}
                />
              </div>
              <PriceAndFeaturesForm
                basicInfo2={basicInfo2}
                error={error}
                handleChange={handleChange}
              />
              <LocationForm
                locationInfo={locationInfo}
                setLocation={setLocation}
                error={error}
                handleChange={handleChange}
                setMarkerPosition={setMarkerPosition}
                markerPosition={markerPosition}
              />

              <ContactInfoForm
                contactInfo={contactInfo}
                error={error}
                handleChange={handleChange}
              />
              <SocialMediaForm
                socialMedia={socialMedia}
                error={error}
                handleChange={handleChange}
              />
              <ImageForm
                selectedImage={selectedImage}
                error={error}
                handleChange={handleChange}
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
