const initialState = {
    employees: [],
    leaveForms: [],
    MyLeaveForms: [],
    Employee_credentials: [],

    keyword: '',
    team: '',

}

const employeereducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_NEW_EMPLOYEE':
            return {
                ...state,
                employees: [
                    action.payload.employees,
                    ...state.employees
                ]
            }

        case 'GET_ALL_EMPLOYEES':
            return {
                ...state,
                employees: action.payload.employees
            }

        case 'REMOVE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter(emp => emp._id !== action.payload.emp_id)
            }

        case 'NEW_LEAVE_FORM':
            return {
                ...state,
                leaveForms: [
                    action.payload.leaveform,
                    ...state.leaveForms
                ]
            }

        case 'GET_ALL_LEAVE_FORMS':
            return {
                ...state,
                leaveForms: action.payload.leaveforms
            }

        case 'MY_LEAVE_FORMS':
            return {
                ...state,
                MyLeaveForms: action.payload.my_leave_forms
            }

        case 'UPDATE_STATUS':
            return {
                ...state,
                leaveForms: state.leaveForms.map(form => {
                    if (form._id === action.payload.id) {
                        return {
                            ...form,
                            status: action.payload.status
                        }
                    }
                    return form
                })
            }

        case 'SEARCH_KEYWORD': {
            return {
                ...state,
                keyword: action.payload.keyword
            }
        }

        case 'SORT_BY': {
            return {
                ...state,
                team: action.payload.team
            }
        }

        case 'EMPLOYEES_CREDENTIALS':
            return {
                ...state,
                Employee_credentials: action.payload.emp_creds
            }

        case 'UPDATE_FINANCE':
            return {
                ...state,
                employees: state.employees.map(emp => {
                    if (emp.empID === action.payload.empID) {
                        return {
                            ...emp,
                            payroll: [
                                action.payload.finaDetails,
                                ...emp.payroll,
                            ]
                        }
                    }
                    return emp;
                })
            }

        default:
            return state
    }
}

export default employeereducer;