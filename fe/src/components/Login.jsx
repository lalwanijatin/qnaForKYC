
import { Button, Box, Typography, Container } from '@mui/material';
import {  useSetRecoilState } from 'recoil';
import { currentUserInfoState } from '../state/CurrentUser';
import { baseURL } from '../utils/properties';

const Login = () => {

    const setCurrentInfo = useSetRecoilState(currentUserInfoState);
    setCurrentInfo(null);

  const handleGoogleLogin = () => {
    // Redirect to Google's OAuth 2.0 endpoint
      window.location.href =
      `${baseURL}oauth2/authorization/google`;
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={4}
        boxShadow={3}
        borderRadius={2}
        sx={{backgroundColor: '#f9f9f9'}}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {/* Temp */}
          Welcome to AskME
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please sign in with your Gmail account to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ mt: 3 }}
        >
          Sign in with Gmail
        </Button>
      </Box>
    </Container>
  );
};

export default Login;