import * as actionTypes from "../../actionType/dashboard/profileActionType";
import * as logoutTypes from "../../actionType/logoutActionType";

interface ProfileState {
  user: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

const profileReducer = (state = initialState, action: any): ProfileState => {
  switch (action.type) {
    case actionTypes.PROFILE_REQUEST:
      return { ...state, isLoading: true, error: null };
    case actionTypes.PROFILE_SUCCESS:
      // This replaces your entire user object with the fully hydrated data
      return { ...state, isLoading: false, user: action.payload, error: null };
    case actionTypes.PROFILE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case logoutTypes.LOGOUT_SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default profileReducer;
