import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import classnames from 'classnames';

import constants from './app/constants';
import {
  Breadcrumbs,
  Footer,
  Header,
  HomeLogoNavigation,
  ParticleCanvas,
  SplashLogo,
} from './components';
import AppRoutes from './routes';
import {
  AppContext,
  LOAD_LOCAL_STORAGE,
  SET_SPLASH_LOGO_FINISH,
  UPDATE_LOCAL_STORAGE,
} from './store';
import * as Utils from './utils';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

const App = () => {
  const [appState, dispatch] = useContext(AppContext);
  const classes = useStyles();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    localStorage.removeItem(constants.storageKey);
    const payload = JSON.parse(localStorage.getItem(constants.storageKey));

    if (payload) {
      dispatch({ type: SET_SPLASH_LOGO_FINISH });
      dispatch({ type: LOAD_LOCAL_STORAGE, payload });
    }
  }, []);

  useEffect(() => {
    const { localStorage, splashLogo } = appState;
    if (splashLogo.finished && !localStorage.viewedIntro) {
      const payload = { viewedIntro: true };
      dispatch({ type: UPDATE_LOCAL_STORAGE, payload });
    }
  }, [appState.splashLogo.finished]);

  console.log('APP STATE', appState);
  return (
    <>
      <Box
        id={Utils.getElId('app', 'heyitsjhu')}
        className={classnames(Utils.getElClass('app', 'app'), classes.app)}
      >
        <Header isReady={appState.splashLogo.finished} />
        <Breadcrumbs isReady={appState.splashLogo.finished} />
        <AppRoutes />
        <HomeLogoNavigation isReady={appState.splashLogo.finished} />
        <Footer isReady={appState.splashLogo.finished} />
        <ParticleCanvas
          id={Utils.getElId('site', 'particle-canvas')}
          color={{ r: 204, g: 152, b: 81 }}
          count={40}
          countThreshold={30}
          linkColor={{ r: 204, g: 152, b: 81 }}
          linkWidth={0.8}
          linkDistanceLimit={260}
          pulseFrequency={0.02}
          radius={2}
          slowMultiplier={isHome ? 5 : 30}
          isReady={appState.splashLogo.finished}
        />
      </Box>
      <SplashLogo />
    </>
  );
};

export default App;
