import { FC, useState, ChangeEvent, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { IUserData } from '@/app/lib/types/types';
import { loginThunk } from '@/app/lib/data/authThunk';
import {
  changeForgotPasssModalStatus,
  changeLoginModalStatus,
  changeModalStatus,
} from '@/app/lib/redux/modalSlice';
import { RootState } from '@/app/lib/redux/store';
import { setMessage } from '@/app/lib/redux/userSlice';
import { useRouter } from 'next/navigation';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IUserData>({
    email: '',
    password: '',
  });
  const [welcomeText, setWelcomeText] = useState<string>('');

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const loginInfo = useAppSelector(
    (state: RootState) => state.userSlice.message
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const rememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    if (userData) {
      let name;
      userData.user.name
        ? (name = userData.user.name)
        : (name = 'человек, поленившийся написать имя при регистрации');
      setWelcomeText(`Добро пожаловать, ${name}`);
      setTimeout(() => {
        dispatch(changeLoginModalStatus());
        dispatch(changeModalStatus());
        setWelcomeText('Sign in');
      }, 2000);
    } else {
      setWelcomeText(loginInfo || 'Sign in');
      setTimeout(() => {
        setWelcomeText('Sign in');
        dispatch(setMessage(''));
      }, 2000);
    }
  }, [userData, loginInfo, dispatch]);

  const signInHandler = () => {
    dispatch(loginThunk(formData));
  };

  const forgotPasswordHandler = () => {
    dispatch(changeLoginModalStatus());
    dispatch(changeForgotPasssModalStatus());
  };

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {welcomeText}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={changeHandler}
              value={formData.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={changeHandler}
              value={formData.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoSave={rememberMe ? 'on' : 'off'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={rememberMeHandler}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              onClick={signInHandler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button onClick={forgotPasswordHandler}>
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
