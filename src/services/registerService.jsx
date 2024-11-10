import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";
import { customToast } from "../components/common/Toast";

export const registerService = async (signupData) => {
  try {
    const bodyData = {
      name: signupData?.name,
      email: signupData?.email,
      password: signupData?.passwordInput,
      user_type: signupData?.user_type,
    };
    const response = await UseApi(apiUrls.signup, apiMethods.POST, bodyData);
    if (response?.status == 200 || response?.status == 201) {
      customToast.success(response?.data?.message);
      return { successStatus: true, data: response?.data };
    } else {
      customToast.error(response?.data?.message);
    }
  } catch (err) {
    customToast.error(err?.message);
    return { successStatus: false };
  } finally {
  }
};
