import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from 'app/store';
import 'assets/css/demo.css';
import 'assets/scss/now-ui-dashboard.scss?v1.5.0';
import 'bootstrap/dist/css/bootstrap.css';
import Login from 'components/Admin/Auth';
import Admin from 'layouts/Admin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <Admin {...props} />} />
        <Route path="/login" component={Login} />
        <Redirect to="/admin" />
      </Switch>
    </BrowserRouter>
    ,
  </Provider>,
  document.getElementById('root')
);
