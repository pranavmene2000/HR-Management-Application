import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import SignIn from './components/auth/Signup';
import Navbar from './components/Navbar';
import EmpDetails from './components/EmpDetails';
import { connect, useDispatch } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  orange,
  // lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";

function App({ darkState, ...props }) {

  const dispatch = useDispatch();

  useEffect(() => {
    const existingPreference = localStorage.getItem("darkState");
    if (existingPreference) {
      (existingPreference === "light")
        ? dispatch({ type: 'CHANGE_THEME', payload: { mode: false } })
        : dispatch({ type: 'CHANGE_THEME', payload: { mode: true } })
    } else {
      dispatch({ type: 'CHANGE_THEME', payload: { mode: false } })
      localStorage.setItem("darkState", "light");
    }
  }, [dispatch]);


  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : "#43A047";
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignIn} />
          <Route path='/emp_details/:emp_id' component={EmpDetails} />
          <Navbar />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    darkState: state.theme.darkMode
  }
}

export default connect(mapStateToProps, {})(App);
