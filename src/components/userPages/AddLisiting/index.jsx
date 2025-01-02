import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserMenu from "../UserMenu";
import UserBreadCrumb from "../UserBreadCrumb";
import { useSelector } from "react-redux";
import {
  defaultCenter,
  enabledAvailableDays,
  errorListingFields,
  galleryImageFields,
  initialListingField,
  timeAvailabilyFields,
} from "../../../constants/constant";
import { BasicInfoForm } from "./BasicInfoForm";
import { PriceAndFeaturesForm } from "./Price&FeaturesForm";
import { LocationForm } from "./LocationForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { SocialMediaForm } from "./SocialMediaForm";
import { ImageForm } from "./ImageForm";
import {
  isTimeDifferenceValid,
  validateListingFields,
} from "../../../utils/validations";
import Loader from "../../common/Loader";
import { addListingService } from "../../../services/addListingService";
import { fetchCategories } from "../../../services/getCategoryList";
import { editListingService } from "../../../services/editListingService";
import { fetchMyListingDetail } from "../../../services/getMyListingDetail";
import { fetchImageAsBinary } from "../../../utils/commonFunctions";
import { GalleryImages } from "./galleryImages";
import { toast } from "react-toastify";
import UserHeader from "../../home/header/Header";
import UserAvailability from "./UserAvailability";
import { addUserAvailabilityService } from "../../../services/userAvailabilityService";
import { customToast } from "../../common/Toast";
import { fetchAvailability } from "../../../services/fetchAvailablity";

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
  const parms = useLocation();
  const [categoriesList, setCategoriesList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const id = parms?.pathname?.includes("edit-listing")
    ? parms?.state?.id
    : null;
  const [galleryImage, setGalleryImage] = useState(galleryImageFields);
  const [showGalleryImage, setShowGalleryImage] = useState(galleryImageFields);
  const [availability, setAvailability] = useState(timeAvailabilyFields);
  const [enabledDays, setEnabledDays] = useState(enabledAvailableDays);
  const navigate = useNavigate();

  const fetchCategoriesData = async () => {
    const response = await fetchCategories(user?.token);
    if (response?.length) {
      setCategoriesList(response);
    }
  };

  const fetchMyListingData = async () => {
    const response = await fetchMyListingDetail(user?.token, id);

    setListingFields((prevFields) => {
      return Object.entries(prevFields).reduce((acc, [key, _]) => {
        const apiKey = convertToApiKey(key); // Convert state keys to API response keys
        acc[key] =
          response[apiKey] !== undefined
            ? parseFieldValue(key, response[apiKey])
            : prevFields[key];
        return acc;
      }, {});
    });
    setSelectedImage({
      featuredImage: response?.featured_image,
      logo: response?.logo,
    });
    if (response?.categories?.length) {
      const categoryIds = response?.categories?.map((category) => category?.id); // Extract ids
      setListingFields((prev) => ({
        ...prev,
        categoryId: categoryIds, // Save ids in categoryId
      }));
    }
    if (response?.featured_image?.length) {
      const featureRes = await fetchImageAsBinary(response?.featured_image);
      setUploadedPic((prev) => ({
        ...prev,
        featuredImage: featureRes,
      }));
    }
    if (response?.logo?.length) {
      const featureLogo = await fetchImageAsBinary(response?.logo);
      setUploadedPic((prev) => ({
        ...prev,
        logo: featureLogo,
      }));
    }

    const galleryImagesBinary = {};
    const metaImages = response?.meta || [];

    // Process up to 6 gallery images
    for (let i = 0; i < metaImages.length && i < 6; i++) {
      const imageUrl = metaImages[i]?.gallery_image;

      if (imageUrl?.length) {
        // Set direct URL for showing
        setShowGalleryImage((prev) => ({
          ...prev,
          [`gallery_images[${i}]`]: imageUrl,
        }));

        // Fetch binary data and set it
        const imageBinary = await fetchImageAsBinary(imageUrl);
        galleryImagesBinary[`gallery_images[${i}]`] = imageBinary;
      }
    }

    // Optionally, set gallery images to state if needed for binary data
    setGalleryImage((prev) => ({
      ...prev,
      ...galleryImagesBinary,
    }));
  };

  const convertToApiKey = (key) => {
    // Convert the camelCase keys to snake_case keys as used in the API response
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
  };

  const parseFieldValue = (key, value) => {
    // Parse fields that require special handling, e.g., priceFrom, priceTo
    if (key === "priceFrom" || key === "priceTo") {
      return parseFloat(value) || 0;
    }
    return value;
  };

  useEffect(() => {
    fetchCategoriesData();
    if (id) {
      fetchMyListingData();
      fetchAvailability(setAvailability, id, user?.token, setEnabledDays);
    }
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
    if (areAllFieldsFilled(allFields)) {
      setError(newErr);
      if (!isTimeDifferenceValid(availability, enabledDays)) {
        return;
      } else if (!hasErrors(newErr)) {
        setIsLoading(true);
        let response = null;

        try {
          response = id
            ? await editListingService(allFields, id, user?.token, galleryImage)
            : await addListingService(allFields, user?.token, galleryImage);

          // Check if `addListingService` returned a listingId
          if (response?.listing?.id) {
            // Call the userAvailability API with the listingId
            const res = await addUserAvailabilityService(
              response?.listing?.id,
              user?.token,
              availability,
              enabledDays
            );
            if (res == true) {
              navigate("/my-listing");
            }
          }
        } catch (err) {
          customToast.error(
            err?.message ||
              "Encountered some error while adding listing. Please fill all field correctly"
          );
          return err;
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      customToast.error("Enter All fields");
    }
  };

  // hanlde change function
  const handleChange = (e) => {
    const { name, value, type, files, checked, dataset } = e.target;

    // Handle image info updates
    if (dataset?.handler === "imageInfo" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        setSelectedImage((prevState) => ({
          ...prevState,
          [name]: loadEvent.target.result,
        }));
      };
      reader.readAsDataURL(file);

      setUploadedPic((prevState) => {
        return { ...prevState, [name]: file };
      });
    }

    // Handle basic info updates
    if (dataset?.handler === "basicInfo1") {
      if (name === "categoryId") {
        // Ensure value is treated as a string for consistency
        const selectedIds = listingFields?.categoryId || []; // Initialize as an array if undefined
        const updatedIds = selectedIds?.includes(value)
          ? selectedIds?.filter((id) => id !== value) // Remove the unchecked category
          : [...selectedIds, value]; // Add the checked category

        setListingFields((prevState) => ({
          ...prevState,
          categoryId: updatedIds, // Update categoryId with the new array
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
    } else if (dataset?.handler === "locationInfo") {
      // Handle location updates separately
      setListingFields((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setListingFields((prevState) => ({ ...prevState, [name]: value }));
    }

    // Validate fields if `isDisable` is true
    if (isDisable) {
      const newErr = validateListingFields(name, value, listingFields);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };

  return (
    <>
      <UserHeader />
      <UserBreadCrumb
        path="Home"
        pageName={id ? "Update Listing" : "Add Listing"}
      />
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
                setError={setError}
                isDisable={isDisable}
              />
              <ContactInfoForm
                contactInfo={listingFields}
                error={error}
                handleChange={handleChange}
              />
              <UserAvailability
                setAvailability={setAvailability}
                availability={availability}
                enabledDays={enabledDays}
                setEnabledDays={setEnabledDays}
              />
              {/* <SocialMediaForm
                socialMedia={listingFields}
                error={error}
                handleChange={handleChange}
              /> */}
              <ImageForm
                selectedImage={selectedImage}
                error={error}
                handleChange={handleChange}
              />
              <GalleryImages
                setGalleryImage={setGalleryImage}
                showGalleryImage={showGalleryImage}
                setShowGalleryImage={setShowGalleryImage}
              />
              <button
                className="btn btn-primary "
                type="submit"
                onClick={handleAddListing}
                disabled={isDisable}
              >
                {isLoading ? (
                  <>
                    &nbsp;&nbsp; <Loader />
                  </>
                ) : id ? (
                  `Update Listing`
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
