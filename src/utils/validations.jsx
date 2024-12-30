import { customToast } from "../components/common/Toast";

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

export const addPlanValidation = (name, value) => {
  let newErr = {};

  switch (name) {
    case "name":
      if (value === "") {
        newErr[name] = "Plan name cannot be empty";
      } else if (value.length < 3) {
        newErr[name] = "Plan name is too short";
      } else {
        newErr[name] = "";
      }
      break;

    case "term":
      if (value === "") {
        newErr[name] = "Term cannot be empty";
      } else {
        newErr[name] = "";
      }
      break;

    case "price":
      if (value === "") {
        newErr[name] = "Price cannot be empty";
      } else if (isNaN(value) || Number(value) <= 0) {
        newErr[name] = "Price must be a positive number";
      } else {
        newErr[name] = "";
      }
      break;

    case "features":
      // Check if at least one feature is selected
      if (Object.values(value).every((feature) => feature === false)) {
        newErr[name] = "At least one feature must be selected";
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
    case "listing_title":
      newErr[name] =
        value === ""
          ? "Listing title cannot be empty"
          : value?.length < 5
          ? "Listing title is too short"
          : "";
      break;

    case "listingDescription":
      newErr[name] =
        value === ""
          ? "Listing description cannot be empty"
          : value?.length < 20
          ? "Listing description is too short"
          : "";
      break;

    case "categoryId":
      newErr[name] = value?.length == 0 ? "Category cannot be empty" : "";
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
      newErr[name] = value <= 0 ? "Price from should be greater than 0" : "";
      break;

    case "priceTo":
      newErr[name] =
        value <= 0
          ? "Price to should be greater than 0"
          : value < basicInfo2?.priceFrom
          ? "Price to cannot be less than price from"
          : "";
      break;

    case "featuresInformation":
      // If featuresInformation is required, ensure it's not empty
      newErr[name] = value ? "" : "Features information cannot be empty";
      break;

    // case "location":
    //   newErr[name] = value === "" ? "Location cannot be empty" : "";
    //   break;

    case "address":
      newErr[name] = value === "" ? "Address cannot be empty" : "";
      break;

    case "mapLat":
      newErr[name] =
        value === "" || value == null ? "Latitude cannot be empty" : "";
      break;

    case "mapLong":
      newErr[name] =
        value === "" || value == null ? "Longitude cannot be empty" : "";
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

      // case "facebook":
      //   newErr[name] =
      //     value === ""
      //       ? "Facebook cannot be empty"
      //       : !urlRegex.test(value)
      //       ? "Facebook URL is not valid (eg. https://fb.com)"
      //       : "";
      //   break;
      // case "twitter":
      //   newErr[name] =
      //     value === ""
      //       ? "Twitter cannot be empty"
      //       : !urlRegex.test(value)
      //       ? "Twitter URL is not valid (eg. https://twitter.com)"
      //       : "";
      //   break;
      // case "googlePlus":
      //   newErr[name] =
      //     value === ""
      //       ? "Google+ cannot be empty"
      //       : !urlRegex.test(value)
      //       ? "Google+ URL is not valid (eg. https://google.com)"
      //       : "";
      //   break;
      // case "instagram":
      newErr[name] =
        value === ""
          ? "Instagram cannot be empty"
          : !urlRegex.test(value)
          ? "Instagram URL is not valid (eg. https://instagram.com)"
          : "";
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

export const isTimeDifferenceValid = (availability, enabledDays) => {
  for (const day in availability) {
    if (enabledDays[day]) {
      for (const time of availability[day]) {
        const startTime = new Date(`1970-01-01T${time.start}:00`);
        const endTime = new Date(`1970-01-01T${time.end}:00`);
        const differenceInHours = (endTime - startTime) / (1000 * 60 * 60);

        if (!time?.start || !time?.end || differenceInHours < 2) {
          customToast.error(
            `The difference b/w ${day}'s start time & end time should be at least 2 hours.`
          );
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }
};
