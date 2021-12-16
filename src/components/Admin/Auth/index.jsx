import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './authSlice';
import LoginPage from './pages/LoginForm';

function Login(props) {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(authActions.login(values));
  };
  return (
    <div>
      <LoginPage onSubmit={handleSubmit} />
    </div>
  );
}

Login.propTypes = {};

export default Login;
