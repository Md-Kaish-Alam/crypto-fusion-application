import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import authReducer from "./Auth/AuthReducer";
import coinReducer from "./Coin/CoinReducer";
import orderReducer from "./Order/OrderReducer";
import assetReducer from "./Asset/AssetReducer";
import walletReducer from "./Wallet/WalletReducer";
import watchlistReducer from "./Watchlist/WatchlistReducer";
import withdrawalReducer from "./Withdrawal/WithdrawalReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  order: orderReducer,
  asset: assetReducer,
  wallet: walletReducer,
  watchlist: watchlistReducer,
  withdrawal: withdrawalReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
