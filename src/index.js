import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from 'app/store';
import 'assets/css/demo.css';
import 'assets/scss/now-ui-dashboard.scss?v1.5.0';
import 'bootstrap/dist/css/bootstrap.css';
import Login from 'components/Admin/Auth';
import { createBrowserHistory } from 'history';
import Admin from 'layouts/Admin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import history from './utils/history';
import PrivateRoute from 'commons/PrivateRoute';
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/admin" render={(props) => <Admin {...props} />} />
        <Route path="/login" component={Login} />
        <Redirect to="/admin" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
