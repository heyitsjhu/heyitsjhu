import React, { createContext, useReducer } from "react";
import ReducerLogger from "use-reducer-logger";
import { ANCHOR_DATE, STORAGE_KEY } from "../const";
import {
  SET_LOADING,
  UPDATE_STORE,
  UPDATE_CORONAVIRUS_DATA,
  UPDATE_CORONAVIRUS_SETTING,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SPLASH_LOGO,
} from "./types";
import posts from "../posts";
import { deepClone } from "../utils/deepClone";
import { getBackwardsDate } from "../helpers";

export const STORE_KEYS = {
  BACKWARDS_CLOCK: "backwardsClock",
  CORONAVIRUS: "coronavirus",
  LOCAL_STORAGE: "localStorage",
  JOTTING_PAD: "jottingPad",
  SPLASH_LOGO: "splashLogo",
  LANGUAGE: "language",
};

const initialState = {
  [STORE_KEYS.LANGUAGE]: "en",
  [STORE_KEYS.BACKWARDS_CLOCK]: {
    dateToday: new Date(),
    dateAnchor: new Date(ANCHOR_DATE),
    dateBackwards: getBackwardsDate(new Date(), new Date(ANCHOR_DATE)),
    wikiData: null,
  },
  [STORE_KEYS.CORONAVIRUS]: {
    countries: [],
    history: {
      casesNew: [],
      cases1MPop: [],
      casesActive: [],
      casesCritical: [],
      casesRecovered: [],
      casesTotal: [],
      deathsNew: [],
      deaths1MPop: [],
      deathsTotal: [],
      tests1MPop: [],
      testsTotal: [],
      population: [],
      _retrievedCountries: [],
    },
    mapCountries: [],
    statistics: [],
    lastFetched: null,
    loading: false,
    controlPanel: {
      chartMetric: "casesNew",
      countriesToFetch: [],
      selectedCountries: ["USA", "Brazil", "Italy", "S-Korea", "Spain"],
      showGlobalTotals: false,
    },
  },
  [STORE_KEYS.LOCAL_STORAGE]: { introViewed: false },
  [STORE_KEYS.JOTTING_PAD]: {
    activeTag: "all",
    posts: posts,
    tags: ["all", "tag1", "tag2", "tag3"],
  },
  [STORE_KEYS.SPLASH_LOGO]: { started: false, playing: false, finished: false },
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case SET_LOADING:
      newState[action.key].loading = action.payload;
      break;
    case UPDATE_STORE:
      if (!action.outerKey || !action.innerKey) return state;
      newState[action.outerKey] = {
        ...newState[action.outerKey],
        [action.innerKey]: action.payload,
      };
      break;
    case UPDATE_CORONAVIRUS_DATA:
      if (action.key) {
        newState.coronavirus[action.key] = action.payload;
      } else {
        newState.coronavirus = { ...newState.coronavirus, ...action.payload };
      }
      break;
    case UPDATE_CORONAVIRUS_SETTING:
      newState.coronavirus.controlPanel[action.key] = action.payload;
      break;
    case UPDATE_LOCAL_STORAGE:
      if (action.key) {
        newState.localStorage[action.key] = action.payload;
      } else {
        newState.localStorage = action.payload;
      }
      // update client's local storage object
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.localStorage));
      break;
    case UPDATE_SPLASH_LOGO:
      if (action.payload === "start") {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: true,
          playing: true,
        };
      } else if (action.payload === "finish") {
        newState.splashLogo = {
          started: false,
          playing: false,
          finished: true,
        };
      }
      break;
    default:
      throw new Error("Did not find match for reducer action");
  }

  return newState;
};

const AppStore = ({ children }) => {
  const appReducer =
    process.env.NODE_ENV === "development" ? ReducerLogger(reducer) : reducer;
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext(initialState);

export default AppStore;
