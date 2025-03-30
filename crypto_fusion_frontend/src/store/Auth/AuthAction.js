import axios from "axios";
import * as authActionTypes from "./AuthActionTypes";

const API_BASE_URL = "http://localhost:8088";

// user register action
export const register = (userData) => async (dispatch) => {
  dispatch({ type: authActionTypes.REGISTER_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData.data
    );
    const user = response.data;

    if (user.data.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      userData.navigate("/");
    }

    dispatch({
      type: authActionTypes.REGISTER_SUCCESS,
      payload: user.data.jwt,
    });
  } catch (error) {
    dispatch({
      type: authActionTypes.REGISTER_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

// user login action
export const login = (userData) => async (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data
    );
    const user = response.data;

    // TODO: handle two factor authentication
    if (user.data.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      userData.navigate("/");
    }

    dispatch({ type: authActionTypes.LOGIN_SUCCESS, payload: user.data.jwt });
  } catch (error) {
    dispatch({
      type: authActionTypes.LOGIN_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

// user logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: authActionTypes.LOGOUT });
};

// get user from jwt token
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: authActionTypes.GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;

    dispatch({ type: authActionTypes.GET_USER_SUCCESS, payload: user.data });
  } catch (error) {
    const errorMessage = null;
    dispatch({ type: authActionTypes.GET_USER_FAILURE, payload: errorMessage });
  }
};
