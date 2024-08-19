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

  // Define regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.){1,}[\w\d-]+(\/.+)?$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  switch (name) {
    case "listingTitle":
      newErr[name] =
        value === ""
          ? "Listing title cannot be empty"
          : value?.length < 5
          ? "Listing title is too short"
          : "";
      break;

    case "listingDiscription":
      newErr[name] =
        value === ""
          ? "Listing description cannot be empty"
          : value?.length < 20
          ? "Listing description is too short"
          : "";
      break;

    case "categoryId":
      newErr[name] = value === "" ? "Category cannot be empty" : "";
      break;

    case "tagline":
      newErr[name] = value === "" ? "Tagline cannot be empty" : "";
      break;

    case "status":
      newErr[name] = value === "" ? "Choose status" : "";
      break;

    case "priceRange":
      newErr[name] = value === "" ? "Price range cannot be empty" : "";
      break;

    case "priceFrom":
      newErr[name] = value <= 0 ? "Price from cannot be negative" : "";
      break;

    case "priceTo":
      newErr[name] =
        value <= 0
          ? "Price to cannot be negative"
          : value < basicInfo2?.priceFrom
          ? "Price to cannot be less than price from"
          : "";
      break;

    case "featuresInformation":
      // If featuresInformation is required, ensure it's not empty
      newErr[name] = value ? "" : "Features information cannot be empty";
      break;

    case "location":
      newErr[name] = value === "" ? "Location cannot be empty" : "";
      break;

    case "address":
      newErr[name] = value === "" ? "Address cannot be empty" : "";
      break;

    case "mapLat":
      newErr[name] =
        value === ""
          ? "Latitude cannot be empty"
          : isNaN(value)
          ? "Latitude must be a number"
          : "";
      break;

    case "mapLong":
      newErr[name] =
        value === ""
          ? "Longitude cannot be empty"
          : isNaN(value)
          ? "Longitude must be a number"
          : "";
      break;

    case "email":
      newErr[name] =
        value === ""
          ? "Email cannot be empty"
          : !emailRegex.test(value)
          ? "Email is not valid"
          : "";
      break;

    case "website":
      newErr[name] =
        value === ""
          ? "Website cannot be empty"
          : !urlRegex.test(value)
          ? "Website URL is not valid"
          : "";
      break;

    case "phone":
      newErr[name] =
        value === ""
          ? "Phone number cannot be empty"
          : !phoneRegex.test(value)
          ? "Phone number is not valid"
          : "";
      break;

    case "facebook":
    case "twitter":
    case "googlePlus":
    case "instagram":
      newErr[name] =
        value && !urlRegex.test(value) ? "Social media URL is not valid" : "";
      break;

    case "featuredImage":
      newErr[name] =
        value === "" || value === null ? "Featured image cannot be empty" : "";
      break;

    case "logo":
      newErr[name] =
        value === "" || value === null ? "Logo cannot be empty" : "";
      break;

    default:
      break;
  }

  return newErr;
};
