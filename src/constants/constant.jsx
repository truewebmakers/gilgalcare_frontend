export const apiUrls = {
  // auth
  signup: "/signup",
  login: "/login",
  logout: "/admin/logout",
  changePassword: "/admin/update/password/",
  updateProfile: "/admin/update/profile/",
  getProfile: "/admin/getProfile/",
  // categories
  addCategory: "/categories/store",
  getAllCategoriesList: "/categories/get/all",
  getAllCategoriesPublic: "/categories/get-pb/all",
  // listings
  addListing: "/listing/store",
  editListing: "/listing/update/",
  getAllListingPublic: "/listing/get-pb/all",
  searching: "/listing/search",
  getUserSpecificListing: "/listing/get/all/",
  deleteListing: "/listing/delete/",
  getMyListingDetail: "/listing/get/",
  getPublicListingDetails: "/listing/get-pb/",
  generateTempImageUrl: "/listing/upload-image",
  // Reviews
  getListingSpecificReviews: "/feedback/business/",
  addReview: "/feedback/store",

  // Dashboard
  getActiveListing: "/dashboard/listing-count",
  getStats: "/stats/",
  incrementShares: "/increment-shares/",
  incrementViews: "/increment-page-views/",
};

export const env = {
  API_URL: "https://webapp.hyperiontech.com.au/gilgalcareprovider/api",
  GOOGLE_MAP_KEY: "AIzaSyDk_TbPERImCZCd7YmCzYacT6wGayV-Lmk",
};

export const apiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const cateogoryOptions = [
  {
    label: "Accommodation/Tenancy Assistance",
    name: "Accommodation/Tenancy Assistance",
  },
  { label: "Assistance Animals", name: "Assistance Animals" },
  {
    label: "Assistance for Employment or Education",
    value: "Assistance for Employment or Education",
  },
  {
    label:
      "Assistance in coordinating or managing life stages/transitions and supports",
    value:
      "Assistance in coordinating or managing life stages/transitions and supports",
  },
  {
    label: "Assistance products for personal care and safety",
    value: "Assistance products for personal care and safety",
  },
  {
    label: "Assistance to access and/or maintain employment and/or education",
    value: "Assistance to access and/or maintain employment and/or education",
  },
  {
    label:
      "Assistance with daily life tasks in a group or shared living arrangement",
    value:
      "Assistance with daily life tasks in a group or shared living arrangement",
  },
  {
    label: "Assistance with travel/transport arrangements",
    value: "Assistance with travel/transport arrangements",
  },
  {
    label: "Assistive equipment for recreation",
    value: "Assistive equipment for recreation",
  },
  {
    label: "Assistive products for household tasks",
    value: "Assistive products for household tasks",
  },
  { label: "Behaviour Support", value: "Behaviour Supportss" },
];

export const errorListingFields = {
  listing_title: "",
  listingDescription: "",
  categoryId: "",
  tagline: "",
  priceRange: "",
  priceFrom: 0,
  priceTo: 0,
  featuresInformation: "",
  location: "",
  address: "",
  mapLat: "",
  mapLong: "",
  email: "",
  website: "",
  phone: "",
  facebook: "",
  twitter: "",
  googlePlus: "",
  instagram: "",
  featuredImage: "",
  logo: "",
  status: "",
};

export const defaultCenter = {
  lat: 26.045130803169,
  lng: -80.26548188573862,
};

export const initialListingField = {
  listing_title: "",
  listingDescription: "",
  categoryId: "",
  tagline: "",
  priceRange: "",
  priceFrom: 0,
  priceTo: 0,
  featuresInformation: "",
  location: "",
  address: "",
  mapLat: "",
  mapLong: "",
  email: "",
  website: "",
  phone: "",
  facebook: "",
  twitter: "",
  googlePlus: "",
  instagram: "",
  status: "",
};

export const galleryImageFields = {
  "gallery_images[0]": "",
  "gallery_images[1]": "",
  "gallery_images[2]": "",
  "gallery_images[3]": "",
  "gallery_images[4]": "",
  "gallery_images[5]": "",
};

export const dateFormat = "dddd, MMMM Do YYYY";
