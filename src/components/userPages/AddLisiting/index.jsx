import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import {
  defaultCenter,
  errorListingFields,
  initialListingField,
} from "../../../constants/constant";
import { BasicInfoForm } from "./BasicInfoForm";
import { PriceAndFeaturesForm } from "./Price&FeaturesForm";
import { LocationForm } from "./LocationForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { SocialMediaForm } from "./SocialMediaForm";
import { ImageForm } from "./ImageForm";
import { validateListingFields } from "../../../utils/validations";
import Loader from "../../common/Loader";
import { addListingService } from "../../../services/addListingService";
import { fetchCategories } from "../../../services/getCategoryList";

const AddLisiting = () => {
  const [listingFields, setListingFields] = useState(initialListingField);
  const [selectedImage, setSelectedImage] = useState({
    featuredImage: null,
    logo: null,
  });
  const [uploadPic, setUploadedPic] = useState({
    featuredImage: null,
    logo: null,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: parseFloat(listingFields?.mapLat) || defaultCenter.lat,
    lng: parseFloat(listingFields?.mapLong) || defaultCenter.lng,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [error, setError] = useState(errorListingFields);
  const parms = useLocation().pathname;
  const [categoriesList, setCategoriesList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCategories(user?.token);
      if (response?.length) {
        setCategoriesList(response);
      }
    };
    fetchData();
  }, []);

  const hasErrors = (error) => Object.values(error).some((err) => err);

  const areAllFieldsFilled = (data) =>
    Object.values(data).every((field) => field);

  useEffect(() => {
    if (hasErrors(error)) {
      setIsDisable(true);
      return;
    }
    setIsDisable(false);
  }, [error]);

  // api handler for add lsiting
  const handleAddListing = async (e) => {
    e.preventDefault();
    const allFields = {
      ...listingFields,
      ...selectedImage,
      ...uploadPic,
      addedBy: user?.userInfo?.id, // Add user ID to the listing data
    };

    let newErr = {};
    for (let key in allFields) {
      newErr = {
        ...newErr,
        ...validateListingFields(key, allFields[key], listingFields),
      };
    }
    setError(newErr);

    if (!hasErrors(newErr) && areAllFieldsFilled(allFields)) {
      setIsLoading(true);
      try {
        await addListingService(allFields, user?.token);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // hanlde change function
  const handleChange = (e) => {
    const { name, value, type, files, checked, dataset } = e.target;

    if (dataset?.handler === "imageInfo" && files && files[0]) {
      const file = files[0];
      setUploadedPic((prevState) => ({ ...prevState, [name]: file }));
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setSelectedImage((prevState) => ({
          ...prevState,
          [name]: loadEvent.target.result,
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    if (dataset?.handler === "basicInfo1") {
      if (name === "categoryId") {
        const categoryName = categoriesList?.find(
          (cat) => cat?.id == value
        )?.name;
        setListingFields((prevState) => ({
          ...prevState,
          [name]: value,
          categoryName: categoryName,
        }));
      } else {
        setListingFields((prevState) => ({ ...prevState, [name]: value }));
      }
    } else if (dataset?.handler === "basicInfo2" && type === "checkbox") {
      const features = listingFields?.featuresInformation
        ? listingFields?.featuresInformation?.split(", ").filter(Boolean)
        : [];

      if (checked) {
        if (!features?.includes(value)) features.push(value);
      } else {
        const index = features?.indexOf(value);
        if (index > -1) features?.splice(index, 1);
      }

      setListingFields((prevState) => ({
        ...prevState,
        featuresInformation: features?.join(", "),
      }));
    } else {
      setListingFields((prevState) => ({ ...prevState, [name]: value }));
    }

    if (
      isDisable &&
      [
        "basicInfo1",
        "basicInfo2",
        "locationInfo",
        "contactInfo",
        "socialMediaInfo",
        "imageInfo",
      ].includes(dataset.handler)
    ) {
      const newErr = validateListingFields(name, value, listingFields);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };

  return (
    <>
      <UserHeader parms={parms} />
      <UserBreadCrumb path="Home" pageName={"Add Listing"} />
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
                  basicInfo1={listingFields}
                  error={error}
                  handleChange={handleChange}
                  categoriesList={categoriesList}
                />
              </div>
              <PriceAndFeaturesForm
                basicInfo2={listingFields}
                error={error}
                handleChange={handleChange}
              />
              <LocationForm
                locationInfo={listingFields}
                setLocation={setListingFields}
                error={error}
                handleChange={handleChange}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
              />
              <ContactInfoForm
                contactInfo={listingFields}
                error={error}
                handleChange={handleChange}
              />
              <SocialMediaForm
                socialMedia={listingFields}
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
                {isLoading ? (
                  <>
                    &nbsp;&nbsp; <Loader />
                  </>
                ) : (
                  `Add Listing`
                )}
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
