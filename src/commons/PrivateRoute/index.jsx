import { selectCurrentUser } from 'components/Admin/Auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const role = localStorage.getItem('role');

  if (isLoggedIn && role === 'ROLE_ADMIN') return <Route {...props} />;
  return <Redirect to="/login" />;
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
