import axios from "axios";
import * as authActionTypes from "./AuthActionTypes";
import api, { API_BASE_URL } from "@/config/api";

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
    console.log("user", user.data.twoFactorAuthEnabled);
    if (user.data.twoFactorAuthEnabled) {
      userData.navigate(`/two-factor-auth/${user.data.session}`);
    }

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
export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: authActionTypes.LOGOUT });
  navigate("/");
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

// AuthAction.js
export const updateUserProfile = (userData, token) => async (dispatch) => {
  dispatch({ type: authActionTypes.UPDATE_USER_REQUEST });
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/users/profile/update-details`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedUser = response.data;
    dispatch({
      type: authActionTypes.UPDATE_USER_SUCCESS,
      payload: updatedUser.data,
    });
  } catch (error) {
    dispatch({
      type: authActionTypes.UPDATE_USER_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

export const twoStepVerification =
  ({ otp, session, navigate }) =>
  async (dispatch) => {
    dispatch({ type: authActionTypes.LOGIN_TWO_STEP_REQUEST });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/two-factor/otp/${otp}`,
        {},
        {
          params: { id: session },
        }
      );
      const user = response.data;

      if (user.data.jwt) {
        localStorage.setItem("jwt", user.data.jwt);
        navigate("/");
      }
      dispatch({
        type: authActionTypes.LOGIN_TWO_STEP_SUCCESS,
        payload: user.data.jwt,
      });
    } catch (error) {
      dispatch({
        type: authActionTypes.LOGIN_TWO_STEP_FAILURE,
        payload: error.response?.data ? error.response.data : error,
      });
    }
  };

export const sendVerificationOtp = ({ jwt, verificationType }) => {
  return async (dispatch) => {
    dispatch({ type: authActionTypes.SEND_VERIFICATION_OTP_REQUEST });
    try {
      const response = await api.post(
        `/api/users/verification/${verificationType}/send-otp`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      dispatch({
        type: authActionTypes.SEND_VERIFICATION_OTP_SUCCESS,
        payload: user,
      });
      console.log("send otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: authActionTypes.SEND_VERIFICATION_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const verifyOtp = ({ jwt, otp }) => {
  console.log("jwt", jwt);
  return async (dispatch) => {
    dispatch({ type: authActionTypes.VERIFY_OTP_REQUEST });
    try {
      const response = await api.patch(
        `/api/users/verification/verify-otp/${otp}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      dispatch({ type: authActionTypes.VERIFY_OTP_SUCCESS, payload: user });
      console.log("verify otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: authActionTypes.VERIFY_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const enableTwoStepAuthentication = ({ jwt, otp }) => {
  return async (dispatch) => {
    dispatch({ type: authActionTypes.ENABLE_TWO_STEP_AUTHENTICATION_REQUEST });
    try {
      const response = await api.patch(
        `/api/users/enable-two-factor/verify-otp/${otp}`,
        {}, // optional request body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      dispatch({
        type: authActionTypes.ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
        payload: user,
      });
      console.log("enable two step authentication ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: authActionTypes.ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const sendResetPassowrdOTP = ({
  sendTo,
  verificationType,
  navigate,
}) => {
  console.log("send otp ", sendTo);
  return async (dispatch) => {
    dispatch({ type: authActionTypes.SEND_RESET_PASSWORD_OTP_REQUEST });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/users/reset-password/send-otp`,
        {
          sendTo,
          verificationType,
        }
      );
      const user = response.data;
      navigate(`/reset-password/${user.data.session}`);
      dispatch({
        type: authActionTypes.SEND_RESET_PASSWORD_OTP_SUCCESS,
        payload: user,
      });
      console.log("otp sent successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: authActionTypes.SEND_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const verifyResetPassowrdOTP = ({
  otp,
  password,
  session,
  navigate,
}) => {
  return async (dispatch) => {
    dispatch({ type: authActionTypes.VERIFY_RESET_PASSWORD_OTP_REQUEST });
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/auth/users/reset-password/verify-otp`,
        {
          otp,
          password,
        },
        {
          params: {
            id: session,
          },
        }
      );
      const user = response.data;
      dispatch({
        type: authActionTypes.VERIFY_RESET_PASSWORD_OTP_SUCCESS,
        payload: user,
      });
      navigate("/password-update-successfully");
      console.log("VERIFY otp successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: authActionTypes.VERIFY_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};
