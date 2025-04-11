import * as coinActionTypes from "./CoinActionTypes";

const initialState = {
  coinList: [],
  top50: [],
  searchCoinList: [],
  marketChart: { data: [], loading: false },
  coinById: null,
  coinDetails: null,
  loading: false,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case coinActionTypes.FETCH_COIN_LIST_REQUEST:
    case coinActionTypes.FETCH_COIN_BY_ID_REQUEST:
    case coinActionTypes.FETCH_COIN_DETAILS_REQUEST:
    case coinActionTypes.SEARCH_COIN_REQUEST:
    case coinActionTypes.FETCH_TOP_50_COINS_REQUEST:
      return { ...state, loading: true, error: null };

    case coinActionTypes.FETCH_MARKET_CHART_REQUEST:
      return {
        ...state,
        marketChart: { loading: true, data: [] },
        error: null,
      };
    case coinActionTypes.FETCH_COIN_LIST_SUCCESS:
      return {
        ...state,
        coinList: action.payload,
        loading: false,
        error: null,
      };

    case coinActionTypes.FETCH_TOP_50_COINS_SUCCESS:
      return {
        ...state,
        top50: action.payload,
        loading: false,
        error: null,
      };
    case coinActionTypes.FETCH_MARKET_CHART_SUCCESS:
      return {
        ...state,
        marketChart: { data: action.payload.prices, loading: false },
        error: null,
      };
    case coinActionTypes.FETCH_COIN_BY_ID_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload,
        loading: false,
        error: null,
      };
    case coinActionTypes.SEARCH_COIN_SUCCESS:
      return {
        ...state,
        searchCoinList: action.payload.coins,
        loading: false,
        error: null,
      };
    case coinActionTypes.FETCH_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload,
        loading: false,
        error: null,
      };

    case coinActionTypes.FETCH_MARKET_CHART_FAILURE:
      return {
        ...state,
        marketChart: { loading: false, data: [] },
        error: null,
      };
    case coinActionTypes.FETCH_COIN_LIST_FAILURE:
    case coinActionTypes.SEARCH_COIN_FAILURE:
    case coinActionTypes.FETCH_COIN_BY_ID_FAILURE:
    case coinActionTypes.FETCH_COIN_DETAILS_FAILURE:
    case coinActionTypes.FETCH_TOP_50_COINS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default coinReducer;
