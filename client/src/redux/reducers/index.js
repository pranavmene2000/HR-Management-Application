import { combineReducers } from 'redux';
import errorreducer from './erroorreducer';
import authreducer from './authreducer'
import loadingreducer from './loadingreducer'
import employeereducer from './employeereducer'
import uireducer from './uireducer'
import themereducer from './themereducer'

const appReducer = combineReducers({
    errors: errorreducer,
    auth: authreducer,
    loading: loadingreducer,
    emp: employeereducer,
    ui: uireducer,
    theme: themereducer
});

// const rootreducer = (state, action) => {
//     if (action.type === 'LOGOUT_SUCCESS')
//         state = undefined;

//     return appReducer(state, action);
// }

export default appReducer;