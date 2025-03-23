import { useLocation, useNavigate } from "react-router-dom";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

import SignUpForm from "./SignUp/SignUpForm";
import SignInForm from "./SignIn/SignInForm";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-screen relative authContainer">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">
        <div className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-xl z-50 bg-blue-900 bg-opacity-10 shadow-2xl shadow-sky-600 px-10">
          <Logo />
          {location.pathname === "/signup" ? (
            <section className="mt-10 w-full">
              <SignUpForm />
              <div className="flex items-center justify-center gap-2 mt-2">
                <span>Have already account ?</span>
                <Button variant="link" className="p-0" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
              </div>
            </section>
          ) : location.pathname === "/forgot-password" ? (
            <section className="mt-10 w-full">
              <ForgotPasswordForm />
              <div className="flex items-center justify-center gap-2 mt-2">
                <span>Want back to sign in ?</span>
                <Button variant="link" className="p-0" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
              </div>
            </section>
          ) : (
            <section className="mt-10 w-full">
              <SignInForm />
              <div className="flex items-center justify-center gap-2 mt-2">
                <span>Don&apos;t have an account ?</span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
