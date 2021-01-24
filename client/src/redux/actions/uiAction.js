export const showSuccessSnackbar = (
    message,
    vertical = "bottom",
    horizontal = "right",
    severity
) => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_SUCCESS", message, vertical, horizontal, severity });
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" });
    };
};