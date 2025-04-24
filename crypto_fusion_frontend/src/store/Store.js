import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import authReducer from "./Auth/AuthReducer";
import coinReducer from "./Coin/CoinReducer";
import walletReducer from "./Wallet/WalletReducer";
import withdrawalReducer from "./Withdrawal/WithdrawalReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  wallet: walletReducer,
  withdrawal: withdrawalReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
