import React from 'react';
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
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function BasicTable({ employee }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

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
    return (
        <>
            {employee?.payroll?.length !== 0 ? (
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
                                {employee?.payroll?.map((row, index) => (
                                    <TableRow key={row.index}>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            {moment(row.from).format('LL')}
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            {moment(row.to).format('LL')}
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                            <Button onClick={() => createAndDownloadPdf(row, employee)} style={{ textTransform: 'none' }} startIcon={<GetAppIcon />} size="small" variant="contained" color="primary">
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : null}
        </>
    );
}