import {
  Home,
  Wallet,
  LogOut,
  Landmark,
  Bookmark,
  CreditCard,
  LayoutDashboard,
  PersonStanding,
  ActivityIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { logout } from "@/store/Auth/AuthAction";

const menu = [
  {
    name: "Home",
    path: "/",
    icon: <Home className="h-6 w-6" />,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <Bookmark className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityIcon className="h-6 w-6" />,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <Landmark className="h-6 w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonStanding className="h-6 w-6" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogOut className="h-6 w-6" />,
    className: "bg-red-600 hover:bg-red-700",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="mt-2 space-y-5">
      {menu.map((item, idx) => (
        <div key={idx}>
          <SheetClose className="w-full">
            <Button
              variant="outline"
              className={cn(
                "flex items-center justify-start p-6 w-full",
                item.className ? item.className : ""
              )}
              onClick={() => {
                if (item.name === "Logout") {
                  handleLogout();
                  navigate("/");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <span className="w-8">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
