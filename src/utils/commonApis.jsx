import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const getProfile = async (user) => {
  try {
    if (user?.token) {
      // set headers
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };
      // Call signup API
      const response = await UseApi(
        apiUrls.getProfile + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        const data = response?.data?.user;
        return data;
      }
    }
  } catch (err) {
    customToast.error(err?.message);
  }
};

export const logoutHandler = async (user) => {
  try {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    const response = await UseApi(
      apiUrls.logout,
      apiMethods.POST,
      null,
      headers
    );
    if (response?.status === 200 || response?.status === 201) {
      customToast.success("Logged out");
      localStorage.clear();
      sessionStorage.clear();
      return true;
    }
  } catch (error) {
    customToast.error("Error in logging out");
    return false;
  }
};

export const fetchAllCategories = async (setCategories = () => {}) => {
  try {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const response = await UseApi(
        apiUrls.getAllCategoriesPublic,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.data) {
        setCategories(response.data);
        localStorage.setItem("categories", JSON.stringify(response?.data));
      }
    }
  } catch (err) {
    return err;
  }
};

export const getCategoryNameById = (id) => {
  let categories = localStorage.getItem("categories");
  if (!categories?.length) {
    fetchAllCategories();
  } else {
    const category = JSON.parse(categories)?.find(
      (category) => category?.id == id
    );
    return category ? category?.name : "-";
  }
};

export const getCountries = async (setCountryList) => {
  try {
    const response = await fetch("/location.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response?.json();
    const formattedArray = data?.map((location, index) => ({
      id: index + 1,
      name: location?.suburb, // Assuming 'name' is a property in your JSON
    }));

    setCountryList(formattedArray);
    sessionStorage.setItem("countries", JSON.stringify(formattedArray));
  } catch (error) {
    // customToast.error("Error fetching countries: " + error.message);
  }
};
