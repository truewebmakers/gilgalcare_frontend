import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const addListingService = async (
  listingData,
  mapLat,
  mapLong,
  token,
  galleryImage
) => {
  const galleryImageKeys = Object?.keys(galleryImage)?.filter(
    (key) => galleryImage[key]
  );
  if (galleryImageKeys?.length < 2) {
    customToast.error("At least two gallery images are required.");
    return null;
  }
  // set headers
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  // Prepare the body for API request
  const bodyData = {
    listing_title: listingData?.listing_title,
    listing_description: listingData?.listingDescription,
    category_id: listingData?.categoryId,
    tagline: listingData?.tagline,
    status: listingData?.status,
    price_range: listingData?.priceRange,
    price_from: listingData?.priceFrom,
    price_to: listingData?.priceTo,
    features_information: listingData?.featuresInformation,
    location: null,
    address: listingData?.address,
    map_lat: mapLat,
    map_long: mapLong,
    email: listingData?.email,
    website: listingData?.website,
    phone: listingData?.phone,
    facebook: null,
    twitter: null,
    google_plus: null,
    instagram: null,
    featured_image: listingData?.featuredImage,
    logo: listingData?.logo,
    added_by: listingData?.addedBy,
  };

  // Add gallery images dynamically
  if (galleryImage) {
    Object?.keys(galleryImage)?.forEach((key) => {
      if (galleryImage[key]) {
        bodyData[key] = galleryImage[key];
      }
    });
  }

  try {
    // Call Add Listing API
    const response = await UseApi(
      apiUrls.addListing,
      apiMethods.POST,
      bodyData,
      headers
    );

    if (response?.status === 200 || response?.status === 201) {
      customToast.success(response?.data?.message);
      return response?.data;
    } else {
      customToast.error(response?.data?.message);
      return null;
    }
  } catch (err) {
    customToast.error(err?.message);
    return null;
  }
};
