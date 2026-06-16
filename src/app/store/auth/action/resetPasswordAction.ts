import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../confiq/Axiostance";
import { AppDispatch } from "../../../store/auth/store";
import * as actionTypes from "../actionType/resertPasswordActionType";

export const resetPassword =
  (token: string, newPassword: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });

      const res = await Axiotance.post(
        `/FintechUsers/reset-password/${token}`,
        { newPassword },
      );

      dispatch({
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        payload: res.data.message,
      });

      showToast("success", res.data.message);
      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to reset password.";
      dispatch({
        type: actionTypes.RESET_PASSWORD_FAIL,
        payload: errorMessage,
      });
      showToast("error", errorMessage);
      return false;
    }
  };
