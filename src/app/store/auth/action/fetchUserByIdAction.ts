// fetchUserByIdAction.js
import axios from "axios";
import * as actionTypes from "../actionType/fetchUserByIdActionType";
import { showToast } from "../../../../components/common/toastMessage";
import { Dispatch } from "redux";

// Define the shape of your error object
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const fetchUserById = (userID: string) => async (dispatch: Dispatch) => {
  if (!userID) {
    dispatch({
      type: actionTypes.FETCH_USER_BY_ID_FAILURE,
      payload: "Invalid user ID",
    });
    return;
  }
  try {
    dispatch({ type: actionTypes.FETCH_USER_BY_ID_REQUEST });

    // Make the request to fetch user by ID
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/user/${userID}`,
    );

    dispatch({
      type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
      payload: res?.data, // Assuming the user data is in `data.data`
    });
  } catch (err: unknown) {
    const error = err as AxiosErrorResponse; // Cast to your interface
    const errorMessage = error.response?.data?.message || "Error fetching user";
    // Dispatch failure action with error message from server response
    dispatch({
      type: actionTypes.FETCH_USER_BY_ID_FAILURE,
      payload: errorMessage,
    });

    // Show error toast message after failed user fetch
    showToast("error", errorMessage);
  }
};
