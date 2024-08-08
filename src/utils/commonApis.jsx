import { customToast } from "../components/common/Toast";
import { apiMethods, apiUrls } from "../constants/constant";
import UseApi from "../hooks/useApi";

export const getProfile = async (user) => {
    try {
        if (user?.token) {
            // set headers
            const headers = {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user?.token}`,
            };
            // Call signup API
            const response = await UseApi(
                apiUrls.getProfile + user?.userInfo?.id,
                apiMethods.GET,
                null,
                headers
            );
            if (response?.status == 200 || response?.status == 201) {
                const data = response?.data?.user
                return data
            }
        }

    } catch (err) {
        customToast.error(err?.message);
    }
}

export const logoutHandler = async (user) => {
    try {
        const headers = {
            Authorization: `Bearer ${user.token}`,
        };
        const response = await UseApi(
            apiUrls.logout,
            apiMethods.POST,
            null,
            headers
        );
        if (response?.status === 200 || response?.status === 201) {
            customToast.success("Logged out");
            localStorage.clear();
            sessionStorage.clear();
            return true
        }
    } catch (error) {
        customToast.error("Error in logging out");
        return false;
    }
};