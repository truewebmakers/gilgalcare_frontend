import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const fetchCategories = async (token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const response = await UseApi(
      apiUrls.getAllCategoriesList,
      apiMethods.GET,
      null,
      headers
    );
    return response?.data;
  } catch (err) {
    return err;
  }
};
