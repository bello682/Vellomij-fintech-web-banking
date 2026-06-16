// logoutAction.ts
import { showToast } from "../../../../components/common/toastMessage";
import Axiotance from "../../../confiq/Axiostance";
import * as actionTypes from "../actionType/logoutActionType";

export const logoutUser = () => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });

    // 1. Get the token BEFORE you delete it
    const jwtToken = localStorage.getItem("jwtToken");

    // 2. Make the API call WITH the token manually
    await Axiotance.post(
      "/FintechUsers/logout",
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    ).catch(() => {
      // Silence background errors so the interceptor doesn't trip
      console.log("Server already cleared or silent error.");
    });
  } catch (err) {
    console.log("Logout request failed");
  } finally {
    // 3. ALWAYS clear storage LAST
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("hasSeenOnboarding");

    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    showToast("success", "Logged out successfully");
  }
};
