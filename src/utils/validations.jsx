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
      } else if (!passwordRegex.test(value)) {
        newErr[name] =
          "Your password must be at least 8 characters long including a lowercase letter, an uppercase letter,a number and a special symbol";
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