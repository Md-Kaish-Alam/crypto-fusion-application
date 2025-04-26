import api from "@/config/api";
import * as orderActionTypes from "./OrderActionTypes";

export const payOrder =
  ({ jwt, orderData, amount }) =>
  async (dispatch) => {
    dispatch({ type: orderActionTypes.PAY_ORDER_REQUEST });

    try {
      const response = await api.post("/api/orders/pay", orderData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: orderActionTypes.PAY_ORDER_SUCCESS,
        payload: response.data.data,
        amount,
      });
    } catch (error) {
      dispatch({
        type: orderActionTypes.PAY_ORDER_FAILURE,
        error: error.message,
      });
    }
  };

export const getOrderById = (jwt, orderId) => async (dispatch) => {
  dispatch({ type: orderActionTypes.GET_ORDER_REQUEST });

  try {
    const response = await api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: orderActionTypes.GET_ORDER_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.GET_ORDER_FAILURE,
      error: error.message,
    });
  }
};

export const getAllOrdersForUser =
  ({ jwt, orderType, assetSymbol }) =>
  async (dispatch) => {
    dispatch({ type: orderActionTypes.GET_ALL_ORDERS_REQUEST });
    try {
      const response = await api.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          order_type: orderType,
          asset_symbol: assetSymbol,
        },
      });
      dispatch({
        type: orderActionTypes.GET_ALL_ORDERS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: orderActionTypes.GET_ALL_ORDERS_FAILURE,
        error: error.message,
      });
    }
  };
