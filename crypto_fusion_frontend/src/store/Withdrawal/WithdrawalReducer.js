import * as withdrawalActionTypes from "./WithdrawalActionTypes";

const initialState = {
  withdrawal: null,
  history: [],
  loading: false,
  error: null,
  PaymentDetails: null,
  requests: [],
};

const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case withdrawalActionTypes.WITHDRAWAL_REQUEST:
    case withdrawalActionTypes.WITHDRAWAL_PROCEED_REQUEST:
    case withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_REQUEST:
    case withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case withdrawalActionTypes.WITHDRAWAL_SUCCESS:
      return {
        ...state,
        withdrawal: action.payload,
        loading: false,
        error: null,
      };
    case withdrawalActionTypes.ADD_PAYMENT_DETAILS_SUCCESS:
    case withdrawalActionTypes.GET_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        paymentDetails: action.payload,
        loading: false,
        error: null,
      };
    case withdrawalActionTypes.WITHDRAWAL_PROCEED_SUCCESS:
      return {
        ...state,
        requests: state.requests.map((item) =>
          item.id == action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
    case withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
        loading: false,
        error: null,
      };

    case withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        requests: action.payload,
        loading: false,
        error: null,
      };
    case withdrawalActionTypes.WITHDRAWAL_FAILURE:
    case withdrawalActionTypes.WITHDRAWAL_PROCEED_FAILURE:
    case withdrawalActionTypes.GET_WITHDRAWAL_HISTORY_FAILURE:
    case withdrawalActionTypes.GET_WITHDRAWAL_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default withdrawalReducer;