import api from "@/config/api";
import * as assetActionTypes from "./AssetActionTypes";

// Action Creators
export const getAssetById =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: assetActionTypes.GET_ASSET_REQUEST });

    try {
      const response = await api.get(`/api/asset/${assetId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: assetActionTypes.GET_ASSET_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: assetActionTypes.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: assetActionTypes.GET_ASSET_DETAILS_REQUEST });

    try {
      const response = await api.get(`/api/asset/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: assetActionTypes.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: assetActionTypes.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

export const getUserAssets = (jwt) => async (dispatch) => {
  dispatch({ type: assetActionTypes.GET_USER_ASSETS_REQUEST });

  try {
    const response = await api.get("/api/asset", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: assetActionTypes.GET_USER_ASSETS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: assetActionTypes.GET_USER_ASSETS_FAILURE,
      error: error.message,
    });
  }
};
``;
