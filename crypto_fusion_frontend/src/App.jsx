import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Auth from "@/page/Auth/Auth";
import Home from "@/page/Home/Home";
import Wallet from "@/page/Wallet/Wallet";
import Navbar from "@/page/Navbar/Navbar";
import Profile from "@/page/Profile/Profile";
import SearchCoin from "@/page/Search/SearchCoin";
import Portfolio from "@/page/Portfolio/Portfolio";
import Watchlist from "@/page/Watchlist/Watchlist";
import Acitivity from "@/page/Acitivity/Acitivity";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import PageNotFound from "@/page/PageNotFound/PageNotFound";
import StockDetails from "@/page/StockDetails/StockDetails";
import PaymentDetails from "@/page/PaymentDetails/PaymentDetails";
import { getUser } from "@/store/Auth/AuthAction";

const App = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt, dispatch]);
  return (
    <>
      {auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="/activity" element={<Acitivity />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
