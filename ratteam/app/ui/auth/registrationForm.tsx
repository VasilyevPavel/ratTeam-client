import { useState, ChangeEvent, useEffect } from 'react';
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
// import { registerThunk } from "../../features/auth/authThunk"
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { IUserData } from '@/app/lib/types/types';
import { registerThunk } from '@/app/lib/data/authThunk';
import { RootState } from '@/app/lib/redux/store';
import {
  changeModalStatus,
  changeRegistrationModalStatus,
} from '@/app/lib/redux/modalSlice';
import { setMessage } from '@/app/lib/redux/userSlice';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RegistrationForm() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IUserData>({
    name: '',
    email: '',
    password: '',
  });
  const [welcomeText, setWelcomeText] = useState('Sign Up');
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const loginInfo = useAppSelector(
    (state: RootState) => state.userSlice.message
  );

  useEffect(() => {
    if (userData) {
      let name;
      userData.user.name
        ? (name = userData.user.name)
        : (name = 'человек, поленившийся написать имя при регистрации');
      setWelcomeText(`Добро пожаловать, ${name}`);
      setTimeout(() => {
        dispatch(changeRegistrationModalStatus());
        dispatch(changeModalStatus());
        setWelcomeText('Sign Up');
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      }, 2000);
    } else {
      setWelcomeText(loginInfo || 'Sign Up');
      setTimeout(() => {
        setWelcomeText('Sign Up');
        dispatch(setMessage(''));
      }, 2000);
    }
  }, [userData, loginInfo, dispatch]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(registerThunk(formData));
  };

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
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  value={formData.name}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  value={formData.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={changeHandler}
                  value={formData.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
