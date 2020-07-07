import React, { createContext, useReducer } from 'react';
import Logger from 'use-reducer-logger';
import { STORAGE_KEY } from '../const';
import {
  SET_LOADING,
  UPDATE_STATE,
  UPDATE_CORONAVIRUS_DATA,
  UPDATE_CORONAVIRUS_SETTING,
  UPDATE_LOCAL_STORAGE,
  UPDATE_SPLASH_LOGO,
} from './types';
import posts from '../posts';
import { deepClone } from '../utils';

const initialState = {
  coronavirus: {
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
    settings: {
      selectedCountries: ['usa'],
    },
  },
  localStorage: { introViewed: false },
  jottingPad: {
    posts: posts,
    settings: {},
  },
  splashLogo: { started: false, playing: false, finished: true },
  language: 'en',
};

const reducer = (state, action) => {
  const newState = deepClone(state);

  switch (action.type) {
    case SET_LOADING:
      newState[action.key].loading = action.payload;
      break;
    case UPDATE_STATE:
      newState[action.key] = action.payload;
      break;
    case UPDATE_CORONAVIRUS_DATA:
      if (action.key) {
        newState.coronavirus[action.key] = action.payload;
      } else {
        newState.coronavirus = { ...newState.coronavirus, ...action.payload };
      }
      break;
    case UPDATE_CORONAVIRUS_SETTING:
      newState.coronavirus.settings[action.key] = action.payload;
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
      if (action.payload === 'start') {
        newState.splashLogo = {
          ...newState.splashLogo,
          started: true,
          playing: true,
        };
      } else if (action.payload === 'finish') {
        newState.splashLogo = {
          started: false,
          playing: false,
          finished: true,
        };
      }
      break;
    default:
      throw new Error('Did not find match for reducer action');
  }

  return newState;
};

const AppStore = ({ children }) => {
  const appReducer = process.env.NODE_ENV === 'development' ? Logger(reducer) : reducer;
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export const AppContext = createContext(initialState);

export default AppStore;
