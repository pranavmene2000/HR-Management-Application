import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment'
import { saveAs } from 'file-saver';
import { connect, useDispatch } from 'react-redux';
import Loading from '../../Loading';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function MySlips({ ...props }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [slips, setSlips] = useState([]);
    const [employeeData, setEmployeeData] = useState({})

    const createAndDownloadPdf = (row, employee) => {
        console.log(row.from)
        console.log(row.to)
        const data = {
            ...row,
            contactNo: employee.contactNo,
            fullName: employee.fullName,
            bankName: employee.bankName,
            bankAC: employee.bankAC,
            DOB: employee.DOB,
            location: employee.location,
            role: employee.role,
            team: employee.team,
            empID: employee.empID,
            gender: employee.gender,
        }
        dispatch({ type: 'LOADING', payload: true })
        axios.post('/create-pdf', data)
            .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                dispatch({ type: 'LOADING', payload: false })
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: true })
        axios.get(`/emp/my_slips/${props.auth.user.emailId}`)
            .then(({ data }) => {
                setSlips(data.payroll)
                setEmployeeData(data.get_data)
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 400)
                console.log(data.payroll, data.get_data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [dispatch,props.auth.user.emailId])

    if (props.loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {slips?.length !== 0 ? (
                <>
                    <h1>Generate Slip</h1>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: theme.palette.background.paper }}>From</TableCell>
                                    <TableCell style={{ backgroundColor: theme.palette.background.paper }}>To</TableCell>
                                    <TableCell style={{ backgroundColor: theme.palette.background.paper }}>Generate Slip</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slips?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            {moment(row.from).format('LL')}
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            {moment(row.to).format('LL')}
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            <Button onClick={() => createAndDownloadPdf(row, employeeData)} style={{ textTransform: 'none' }} startIcon={<GetAppIcon />} size="small" variant="contained" color="primary">
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : <h2>No Record Found !</h2>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loading: state.loading.loading
    }
}

export default connect(mapStateToProps, {})(MySlips)
