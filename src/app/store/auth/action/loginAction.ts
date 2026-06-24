import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../confiq/Axiostance";
import * as actionTypes from "../actionType/loginActionType";

export const loginUser = (credentials: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    const res = await Axiotance.post("/FintechUsers/login", credentials, {
      timeout: 30000,
    });

    const userData = res.data;
    if (userData.token) {
      // Swapped AsyncStorage for localStorage
      localStorage.setItem("jwtToken", userData.token);

      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: userData });

      showToast("success", userData.message || "Welcome back!");
      return res;
    }
  } catch (err: any) {
    let errorMessage = err.response?.data?.message;

    if (!errorMessage && err.response?.status === 401) {
      errorMessage = "Invalid email or password.";
    }

    if (!err.response) {
      errorMessage = "Network error. Please check your internet connection.";
    }

    if (!errorMessage) {
      errorMessage = "Something went wrong. Please try again later.";
    }

    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: errorMessage });

    showToast("error", errorMessage);

    return Promise.reject(err);
  }
};
