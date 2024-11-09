import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const editPlanService = async (payload, token, id) => {
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
      apiUrls.editPlans + id,
      apiMethods.POST,
      bodyData,
      headers
    );

    if (response?.status === 200 || response?.status === 201) {
      customToast.success(response?.data?.message);
      return { successEditStatus: true };
    } else {
      customToast.error(response?.data?.message || "Something went wrong");
      return { successEditStatus: false };
    }
  } catch (err) {
    customToast.error(err?.message || "An error occurred");
    return { successEditStatus: false };
  }
};
