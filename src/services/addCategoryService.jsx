import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const addCategoryService = async (addCategory, token, uploadPic) => {
  try {
    // set headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    // set body
    const bodyData = {
      name: addCategory?.name,
      status: addCategory?.status,
      details: addCategory?.details,
      location: addCategory?.location,
      feature_image: uploadPic,
    };
    // Call signup API
    const response = await UseApi(
      apiUrls.addCategory,
      apiMethods.POST,
      bodyData,
      headers
    );
    if (response?.status == 200 || response?.status == 201) {
      customToast.success(response?.data?.message);
      return { sucessStatus: true };
    } else {
      customToast.error(response?.data?.message);
    }
  } catch (err) {
    customToast.error(err?.message);
    return { sucessStatus: false };
  } finally {
  }
};
