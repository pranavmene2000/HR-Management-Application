import axios from 'axios';
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../setAuthToken'
import { showSuccessSnackbar } from './uiAction';

export const registerUser = (user, history) => {
    return (dispatch) => {
        axios.post(`/auth/signup`, user)
            .then(res => {
                history.push('/login');
                console.log(res)

                dispatch({
                    type: 'REGISTER_SUCCESS'
                })

                dispatch(showSuccessSnackbar(
                    "Register successful",
                    "bottom",
                    "right",
                    "success"
                ))
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data.errors
                });
                console.log(err.response.data.errors)
            });
    }
}

export const loginUser = (user, history) => {
    return (dispatch, getState) => {
        const { auth: { user: { role } } } = getState();
        axios.post(`/auth/login`, user)
            .then(res => {
                // console.log(res);
                const { token } = res.data;
                // console.log(token)
                localStorage.setItem('jwt', token)
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded))
                dispatch({
                    type: 'LOGIN_SUCCESS'
                })

                dispatch(showSuccessSnackbar(
                    "Login successful",
                    "bottom",
                    "right",
                    "success"
                ))
                role === "Admin" && history.push('/')
                role === "Employee" && history.push('/leave_form')
                
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data.errors
                });
                console.log(err.response.data.errors)
            });
    }
}

export const setCurrentUser = decoded => ({
    type: 'SET_CUREENT_USER',
    payload: decoded
});

export const logoutUser = (history) => {
    return (dispatch, getState) => {
        localStorage.removeItem('jwt');
        setAuthToken(false);
        dispatch({
            type: 'SET_CUREENT_USER',
            payload: {}
        })
        dispatch({
            type: 'LOGOUT_SUCCESS'
        })
        dispatch(showSuccessSnackbar(
            "Logout successful",
            "bottom",
            "right",
            "success"
        ))
        dispatch({ type: 'CLEAN_ERRORS' })
        history.push('/login');
    }
}