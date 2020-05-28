import React, { createContext, useReducer } from 'react';
import constants from '../app/constants';

export const SET_SPLASH_LOGO_START = 'SET_SPLASH_LOGO_START';
export const SET_SPLASH_LOGO_FINISH = 'SET_SPLASH_LOGO_FINISH';
export const SET_CORONAVIRUS_DATA = 'SET_CORONAVIRUS_DATA';
export const SET_CORONAVIRUS_SETTING = 'SET_CORONAVIRUS_SETTING';
export const LOAD_LOCAL_STORAGE = 'LOAD_LOCAL_STORAGE';
export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';

const initialState = {
  coronavirus: {
    data: {
      countries: [],
      history: [],
      statistics: [],
    },
    loaded: false,
    settings: {
      showCountries: {},
    },
  },
  localStorage: {
    allowLocalStorage: true,
    viewedIntro: false,
  },
  splashLogo: {
    started: false,
    playing: false,
    finished: true,
  },
};

const appReducer = (state, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_CORONAVIRUS_DATA:
      newState.coronavirus = {
        ...newState.coronavirus,
        data: {
          countries: action.payload[0],
          history: action.payload[1],
          statistics: action.payload[2],
        },
        loaded: true,
      };
      // set default country show states
      action.payload[0].forEach((country) => {
        newState.coronavirus.settings.showCountries[country] = true;
      });
      return newState;

    case SET_CORONAVIRUS_SETTING:
      newState.coronavirus.settings.showCountries[action.country] = action.checked;
      return newState;

    case SET_SPLASH_LOGO_START:
      newState.splashLogo = {
        ...newState.splashLogo,
        started: true,
        playing: true,
      };
      return newState;

    case SET_SPLASH_LOGO_FINISH:
      newState.splashLogo = {
        started: false,
        playing: false,
        finished: true,
      };
      return newState;

    case LOAD_LOCAL_STORAGE:
      newState.localStorage = action.payload;
      return newState;

    case UPDATE_LOCAL_STORAGE:
      newState.localStorage = {
        ...newState.localStorage,
        ...action.payload,
      };

      if (newState.localStorage.allowLocalStorage) {
        localStorage.setItem(constants.storageKey, JSON.stringify(newState.localStorage));
      }

      return newState;

    default:
      throw new Error();
  }
};

const AppStore = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export const AppContext = createContext(initialState);

export default AppStore;
