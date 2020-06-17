import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../const';

import {
  BusinessCardPage,
  CoronavirusPage,
  JottingPadPage,
  ProfilePage,
  PageNotFound,
} from '../pages';

export default () => (
  <Switch>
    <Route exact path="/" />
    <Route exact path={ROUTES.POWEREDBYSCROLL}>
      {/* <PoweredByScroll /> */}
    </Route>
    <Route exact path={ROUTES.CORONAVIRUS}>
      <CoronavirusPage />
    </Route>
    <Route exact path={ROUTES.DREAMISTLABS}>
      {/* <DreamistLabsPage /> */}
    </Route>
    <Route exact path={ROUTES.CANDLEMONKEYS}>
      {/* <CandleMonkeysPage /> */}
    </Route>
    <Route exact path={ROUTES.JHUM}>
      {/* <JHUMPage /> */}
    </Route>

    <Route exact path={ROUTES.PROFILE}>
      <ProfilePage />
    </Route>
    <Route exact path={ROUTES.JOTTINGPAD}>
      <JottingPadPage />
    </Route>
    <Route exact path={ROUTES.JOTTINGPADPOST}>
      {/* <JottingPadPostPage /> */}
    </Route>
    <Route exact path={ROUTES.PHOTOGRAPHY}>
      {/* <AboutPage /> */}
    </Route>

    <Route exact path={ROUTES.PURPOSE}>
      {/* <AboutPage /> */}
    </Route>
    <Route exact path={ROUTES.BUSINESSCARD}>
      <BusinessCardPage />
    </Route>
    <Route component={PageNotFound} />
  </Switch>
);
