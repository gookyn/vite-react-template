import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Routers from '@/routers';
import './app.less';

function App(props: any): React.FC<any> | any {
  return (
    <div className="app">
      <Suspense fallback={<div />}>
        <Switch>
          {Routers.map((route: any) => (
            <Route exact path={route.path} key={route.path}>
              <route.component {...props} />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);
