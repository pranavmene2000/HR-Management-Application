import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import jwt_decode from 'jwt-decode'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import setAuthToken from './setAuthToken'
import { logoutUser, setCurrentUser } from './redux/actions/authActions'
import store from './redux/store'
import SnackBar from './components/SnackBar'


if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store} >
    <SnackBar />
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);



reportWebVitals();
