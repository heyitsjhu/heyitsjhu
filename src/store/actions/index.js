import CovidApi from '../../api/CovidApi';
import {
  SET_LOADING,
  UPDATE_CORONAVIRUS_DATA,
  UPDATE_CORONAVIRUS_SETTING,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SPLASH_LOGO,
} from '../types';
import { deepClone } from '../../utils';
import { convertCovidHistoricalData } from '../../utils/dataHandlers';

const C19Api = new CovidApi();

export const fetchInitialCovidData = async (appState, dispatch) => {
  const { selectedCountries } = appState.coronavirus.settings;

  Promise.all([
    await C19Api.getListOfCountries(),
    await C19Api.getStatistics(),
    await C19Api.getHistory(selectedCountries[0]),
    await C19Api.getCountries(),
  ]).then((resp) => {
    const mapCountries = resp[0];
    const statistics = resp[1];
    const lastFetched = statistics[0].day;
    const history = convertCovidHistoricalData(appState.coronavirus.history, [resp[2]]);
    const countries = resp[3];

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

export const fetchCovidHistoryData = (currentHistoryData, arrayOfCountries, dispatch) => {
  dispatch(setLoading('coronavirus', true));
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
    dispatch(updateCoronavirusData('history', payload));
    dispatch(setLoading('coronavirus', false));
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
