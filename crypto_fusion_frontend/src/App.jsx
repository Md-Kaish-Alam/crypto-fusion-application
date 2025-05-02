import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Auth from "@/page/Auth/Auth";
import Home from "@/page/Home/Home";
import Wallet from "@/page/Wallet/Wallet";
import Navbar from "@/page/Navbar/Navbar";
import Profile from "@/page/Profile/Profile";
import { getUser } from "@/store/Auth/AuthAction";
import SearchCoin from "@/page/Search/SearchCoin";
import Portfolio from "@/page/Portfolio/Portfolio";
import Watchlist from "@/page/Watchlist/Watchlist";
import Acitivity from "@/page/Acitivity/Acitivity";
import TwoFactorAuth from "@/page/Auth/TwoFactorAuth";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import WithdrawalAdmin from "@/page/Admin/WithdrawalAdmin";
import PageNotFound from "@/page/PageNotFound/PageNotFound";
import StockDetails from "@/page/StockDetails/StockDetails";
import PaymentDetails from "@/page/PaymentDetails/PaymentDetails";
import ResetPasswordForm from "@/page/Auth/ForgotPassword/ResetPasswordForm";
import PasswordUpdateSuccess from "@/page/Auth/ForgotPassword/PasswordUpdateSuccess";

const App = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

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
            {auth.user?.role == "ROLE_ADMIN" && (
              <Route element={<WithdrawalAdmin />} path="/admin/withdrawal" />
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route element={<Auth />} path="/" />
            <Route element={<Auth />} path="/signup" />
            <Route element={<Auth />} path="/signin" />
            <Route element={<Auth />} path="/forgot-password" />
            <Route
              element={<ResetPasswordForm />}
              path="/reset-password/:session"
            />
            <Route
              element={<PasswordUpdateSuccess />}
              path="/password-update-successfully"
            />
            <Route
              element={<TwoFactorAuth />}
              path="/two-factor-auth/:session"
            />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
