import api from "@/config/api";
import * as watchlistActionTypes from "./WatchlistActionTypes";

export const getUserWatchlist = (jwt) => async (dispatch) => {
  dispatch({ type: watchlistActionTypes.GET_USER_WATCHLIST_REQUEST });

  try {
    const response = await api.get("/api/watchlist/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: watchlistActionTypes.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: watchlistActionTypes.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

export const addItemToWatchlist =
  ({ jwt, coinId }) =>
  async (dispatch) => {
    dispatch({ type: watchlistActionTypes.ADD_COIN_TO_WATCHLIST_REQUEST });

    try {
      const response = await api.patch(`/api/watchlist/add/coin/${coinId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: watchlistActionTypes.ADD_COIN_TO_WATCHLIST_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: watchlistActionTypes.ADD_COIN_TO_WATCHLIST_FAILURE,
        error: error.message,
      });
    }
  };

export const removeItemFromWatchlist = ({ jwt, coinId }) => async (dispatch) => {
  dispatch({ type: watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_REQUEST });

  try {
    const response = await api.patch(`/api/watchlist/remove/coin/${coinId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};