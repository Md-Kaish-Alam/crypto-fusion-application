import * as assetActionTypes from "./AssetActionTypes";

const initialState = {
  asset: null,
  userAssets: [],
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case assetActionTypes.GET_ASSET_REQUEST:
    case assetActionTypes.GET_USER_ASSETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case assetActionTypes.GET_ASSET_SUCCESS:
      return {
        ...state,
        asset: action.payload,
        loading: false,
        error: null,
      };
    case assetActionTypes.GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        assetDetails: action.payload,
        loading: false,
        error: null,
      };
    case assetActionTypes.GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        userAssets: action.payload,
        loading: false,
        error: null,
      };
    case assetActionTypes.GET_ASSET_FAILURE:
    case assetActionTypes.GET_USER_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default assetReducer;
