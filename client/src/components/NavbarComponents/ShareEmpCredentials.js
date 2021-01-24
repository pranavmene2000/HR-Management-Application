import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { emp_creds } from '../../redux/actions/employeeAction';
import { EmailShareButton, EmailIcon } from 'react-share'
import Loading from '../../Loading';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function ShareEmpCredentials() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { Employee_credentials } = useSelector(state => state.emp)
    const { loading } = useSelector(state => state.loading)
    const theme = useTheme();

    useEffect(() => {
        dispatch(emp_creds())
    }, [dispatch])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <h1>Share Employee Credentials</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }}>Full Name</TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Email ID</TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Password</TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Share</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Employee_credentials.map((row) => (
                            <TableRow key={row.userName}>
                                <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                    {row.userName.split("_").join(" ")}
                                </TableCell>
                                <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">{row.emailId}</TableCell>
                                <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">{row.original_password}</TableCell>
                                <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">
                                    <EmailShareButton
                                        subject="Hello"
                                        body="Hello"
                                    >
                                        <EmailIcon size={35} round={true} />
                                    </EmailShareButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ShareEmpCredentials;