import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { getAnimation } from './animations';
import { ROUTES, STORAGE_KEY } from './const';
import {
  Breadcrumbs,
  Footer,
  Header,
  HomeLogoNavigation,
  ParticleCanvas,
  SplashLogo,
} from './components';
import AppRoutes from './routes';
import { AppContext } from './store';
import { fetchInitialCovidData, updateLocalStorage, updateSplashLogo } from './store/actions';
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
  const isHome = location.pathname === ROUTES.HOME;

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    const payload = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // skips intro if local storage exist in user's browser
    if (payload) {
      dispatch(updateLocalStorage(null, payload));
      dispatch(updateSplashLogo('finish'));
    } else if (!isHome && !appState.splashLogo.finished) {
      // if user arrives without visiting the homepage first
      dispatch(updateSplashLogo('finish'));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // fetchInitialCovidData(appState, dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (appState.splashLogo.finished && !appState.viewedIntro) {
      dispatch(updateLocalStorage('introViewed', true));
      const animation = getAnimation();
      animation.play(); // plays particle canvas and homelogo animation
    }
  }, [appState.splashLogo.finished, appState.viewedIntro, dispatch]);

  console.log('APP STATE', appState);

  return (
    <>
      <Box id={Utils.getElId('app', 'heyitsjhu')} className={classes.app}>
        <Header />
        <Breadcrumbs />
        <AppRoutes />
        <HomeLogoNavigation isReady={appState.splashLogo.finished} />
        <Footer />
        <ParticleCanvas
          id={Utils.getElId('site', 'particle-canvas')}
          color={{ r: 204, g: 152, b: 81 }}
          count={40}
          countThreshold={40}
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
