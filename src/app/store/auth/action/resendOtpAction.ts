import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../confiq/Axiostance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/resendOtpActionType";

export const resendOtpUser =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: actionTypes.OTP_RESEND_REQUEST });

      const formattedEmail = email.toLowerCase().trim();

      const res = await Axiotance.post("/FintechUsers/resend-otp", {
        email: formattedEmail,
      });

      dispatch({
        type: actionTypes.OTP_RESEND_SUCCESS,
        payload: res.data,
      });

      // Web implementation: localStorage is synchronous
      const token = res.data?.token;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("jwtToken", token);
      }

      // for testing purpose
      if (res.data.otp) {
        localStorage.setItem("dev_otp", res.data.otp);
      }

      showToast("success", res.data?.message || "OTP sent successfully.");
      return res;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Network Error, please try again!";

      dispatch({
        type: actionTypes.OTP_RESEND_FAILURE,
        payload: errorMessage,
      });

      showToast("error", errorMessage);
      throw err;
    }
  };
