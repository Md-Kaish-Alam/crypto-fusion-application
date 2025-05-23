import axios from "axios";
import * as coinActionTypes from "./CoinActionTypes";
import api, { API_BASE_URL } from "@/config/api";

export const fetchCoinList = (page) => async (dispatch) => {
  dispatch({ type: coinActionTypes.FETCH_COIN_LIST_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
    const coins = response.data.data;
    dispatch({
      type: coinActionTypes.FETCH_COIN_LIST_SUCCESS,
      payload: coins,
    });
  } catch (error) {
    dispatch({
      type: coinActionTypes.FETCH_COIN_LIST_FAILURE,
      payload: error.message,
    });
  }
};

export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: coinActionTypes.FETCH_TOP_50_COINS_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/top50`);
    const coins = response.data.data;
    dispatch({
      type: coinActionTypes.FETCH_TOP_50_COINS_SUCCESS,
      payload: coins,
    });
  } catch (error) {
    dispatch({
      type: coinActionTypes.FETCH_TOP_50_COINS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchTradingCoinList = () => async (dispatch) => {
  dispatch({ type: coinActionTypes.FETCH_TRADING_COINS_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/trading`);
    dispatch({
      type: coinActionTypes.FETCH_TRADING_COINS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: coinActionTypes.FETCH_TRADING_COINS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    dispatch({ type: coinActionTypes.FETCH_MARKET_CHART_REQUEST });
    try {
      const response = await api.get(
        `/coins/${coinId}/market-chart?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const marketChart = response.data.data;
      dispatch({
        type: coinActionTypes.FETCH_MARKET_CHART_SUCCESS,
        payload: marketChart,
      });
    } catch (error) {
      dispatch({
        type: coinActionTypes.FETCH_MARKET_CHART_FAILURE,
        payload: error.message,
      });
    }
  };

export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: coinActionTypes.FETCH_COIN_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
    const coinDetails = response.data.data;
    dispatch({
      type: coinActionTypes.FETCH_COIN_BY_ID_SUCCESS,
      payload: coinDetails,
    });
  } catch (error) {
    dispatch({
      type: coinActionTypes.FETCH_COIN_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchCoinDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: coinActionTypes.FETCH_COIN_DETAILS_REQUEST });
    try {
      const response = await api.get(`/coins/details/${coinId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const coinDetails = response.data.data;
      dispatch({
        type: coinActionTypes.FETCH_COIN_DETAILS_SUCCESS,
        payload: coinDetails,
      });
    } catch (error) {
      dispatch({
        type: coinActionTypes.FETCH_COIN_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };

export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: coinActionTypes.SEARCH_COIN_REQUEST });
  try {
    const response = await api.get(`/coins/search?query=${keyword}`);
    dispatch({
      type: coinActionTypes.SEARCH_COIN_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: coinActionTypes.SEARCH_COIN_FAILURE,
      payload: error.message,
    });
  }
};
