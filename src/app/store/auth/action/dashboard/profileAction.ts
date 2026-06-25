import { showToast } from "../../../../../components/common/toastMessage";
import Axiotance from "../../../../confiq/Axiostance";
import * as actionTypes from "../../actionType/dashboard/profileActionType";

export const getFullUserProfile = () => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.PROFILE_REQUEST });

    const jwtToken = localStorage.getItem("jwtToken");

    const res = await Axiotance.get("/FintechUsers/profile-data", {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    // res.data now contains the complete user object including nested relations
    dispatch({ type: actionTypes.PROFILE_SUCCESS, payload: res.data });

    return res.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || "Failed to load profile.";
    dispatch({ type: actionTypes.PROFILE_FAILURE, payload: errorMessage });

    // Optional: Only show toast if it's a critical error
    return null;
  }
};
