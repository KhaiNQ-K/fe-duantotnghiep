import { selectCurrentUser } from 'components/Admin/Auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser?.roles.rolesId;

  if (isLoggedIn && isAdmin === 'ROLE_ADMIN') return <Route {...props} />;
  return <Redirect to="/login" />;
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
