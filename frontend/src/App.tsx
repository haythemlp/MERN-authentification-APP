import React from 'react';
import LoginComponent from './components/login'
import AuthorizedRoute from './utils/authorizedRoute';
import UnauthorizedRoute from './utils/unauthorizedRoute';
import RegisterComponent from './components/register';
import ProfileComponent from './components/profile';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from "react-router-dom";
import { AppBar, Backdrop, Box, Button, CircularProgress, Container, Toolbar, Typography } from '@mui/material';


function App({ loading }: any) {

  return (<Container maxWidth="sm">

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route element={<AuthorizedRoute />}>
          <Route path="profile" element={<ProfileComponent />} />
        </Route>
        <Route element={<UnauthorizedRoute />}>
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Backdrop
      sx={{ color: '#fff', zIndex: 999999 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.userReducer.loading
  };
};

function Main() {
  const token = localStorage.getItem('accessToken');


  return (<AppBar component="nav">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        MUI
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {token ? (<Button sx={{ color: '#fff' }} >
          <Link to="/profile">profile</Link>
        </Button>) :

          (<><Button sx={{ color: '#fff' }}>
            <Link to="/login">Login</Link>
          </Button>
            <Button sx={{ color: '#fff' }}>
              <Link to="/register">register</Link>
            </Button></>)
        }



      </Box>
    </Toolbar>
  </AppBar>)
}


export default connect(mapStateToProps, {})(App);

