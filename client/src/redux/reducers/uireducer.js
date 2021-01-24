const initialState = {
    successSnackbarOpen: false,
    successSnackbarMessage: '',
    verticalPosition: '',
    horizontalPosition: '',
    severity: ''
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SNACKBAR_SUCCESS":
            return {
                ...state,
                successSnackbarOpen: true,
                successSnackbarMessage: action.message,
                verticalPosition: action.vertical,
                horizontalPosition: action.horizontal,
                severity: action.severity
            };
        case "SNACKBAR_CLEAR":
            return {
                ...state,
                successSnackbarOpen: false
            };
        default:
            return state;
    }
};

export default uiReducer;