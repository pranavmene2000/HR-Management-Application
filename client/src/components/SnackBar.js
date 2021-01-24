import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { clearSnackbar } from "../redux/actions/uiAction";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function SuccessSnackbar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        successSnackbarMessage,
        successSnackbarOpen,
        verticalPosition,
        horizontalPosition,
        severity
    } = useSelector(state => state.ui);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearSnackbar());
    }

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{ vertical: verticalPosition, horizontal: horizontalPosition }}
                open={successSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {successSnackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SuccessSnackbar