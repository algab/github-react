import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

const Home = lazy(() => import('./pages/Home'));
const User = lazy(() => import('./pages/User'));

const Routes: React.FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:name" component={User} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default Routes;
