import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const fetchAvailability = async (
  setAvailability = () => {},
  id,
  token,
  setEnabledDays = () => {}
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await UseApi(
      apiUrls.getUserAvailability + id,
      apiMethods.GET,
      null,
      headers
    );
    if (response?.status === 200) {
      const fetchedData = response?.data?.data;

      const transformedAvailability = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
      const transformedEnabledDays = {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      };

      fetchedData?.forEach((item) => {
        const day = item?.day;
        transformedEnabledDays[day] = item?.is_enabled === 1;

        transformedAvailability[day]?.push({
          start: item?.start_time,
          end: item?.end_time,
          isEnabled: item?.is_enabled,
        });
      });

      Object.keys(transformedAvailability)?.forEach((day) => {
        if (transformedAvailability[day]?.length === 0) {
          transformedAvailability[day]?.push({
            start: "",
            end: "",
            isEnabled: "",
          });
        }
      });
      setAvailability(transformedAvailability);
      setEnabledDays(transformedEnabledDays);
    } else {
      customToast.error("Failed to fetch availability.");
    }
  } catch (error) {
    customToast.error("An error occurred while fetching availability.");
  }
};
