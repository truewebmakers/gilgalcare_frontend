import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const generateImageLinkService = async (token, imgUrl, setIsLoading) => {
  // Prepare headers
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  // FormData setup
  const formData = new FormData();
  formData.append("image", imgUrl);

  try {
    setIsLoading(true);
    // Call API using UseApi hook
    const response = await UseApi(
      apiUrls.generateTempImageUrl,
      apiMethods.POST,
      formData,
      headers
    );
    if (response?.status === 200 || response?.status === 201) {
      customToast.success(response?.data?.message);
      return response?.data;
    } else {
      customToast.error(response?.data?.message || "An error occurred.");
      return null;
    }
  } catch (err) {
    customToast.error(err?.message || "An unexpected error occurred.");
    return null;
  } finally {
    setIsLoading(false);
  }
};
