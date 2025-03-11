import { useEffect, useState } from "react";
import { Dot, MessageCircle, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import StockChart from "./StockChart";
import AssetsTable from "./AssetsTable";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue);
      setInputValue("");
    }
  };

  const handleIsTyping = () => {
    setIsTyping(true);
  };

  useEffect(() => {
    handleIsTyping();
  }, []);

  return (
    <div className="relative">
      <div className="lg:flex h-[100vh]">
        {/* left panel */}
        <div className="lg:w-[50%] lg:border-r px-2 overflow-y-auto max-h-[100vh] scroll-container">
          <div className="p-3 flex items-center gap-4">
            <Button
              variant={category == "all" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategory("all")}
            >
              All
            </Button>
            <Button
              variant={category == "top50" ? "default" : "outline"}
              onClick={() => setCategory("top50")}
              className="rounded-full"
            >
              Top 50
            </Button>
            <Button
              variant={category == "topGainers" ? "default" : "outline"}
              onClick={() => setCategory("topGainers")}
              className="rounded-full"
            >
              Top Gainers
            </Button>
            <Button
              variant={category == "topLosers" ? "default" : "outline"}
              onClick={() => setCategory("topLosers")}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          <AssetsTable />
        </div>

        {/* right panel */}
        <div className="hidden lg:block lg:w-[50%] p-5 fixed right-0 top-16 h-[100vh] overflow-hidden">
          <StockChart />

          {/* Coin details */}
          <div className="flex items-center gap-5">
            <div>
              <Avatar>
                <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>BTC</p>
                <Dot className="text-muted-foreground" />
                <p className="text-muted-foreground">Bitcoin</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">$86424</p>
                <p className="text-red-600">
                  <span>-38341779668.75586</span>
                  <span>(-2.18831%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chat bot section */}
      <section className="fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRelease ? (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Ask anything here...</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsBotRelease(!isBotRelease)}
              >
                <X />
              </Button>
            </div>
            <div className="h-[76%] flex flex-col overflow-y-auto gap-1 px-5 py-2 scroll-container">
              <div className="self-start pb-5 w-auto text-sm">
                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                  <p className="whitespace-pre-line">
                    Hello there!👋 <br /> I&apos;m your personal AI assistant 😎
                    Ask me anything about{" "}
                    <span className="font-semibold">
                      Cryptocurrencies, Stock Market, Trending Assets, or
                      Investment Tips.
                    </span>{" "}
                    <br />
                    I&apos;m here to help you 24/7 🚀 <br />
                    Go ahead and ask me anything! 👉
                  </p>
                </div>
              </div>

              {[1, 1].map((_, idx) => (
                <div
                  key={idx}
                  className={` ${
                    idx % 2 == 0 ? "self-start" : "self-end"
                  } pb-5 w-auto text-sm`}
                >
                  {idx % 2 == 0 ? (
                    <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>Hello, Kaish How can I help you.</p>
                    </div>
                  ) : (
                    <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>Hii, I&apos;ts me Kaish.</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="animate-bounce bg-gray-300 w-1 h-1 rounded-full"></div>
                  <div className="animate-bounce bg-gray-300 w-1 h-1 rounded-full delay-100"></div>
                  <div className="animate-bounce bg-gray-300 w-1 h-1 rounded-full delay-200"></div>
                </div>
              )}
            </div>
            {/* Question Input */}
            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full border-none outline-none focus-visible:outline-none focus-visible:ring-0 focus:shadow-md focus:shadow-blue-500/50"
                placeholder="Type your question here..."
                onChange={handleInputChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        ) : null}

        <div className="relative">
          <Button
            onClick={() => setIsBotRelease(!isBotRelease)}
            className="w-[3.5rem] h-[3.5rem] rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_#2563eb] hover:scale-[1.1]"
          >
            <MessageCircle className="fill-background -rotate-90 stroke-none scale-[1.8]" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
