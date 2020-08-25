import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import classnames from "classnames";

import { getAnimation } from "./animations";
import { STORAGE_KEY } from "./const";
import {
  Breadcrumbs,
  Footer,
  Header,
  HomeLogoNavigation,
  ParticleCanvas,
  SplashLogo,
} from "./components";
import { useIsHome } from "./hooks/useIsHome";
import { useScrollToTop } from "./hooks/useScrollToTop";
import AppRoutes from "./routes";
import { AppContext } from "./store";
import {
  fetchInitialCovidData,
  updateLocalStorage,
  updateSplashLogo,
} from "./store/actions";
import * as Utils from "./utils";

const useStyles = makeStyles(({ shared, spacing }) => ({
  app: {
    position: "relative",
    margin: 0,
    height: "inherit",
    border: shared.borderUncolored,
    transition: `all 600ms linear`,
    overflow: "auto",
  },
  isNotHome: {
    display: "block",
    margin: spacing(5),
    height: `calc(100% - ${spacing(10)}px)`,
    border: shared.borderDefault,
    "&::before": {
      content: '""',
      position: "fixed",
      width: `calc(100% - ${spacing(10) + 2}px)`,
      height: `calc(100% - ${spacing(10) + 2}px)`,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 2,
    },
  }, // used to populate mui classname
}));

const App = () => {
  const [appState, dispatch] = useContext(AppContext);
  const classes = useStyles();
  const isHome = useIsHome();
  const appRef = useRef();

  useScrollToTop(appRef);

  useEffect(() => {
    // localStorage.removeItem(STORAGE_KEY);
    const payload = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // skips intro if local storage exist in user's browser
    if (payload) {
      dispatch(updateLocalStorage(null, payload));
      dispatch(updateSplashLogo("finish"));
    } else if (!isHome && !appState.splashLogo.finished) {
      // if user arrives without visiting the homepage first
      dispatch(updateSplashLogo("finish"));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // fetchInitialCovidData(appState, dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (appState.splashLogo.finished && !appState.viewedIntro) {
      dispatch(updateLocalStorage("introViewed", true));
      const animation = getAnimation();
      animation.play(); // plays particle canvas and homelogo animation
    }
  }, [appState.splashLogo.finished, appState.viewedIntro, dispatch]);

  return (
    <>
      <Box
        id={Utils.getElId("app", "heyitsjhu")}
        className={classnames([classes.app, !isHome && classes.isNotHome])}
        ref={appRef}
      >
        <ParticleCanvas
          id={Utils.getElId("site", "particle-canvas")}
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
        <Header />
        <Breadcrumbs />
        <AppRoutes />
        <HomeLogoNavigation isReady={appState.splashLogo.finished} />
        <Footer />
      </Box>
      <SplashLogo />
    </>
  );
};

export default App;
