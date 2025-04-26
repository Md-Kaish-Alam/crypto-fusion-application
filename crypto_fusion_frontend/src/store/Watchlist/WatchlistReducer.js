import { existInWatchlist } from "@/lib/utils";
import * as watchlistActionTypes from "./WatchlistActionTypes";

const initialState = {
  watchlist: null,
  loading: false,
  error: null,
  items: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case watchlistActionTypes.GET_USER_WATCHLIST_REQUEST:
    case watchlistActionTypes.ADD_COIN_TO_WATCHLIST_REQUEST:
    case watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case watchlistActionTypes.GET_USER_WATCHLIST_SUCCESS:
      return {
        ...state,
        watchlist: action.payload,
        items: action.payload.coin,
        loading: false,
        error: null,
      };

    case watchlistActionTypes.ADD_COIN_TO_WATCHLIST_SUCCESS: {
      let updatedItems = existInWatchlist(state.items, action.payload)
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [action.payload, ...state.items];
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    }
    case watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_SUCCESS: {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    }
    case watchlistActionTypes.GET_USER_WATCHLIST_FAILURE:
    case watchlistActionTypes.ADD_COIN_TO_WATCHLIST_FAILURE:
    case watchlistActionTypes.REMOVE_COIN_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
