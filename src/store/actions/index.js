import CovidApi from "../../api/CovidApi";
import WikipediaApi from "../../api/WikipediaApi";
import { WIKI_GET_TYPES } from "../../const";
import { STORE_KEYS } from "../../store";
import { deepClone } from "../../utils/deepClone";
import { convertCovidHistoricalData } from "../../utils/dataHandlers";
import {
  SET_LOADING,
  UPDATE_CORONAVIRUS_DATA,
  UPDATE_CORONAVIRUS_SETTING,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SPLASH_LOGO,
  UPDATE_STORE,
} from "../types";

const C19Api = new CovidApi();
const WikiApi = new WikipediaApi();

export const getWikipediaData = async (month, date, year, dispatch) => {
  Promise.all(
    Object.values(WIKI_GET_TYPES).map(async (getType) => {
      return await WikiApi.get(getType, month, date, year);
    })
  ).then((response) => {
    // Returns list of unique years from events, births, and deaths data.
    const years = Object.values(WIKI_GET_TYPES)
      .map((getType, i) => response[i][getType].map((item) => item.year))
      .flat()
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const payload = {
      date: response[0].date,
      wikipedia: response[0].wikipedia,
      events: response[0].events,
      births: response[1].births,
      deaths: response[2].deaths,
      years,
    };
    dispatch(updateStore(STORE_KEYS.BACKWARDS_CLOCK, "wikiData", payload));
  });
};

export const fetchInitialCovidData = async (appState, dispatch) => {
  const { selectedCountries } = appState.coronavirus.controlPanel;
  const getInitialHistoryData = selectedCountries.map(async (country) => {
    return await C19Api.getHistory(country);
  });

  Promise.all([
    await C19Api.getListOfCountries(),
    await C19Api.getStatistics(),
    await C19Api.getCountries(),
    ...getInitialHistoryData,
  ]).then((resp) => {
    const mapCountries = resp[0];
    const statistics = resp[1];
    const countries = resp[2];
    const lastFetched = statistics[0].day;

    const history = convertCovidHistoricalData(
      appState.coronavirus.history,
      resp.slice(3)
    );

    const payload = {
      countries,
      history,
      mapCountries,
      statistics,
      lastFetched,
    };
    dispatch(updateCoronavirusData(null, payload));
  });
};

export const fetchCovidHistoryData = (
  currentHistoryData,
  arrayOfCountries,
  dispatch
) => {
  dispatch(setLoading("coronavirus", true));
  const newHistoryData = deepClone(currentHistoryData);
  const promises = [];

  // scrubs array of countries in which we already have data for.
  arrayOfCountries.forEach((country) => {
    const needsData = !currentHistoryData._retrievedCountries.includes(country);
    if (needsData) {
      promises.push(C19Api.getHistory(country));
    }
  });

  Promise.all(promises).then((responses) => {
    const payload = convertCovidHistoricalData(newHistoryData, responses);
    dispatch(updateCoronavirusData("history", payload));
    dispatch(setLoading("coronavirus", false));
  });
};

export const setLoading = (key, payload) => {
  return { type: SET_LOADING, key, payload };
};

export const updateCoronavirusData = (key, payload) => {
  return { type: UPDATE_CORONAVIRUS_DATA, key, payload };
};

export const updateCoronavirusSettings = (key, payload) => {
  return { type: UPDATE_CORONAVIRUS_SETTING, key, payload };
};

export const updateLocalStorage = (key, payload) => {
  return { type: UPDATE_LOCAL_STORAGE, key, payload };
};

export const updateSplashLogo = (payload) => {
  return { type: UPDATE_SPLASH_LOGO, payload };
};

export const updateStore = (outerKey, innerKey, payload) => {
  return { type: UPDATE_STORE, outerKey, innerKey, payload };
};
