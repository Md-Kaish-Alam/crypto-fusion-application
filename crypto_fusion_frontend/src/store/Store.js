import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import authReducer from "./Auth/AuthReducer";
import coinReducer from "./Coin/CoinReducer";
import walletReducer from "./Wallet/WalletReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  wallet: walletReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
