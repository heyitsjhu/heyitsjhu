export const ANCHOR_DATE = "2020-07-10 0:00:00";
export const BIG_NUMBER_PREFIXES = [
  { number: 1e3, suffix: "K" },
  { number: 1e6, suffix: "M" },
  { number: 1e9, suffix: "B" },
  { number: 1e12, suffix: "T" },
];
export const CLOCK_FORMAT = "MMMM Do YYYY, h:mm:ss a";
export const CLOCK_UPDATE_INTERVAL = 40;
export const CLOCK_TICK_INTERVAL = 1000;
export const DEFAULT_POST_COVER_IMAGE = "https:///placehold.it/800x300";
export const DATE_FORMAT = "MMMM Do YYYY";
export const LINKS = {
  GITHUB: "https://github.com/heyitsjhu/heyitsjhu",
};
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const PAGE_LAYOUT_FADE_TIMEOUT = 2400;
export const ROUTES = {
  HOME: "/",
  BACKWARDS_CLOCK: "/backwards-clock",
  CANDLEMONKEYS: "/candle-monkeys",
  CORONAVIRUS: "/coronavirus",
  DREAMISTLABS: "/dreamistlabs",
  JHUM: "/jhu-m",
  JOTTINGPAD: "/jottingpad",
  JOTTINGPAD_POST: "/jottingpad/:postId",
  JOTTINGPAD_TAGS: "/jottingpad/tags?tag=:tagId",
  NOTFOUND: "/page-not-found",
  PHOTOGRAPHY: "/photography",
  POWERED_BY_SCROLL: "/powered-by-scroll",
  PROFILE: "/profile",
  PROJECT_NOLOCIMES: "/project-nolocimes",
};
export const STORE_KEYS = {
  BACKWARDS_CLOCK: "backwardsClock",
  CORONAVIRUS: "coronavirus",
  LOCAL_STORAGE: "localStorage",
  JOTTING_PAD: "jottingPad",
  SPLASH_LOGO: "splashLogo",
  LANGUAGE: "language",
};
export const STORAGE_KEY = "dl_heyitsjhu";
export const WIKI_GET_TYPES = {
  EVENTS: "events",
  BIRTHS: "births",
  DEATHS: "deaths",
};
