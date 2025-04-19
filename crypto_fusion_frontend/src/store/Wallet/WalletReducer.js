import * as walletActionTypes from "./WalletActionTypes";

const initialState = {
  userWallet: {},
  loading: false,
  error: null,
  transactions: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case walletActionTypes.GET_USER_WALLET_REQUEST:
    case walletActionTypes.DEPOSIT_MONEY_REQUEST:
    case walletActionTypes.TRANSFER_MONEY_REQUEST:
    case walletActionTypes.GET_WALLET_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case walletActionTypes.GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };

    case walletActionTypes.GET_USER_WALLET_SUCCESS:
    case walletActionTypes.TRANSFER_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };
    case walletActionTypes.DEPOSIT_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };
    case walletActionTypes.GET_USER_WALLET_FAILURE:
    case walletActionTypes.DEPOSIT_MONEY_FAILURE:
    case walletActionTypes.TRANSFER_MONEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default walletReducer;
