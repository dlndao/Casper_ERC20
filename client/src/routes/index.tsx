import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWrapper from './Route';
import { Route } from 'react-router-dom';
import { APP_NAME } from 'screens/DLNTezos/dapp/defaults';
import { DAppProvider } from 'screens/DLNTezos/dapp/dapp';

import { Login } from 'screens/User/LandingPage';
import { CasperAssets } from 'screens/CasperAssets';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider, types } from 'react-alert';

function Routes() {
  const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
    type: types.ERROR,
  };
  return (
    <Provider template={AlertTemplate} {...options}>
      <DAppProvider appName={APP_NAME}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <RouteWrapper
            path='/CasperAssets'
            isAdmin={false}
            component={(props) => <CasperAssets {...props} />}
          />
        </Switch>
      </DAppProvider>
    </Provider>
  );
}

export { Routes };
