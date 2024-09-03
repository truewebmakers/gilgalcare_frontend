import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const incrementShares = async (id) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await UseApi(
      apiUrls.incrementShares + id,
      apiMethods.POST,
      null,
      headers
    );
    const result = response?.data;
    return { result, status: true };
  } catch (err) {
    return { err, status: false };
  }
};
