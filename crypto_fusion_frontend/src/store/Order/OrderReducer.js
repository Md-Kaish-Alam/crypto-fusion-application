import * as orderActionTypes from "./OrderActionTypes";

const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActionTypes.PAY_ORDER_REQUEST:
    case orderActionTypes.GET_ORDER_REQUEST:
    case orderActionTypes.GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case orderActionTypes.PAY_ORDER_SUCCESS:
    case orderActionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };
    case orderActionTypes.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case orderActionTypes.PAY_ORDER_FAILURE:
    case orderActionTypes.GET_ORDER_FAILURE:
    case orderActionTypes.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default orderReducer;
