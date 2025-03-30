import { useSelector } from "react-redux";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Sidebar from "./Sidebar";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  return (
    <div className="px-6 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11"
            >
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-r-0 flex flex-col justify-center"
          >
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <p
          onClick={() => navigate("/")}
          className="text-3xl bg-gradient-to-r from-white to-sky-700 bg-clip-text text-transparent cursor-pointer"
        >
          Crypto Fusion
        </p>

        <div className="p-0 ml-9">
          <Button
            variant="outline"
            className="flex items-center gap-3"
            onClick={() => navigate("/search")}
          >
            <Search className="left-2 top-3" />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div>
        <Avatar className="cursor-pointer" onClick={() => navigate("/profile")}>
          <AvatarFallback>
            {auth.user?.fullName
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
