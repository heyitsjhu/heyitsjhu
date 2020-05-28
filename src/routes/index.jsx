import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AboutPage, CoronavirusPage, PageNotFound } from '../pages';

export default () => (
  <Switch>
    <Route exact path="/" />
    <Route exact path="/about">
      <AboutPage />
    </Route>
    <Route exact path="/coronavirus">
      <CoronavirusPage />
    </Route>
    <Route component={PageNotFound} />
  </Switch>
);
