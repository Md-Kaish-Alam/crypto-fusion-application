import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import authReducer from "./Auth/AuthReducer";
import coinReducer from "./Coin/CoinReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
