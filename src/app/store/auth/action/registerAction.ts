import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../confiq/Axiostance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/registerActionType";

export const register = (userData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: actionTypes.REGISTRATION_REQUEST });

    // Axiotance handles the BaseURL automatically from your config
    const res = await Axiotance.post("/FintechUsers/register", userData);

    dispatch({
      type: actionTypes.REGISTRATION_SUCCESS,
      payload: res.data,
    });

    // 1. Prioritize saving the token if returned upon registration
    const token = res.data?.token;
    if (token) {
      // Replaced AsyncStorage with localStorage
      localStorage.setItem("jwtToken", token);
    }
    // for testing purpose
    if (res.data.otp) {
      localStorage.setItem("dev_otp", res.data.otp);
      console.log("OTP saved to localStorage:", res.data.otp);
    }

    // 2. Use the exact success message from your Backend
    showToast("success", res.data?.message || "Registration successful!");

    // 3. Save the registration email for later use (e.g., OTP verification)
    if (res.data) {
      localStorage.setItem("registrationEmail", userData.email.toLowerCase());
    }

    return res;
  } catch (err: any) {
    // 3. Extract the Backend Error Message
    const errorMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Network Error, please check your connection.";

    dispatch({
      type: actionTypes.REGISTRATION_FAILURE,
      payload: errorMessage,
    });

    // 4. Show the specific backend error in the toast
    showToast("error", errorMessage);

    throw err;
  }
};
