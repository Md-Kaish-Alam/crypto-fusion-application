import api from "@/config/api";
import * as withdrawalActionTypes from "./WithdrawalActionTypes";

export const withdrawalRequest =
  ({ amount, jwt }) =>
  async (dispatch) => {
    dispatch({ type: withdrawalActionTypes.WITHDRAWAL_REQUEST });
    try {
      const response = await api.post(`/api/withdrawal/${amount}`, null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch({
        type: withdrawalActionTypes.WITHDRAWAL_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: withdrawalActionTypes.WITHDRAWAL_FAILURE,
        payload: error.message,
      });
    }
  };

export const proceedWithdrawal =
  ({ id, jwt, accept }) =>
  async (dispatch) => {
    dispatch({ type: withdrawalActionTypes.WITHDRAWAL_PROCEED_REQUEST });
    try {
      const response = await api.patch(
        `/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      dispatch({
        type: withdrawalActionTypes.WITHDRAWAL_PROCEED_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: withdrawalActionTypes.WITHDRAWAL_PROCEED_FAILURE,
        payload: error.message,
      });
    }
  };

export const getWithdrawalHistory = (jwt) => async (dispatch) => {
  dispatch({ type: withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_REQUEST });
  try {
    const response = await api.get("/api/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllWithdrawalRequest = (jwt) => async (dispatch) => {
  dispatch({ type: withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_REQUEST });
  try {
    const response = await api.get("/api/admin/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_FAILURE,
      payload: error.message,
    });
  }
};

export const addPaymentDetails =
  ({ paymentDetails, jwt }) =>
  async (dispatch) => {
    dispatch({ type: withdrawalActionTypes.ADD_PAYMENT_DETAILS_REQUEST });
    try {
      const response = await api.post(`/api/payment-details`, paymentDetails, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({
        type: withdrawalActionTypes.ADD_PAYMENT_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: withdrawalActionTypes.ADD_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };

export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: withdrawalActionTypes.GET_PAYMENT_DETAILS_REQUEST });
    try {
      const response = await api.get(`/api/payment-details`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({
        type: withdrawalActionTypes.GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: withdrawalActionTypes.GET_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
