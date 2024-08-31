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
  editListing: "/admin/listing/update/",
  getAllListingPublic: "/listing/get-pb/all",
  searching: "/listing/search",
  getUserSpecificListing: "/listing/get/all/",
  deleteListing: "/listing/delete/",
  getMyListingDetail: "/listing/get/",
  getPublicListingDetails: "/listing/get-pb/",

  // Reviews
  getListingSpecificReviews: "/feedback/business/",
  addReview: "/feedback/store",
};

export const env = {
  API_URL: "https://webapp.hyperiontech.com.au/gilgalcareprovider/api",
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
  listingTitle: "",
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
  listingTitle: "",
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

export const dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
