import Axiotance from "../../../confiq/Axiostance";
import { showToast } from "../../../../components/common/toastMessage"; // For showing toast notifications
import * as actionTypes from "../actionType/deleteUserActionType";

// src/store/auth/action/deleteUserAction.ts

export const deleteUserAccount = (userID: string) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });

    const jwtToken = localStorage.getItem("jwtToken");

    // This hits the new Soft Delete endpoint
    const res = await Axiotance.delete(`/FintechUsers/user/${userID}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    // CLEAR REDUX AND STORAGE
    dispatch({ type: actionTypes.DELETE_USER_SUCCESS });
    dispatch({ type: "LOGOUT" }); // Trigger a global logout action

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");

    showToast("success", "Account closed successfully.");
    console.log("DEACTIVATION OF USER:", res.data);

    return true;
  } catch (err: any) {
    dispatch({
      type: actionTypes.DELETE_USER_FAILURE,
      payload: err.response?.data?.message || "Error",
    });
    return false;
  }
};
