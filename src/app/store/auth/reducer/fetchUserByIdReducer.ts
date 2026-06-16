// userReducer.js
import * as actionTypes from "../actionType/fetchUserByIdActionType";

// 1. Define the interface for the action
interface Action {
  type: string;
  payload?: any; // Using 'any' for payload is common in simple reducers, or you can be more specific
}

// 2. Define the interface for your state
interface UserState {
  profile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const FetchUserReducer = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case actionTypes.FETCH_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FetchUserReducer;
