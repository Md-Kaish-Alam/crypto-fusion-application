import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Logo = () => {
  return (
    <div className="text-3xl flex justify-center items-center gap-1">
      <Avatar className="h-10 w-10">
        <AvatarImage src="./logo.svg" />
        <AvatarFallback>CF</AvatarFallback>
      </Avatar>
      <div>
        <span className="bg-gradient-to-r from-white to-sky-700 bg-clip-text text-transparent">
          Crypto Fusion
        </span>
      </div>
    </div>
  );
}

export default Logo
