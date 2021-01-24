import axios from 'axios';
import { showSuccessSnackbar } from './uiAction';

export const add_new_employee = (values) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.post('/emp', values)
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'ADD_NEW_EMPLOYEE',
                    payload: {
                        employees: data.Employee_info
                    }
                })
                dispatch(showSuccessSnackbar(
                    "Employee Added",
                    "bottom",
                    "right",
                    "success"
                ))
                dispatch({ type: 'LOADING', payload: false })
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                });
                console.log(err.response.data)
            });
    }
}

export const get_all_employees = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.get('/emp')
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'GET_ALL_EMPLOYEES',
                    payload: {
                        employees: data
                    }
                })
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1500)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                });
                console.log(err.response.data)
            });
    }
}

export const submit_leave_form = (values) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.post('/emp/l_form', values)
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'NEW_LEAVE_FORM',
                    payload: {
                        leaveform: data.leaveForm
                    }
                })
                dispatch(showSuccessSnackbar(
                    "Leave application submitted successfully",
                    "bottom",
                    "right",
                    "success"
                ))
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                },400)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                });
                console.log(err.response.data)
            });
    }
}

export const get_all_leave_forms = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.get('/admin/l_forms')
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'GET_ALL_LEAVE_FORMS',
                    payload: {
                        leaveforms: data.getAllLeaveForms
                    }
                })
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1200)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                });
                console.log(err.response.data)
            });
    }
}

export const my_leave_forms = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.get('/admin/my_l_forms')
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'MY_LEAVE_FORMS',
                    payload: {
                        my_leave_forms: data
                    }
                })
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1000)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                });
                console.log(err.response.data)
            });
    }
}

export const update_status = (status, id) => {
    return (dispatch) => {
        console.log(typeof status, typeof id)
        dispatch({ type: 'LOADING', payload: true })
        axios.patch(`/emp/status`, { status, id })
            .then(({ data }) => {
                console.log(data);
                dispatch({
                    type: 'UPDATE_STATUS',
                    payload: {
                        status,
                        id
                    }
                })
                dispatch(showSuccessSnackbar(
                    "Status updated successfully",
                    "bottom",
                    "right",
                    "success"
                ))
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 500)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err
                });
                console.log(err)
            });
    }
}


export const searchKeyword = (keyword) => {
    return (dispatch) => {
        dispatch({
            type: 'SEARCH_KEYWORD',
            payload: {
                keyword
            }
        })
    }
}

export const sortBy = (team) => {
    return (dispatch) => {
        dispatch({
            type: 'SORT_BY',
            payload: {
                team
            }
        })
    }
}

export const emp_creds = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING', payload: true })
        axios.get('/admin/share')
            .then(({ data }) => {
                dispatch({
                    type: 'EMPLOYEES_CREDENTIALS',
                    payload: {
                        emp_creds: data
                    }
                })
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1000);
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err
                });
                console.log(err)
            })
    }
}

export const submit_finance = (values) => {
    return (dispatch) => {
        console.log(values, values.empID)
        dispatch({ type: 'LOADING', payload: true })
        axios.post(`/emp/payroll/${values.empID}`, values)
            .then(res => {
                console.log(res)
                dispatch({
                    type: 'UPDATE_FINANCE',
                    payload: {
                        empID: values.empID,
                        finaDetails: values
                    }
                })
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1000);
                dispatch(showSuccessSnackbar(
                    "Financial details updated successfully!",
                    "bottom",
                    "right",
                    "success"
                ))
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err
                });
                console.log(err)
            })
    }
}