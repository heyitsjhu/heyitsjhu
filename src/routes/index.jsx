import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../const";

import {
  BackwardsClockPage,
  CoronavirusPage,
  JottingPadPage,
  JottingPadPostPage,
  PhotographyPage,
  ProfilePage,
  PageNotFound,
} from "../pages";

export default () => (
  <Switch>
    <Route exact path={ROUTES.HOME} />
    {/* <Route exact path={ROUTES.BACKWARDS_CLOCK}>
      <BackwardsClockPage />
    </Route>
    <Route exact path={ROUTES.CANDLEMONKEYS}>
      <CandleMonkeysPage />
    </Route>
    <Route exact path={ROUTES.CORONAVIRUS}>
      <CoronavirusPage />
    </Route>
    <Route exact path={ROUTES.JHUM}>
      <JHUMPage />
    </Route>
    <Route exact path={ROUTES.JOTTINGPAD_POST}>
      <JottingPadPostPage />
    </Route> */}
    {/* <Route path={ROUTES.JOTTINGPAD}>
      <JottingPadPage />
    </Route>
    <Route exact path={ROUTES.PHOTOGRAPHY}>
      <PhotographyPage />
    </Route> */}
    {/* <Route exact path={ROUTES.POWERED_BY_SCROLL}>
      <PoweredByScroll />
    </Route>
    <Route exact path={ROUTES.PROJECT_NOLOCIMES}>
      <DreamistLabsPage />
    </Route> */}
    {/* <Route exact path={ROUTES.PROFILE}>
      <ProfilePage />
    </Route> */}

    <Route component={PageNotFound} />
  </Switch>
);
