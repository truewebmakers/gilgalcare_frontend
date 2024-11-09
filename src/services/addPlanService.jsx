import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const addPlanService = async (payload, token) => {
  try {
    // Prepare the bodyData for the API
    const bodyData = {
      name: payload?.name,
      term: payload?.term,
      price: payload?.price,
      features: Object.entries(payload.features)
        .filter(([_, selected]) => selected)
        .reduce((obj, [key, _]) => {
          obj[`features['${key}']`] = true;
          return obj;
        }, {}),
    };

    // Set headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Call the API to add the plan
    const response = await UseApi(
      apiUrls.addPlans,
      apiMethods.POST,
      bodyData,
      headers
    );

    if (response?.status === 200 || response?.status === 201) {
      customToast.success(response?.data?.message);
      return { successStatus: true };
    } else {
      customToast.error(response?.data?.message || "Something went wrong");
      return { successStatus: false };
    }
  } catch (err) {
    customToast.error(err?.message || "An error occurred");
    return { successStatus: false };
  }
};
