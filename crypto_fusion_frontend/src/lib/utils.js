import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateStripePaymentId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const maskAccountNumber = (accountNumber) => {
  if (typeof accountNumber !== "string") {
    return "";
  }

  if (accountNumber.length > 4) {
    const lastFourDigits = accountNumber.slice(-4);
    const maskedDigits = "*".repeat(accountNumber.length - 4);
    return maskedDigits + lastFourDigits;
  } else {
    return accountNumber;
  }
};

export const readableDate = (dateString) => {
  // Parse the input string to create a Date object
  const date = new Date(dateString);

  // Format the date components
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // Construct the formatted date string
  const formattedDate = `${year}/${month}/${day} `;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { date: formattedDate, time: formattedTime };
};

export const readableTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // omitting second option
    hour12: false,
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const existInWatchlist = (items, coin) => {
  for (let item of items) {
    if (item?.id === coin?.id) return true;
  }
  return false;
};

export const calculateProfite = (order) => {
  if (
    order &&
    order.orderItem &&
    order.orderItem.buyPrice &&
    order.orderItem.sellPrice
  ) {
    return order.orderItem.sellPrice - order.orderItem.buyPrice;
  }
  return "-";
};

export function shouldShowNavbar(currentPath, routes, userRole) {
  if (!userRole) userRole = "ROLE_USER";
  const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");
  return routes.some(
    (route) =>
      (route.role === userRole || userRole == "ROLE_ADMIN") &&
      pathToRegex(route.path).test(currentPath)
  );
}
