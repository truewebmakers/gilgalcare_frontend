import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const getPlanById = async (token, id) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const response = await UseApi(
      apiUrls.getPlansById + id,
      apiMethods.GET,
      null,
      headers
    );
    return response?.data;
  } catch (err) {
    return err;
  }
};
