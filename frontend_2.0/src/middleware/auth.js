import React from 'react';
import {Router, Route} from 'react-router';

function requireAuth(nextState, replace) {
    if (!userExists()) {
      replace({
        pathname: '/signin',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  
  export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="protectedRoute" component={Protected} onEnter={requireAuth} >
            <Route path="signin" component={Signin} >
            </Route>
        </Route>
   </Router>
  );