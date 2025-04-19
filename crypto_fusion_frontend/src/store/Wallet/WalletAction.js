import api from "@/config/api";
import * as walletActionTypes from "./WalletActionTypes";

export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: walletActionTypes.GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get("/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: walletActionTypes.GET_USER_WALLET_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: walletActionTypes.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

export const getWalletTransactions =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: walletActionTypes.GET_WALLET_TRANSACTION_REQUEST });

    try {
      const response = await api.get("/api/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: walletActionTypes.GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: walletActionTypes.GET_WALLET_TRANSACTION_FAILURE,
        error: error.message,
      });
    }
  };

export const depositMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatch) => {
    dispatch({ type: walletActionTypes.DEPOSIT_MONEY_REQUEST });
    try {
      const response = await api.put(`/api/wallet/deposit`, null, {
        params: {
          order_id: orderId,
          payment_id: paymentId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: walletActionTypes.DEPOSIT_MONEY_SUCCESS,
        payload: response.data.data,
      });
      navigate("/wallet");
    } catch (error) {
      dispatch({
        type: walletActionTypes.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {
    dispatch({ type: walletActionTypes.DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.post(
        `/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      window.location.href = response.data.paymentUrl;
    } catch (error) {
      dispatch({
        type: walletActionTypes.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatch) => {
    dispatch({ type: walletActionTypes.TRANSFER_MONEY_REQUEST });

    try {
      const response = await api.put(
        `/api/wallet/${walletId}/transfer`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: walletActionTypes.TRANSFER_MONEY_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: walletActionTypes.TRANSFER_MONEY_FAILURE,
        error: error.message,
      });
    }
  };
