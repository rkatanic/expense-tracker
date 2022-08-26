import { Category } from "../types/Transaction";

export const getCookie = (name: string) => {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");

  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == name) {
      return unescape(y);
    }
  }
};

export const getCategoryColor = (category: any): string => {
  switch (category) {
    case Category.INCOME:
      return "bg-emerald-500";
    case Category.FOOD_AND_DRINKS:
      return "bg-sky-500";
    case Category.ELECTRICITY:
      return "bg-indigo-500";
    case Category.MEDICINE:
      return "bg-lime-500";
    case Category.INTERNET:
      return "bg-pink-500";
    case Category.TELEPHONE:
      return "bg-red-500";
    case Category.HOUSING:
      return "bg-orange-500";
    case Category.FUEL:
      return "bg-zinc-700 dark:bg-white";
    case Category.TECH:
      return "bg-yellow-500";
    case Category.OTHER:
      return "bg-zinc-400";
    default:
      return "bg-zinc-400";
  }
};
