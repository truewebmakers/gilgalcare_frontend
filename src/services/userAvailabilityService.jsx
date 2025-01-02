import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const addUserAvailabilityService = async (
  listingId,
  token,
  availability,
  enabledDays
) => {
  const formattedAvailability = {};
  Object.keys(availability).forEach((day) => {
    formattedAvailability[day] = {
      is_enabled: enabledDays[day],
      times: availability[day]
        .filter((time) => time.start && time.end)
        .map((time) => ({
          start_time: time.start,
          end_time: time.end,
        })),
    };
  });

  const bodyData = {
    listing_id: listingId,
    availability: formattedAvailability,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await UseApi(
      apiUrls.userAvailability,
      apiMethods.POST,
      bodyData,
      headers
    );
    if (response?.status === 200 || response?.status === 201) {
      customToast.success("Availability updated successfully!");
      return true;
    } else {
      customToast.error(
        response?.data?.message || "Failed to update availability."
      );
      return false;
    }
  } catch (error) {
    customToast.error("An error occurred while updating availability.");
    return false;
  }
};
