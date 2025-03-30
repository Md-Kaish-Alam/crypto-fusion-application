import * as authActionTypes from "./AuthActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER_REQUEST:
    case authActionTypes.LOGIN_REQUEST:
    case authActionTypes.GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case authActionTypes.REGISTER_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case authActionTypes.LOGIN_TWO_STEP_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case authActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        fetchingUser: false,
      };

    case authActionTypes.LOGIN_FAILURE:
    case authActionTypes.REGISTER_FAILURE:
    case authActionTypes.GET_USER_FAILURE:
    case authActionTypes.LOGIN_TWO_STEP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case authActionTypes.LOGOUT:
      return initialState;

    case authActionTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case authActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload },
        error: null,
      };

    case authActionTypes.UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
