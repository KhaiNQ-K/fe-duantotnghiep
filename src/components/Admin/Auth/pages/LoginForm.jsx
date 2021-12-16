import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputField } from 'commons/FormFields/InputField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { selectIsLogging } from '../authSlice';
import history from 'utils/history';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
});
const theme = createTheme();
function LoginPage({ onSubmit }) {
  const isLogging = useSelector(selectIsLogging);
  console.log(isLogging);
  const initialValue = {
    email: '',
    password: '',
  };

  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const handleLoginSubmit = async (data) => {
    if (Boolean(localStorage.getItem('access_token'))) return;
    await onSubmit?.(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://png.pngtree.com/thumb_back/fw800/back_our/20190623/ourmid/pngtree-medical-dentist-dental-background-image_238600.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {isLogging && <LinearProgress />}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLoginSubmit)}
              sx={{ mt: 1 }}
            >
              <InputField control={control} label="Email Address" name="email" autoFocus />
              <InputField control={control} name="password" label="Password" />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLogging}
              >
                {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
