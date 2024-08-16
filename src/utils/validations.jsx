let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const handleValidations = (name, value) => {
  let newErr = {};
  switch (name) {
    case "name":
      if (value === "") {
        newErr[name] = "Enter your first name";
        break;
      } else if (value?.length < 2) {
        newErr[name] = "First name is too short";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "email":
      if (value === "") {
        newErr[name] = "Enter valid email";
        break;
      } else if (!emailRegex.test(value)) {
        newErr[name] = "Invalid Email";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "passwordInput":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    default:
      break;
  }
  return newErr;
};

export const passwordValidations = (name, value) => {
  let newErr = {};
  switch (name) {
    case "oldPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "newPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "confirmPassword":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    default:
      break;
  }

  return newErr;
};

export const addCategoryValidation = (name, value) => {
  let newErr = {};

  switch (name) {
    case "name":
      if (value === "") {
        newErr[name] = "Name cannot be empty";
      } else if (value.length < 2) {
        newErr[name] = "Name is too short";
      } else {
        newErr[name] = "";
      }
      break;

    case "details":
      if (value === "") {
        newErr[name] = "Details cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "location":
      if (value === "") {
        newErr[name] = "Location cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "status":
      if (value === "") {
        newErr[name] = "Status cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    default:
      break;
  }

  return newErr;
};

export const validateListingFields = (name, value, basicInfo2) => {
  let newErr = {};

  switch (name) {
    case "listingTitle":
      if (value === "") {
        newErr[name] = "Listing title cannot be empty";
      } else if (value?.length < 5) {
        newErr[name] = "Listing title is too short";
      } else {
        newErr[name] = "";
      }
      break;

    case "listingDiscription":
      if (value === "") {
        newErr[name] = "Listing description cannot be empty";
      } else if (value?.length < 20) {
        newErr[name] = "Listing description is too short";
      } else {
        newErr[name] = "";
      }
      break;

    case "categoryId":
      if (value === "") {
        newErr[name] = "Category cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "tagline":
      if (value === "") {
        newErr[name] = "Tagline cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "priceRange":
      if (value === "") {
        newErr[name] = "Price range cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "priceFrom":
      if (value <= 0) {
        newErr[name] = "Price from cannot be negative";
      } else {
        newErr[name] = "";
      }
      break;

    case "priceTo":
      if (value <= 0) {
        newErr[name] = "Price to cannot be negative";
      } else if (value < basicInfo2?.priceFrom) {
        newErr[name] = "Price to cannot be less than price from";
      } else {
        newErr[name] = "";
      }
      break;

    case "featuresInformation":
      if (value === "") {
        newErr[name] = "Features information cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "location":
      if (value === "") {
        newErr[name] = "Location cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "address":
      if (value === "") {
        newErr[name] = "Address cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "mapLat":
      if (value === "") {
        newErr[name] = "Latitude cannot be empty";
      } else if (isNaN(value)) {
        newErr[name] = "Latitude must be a number";
      } else {
        newErr[name] = "";
      }
      break;

    case "mapLong":
      if (value === "") {
        newErr[name] = "Longitude cannot be empty";
      } else if (isNaN(value)) {
        newErr[name] = "Longitude must be a number";
      } else {
        newErr[name] = "";
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === "") {
        newErr[name] = "Email cannot be empty";
      } else if (!emailRegex.test(value)) {
        newErr[name] = "Email is not valid";
      } else {
        newErr[name] = "";
      }
      break;

    case "website":
      const urlRegex = /^(https?:\/\/)?([\w\d-]+\.){1,}[\w\d-]+(\/.+)?$/;
      if (value === "") {
        newErr[name] = "Website cannot be empty";
      } else if (!urlRegex.test(value)) {
        newErr[name] = "Website URL is not valid";
      } else {
        newErr[name] = "";
      }
      break;

    case "phone":
      const phoneRegex = /^[0-9]{10,15}$/;
      if (value === "") {
        newErr[name] = "Phone number cannot be empty";
      } else if (!phoneRegex.test(value)) {
        newErr[name] = "Phone number is not valid";
      } else {
        newErr[name] = "";
      }
      break;

    case "facebook":
    case "twitter":
    case "googlePlus":
    case "instagram":
      if (value && !urlRegex.test(value)) {
        newErr[name] = "Social media URL is not valid";
      } else {
        newErr[name] = "";
      }
      break;

    case "featuredImage":
      if (value === "" || value === null) {
        newErr[name] = "Featured image cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "logo":
      if (value === "" || value === null) {
        newErr[name] = "Logo cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;
    default:
      break;
  }

  return newErr;
};
