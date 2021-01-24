import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
import { NavLink } from 'react-router-dom'

const columns = [
    {
        id: 'empID',
        label: 'Emp ID',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toString(),
    },
    { id: 'fullName', label: 'Full Name', minWidth: 130, format: (value) => value.toString(), },
    { id: 'emailId', label: 'Email', minWidth: 100, format: (value) => value.toString(), },
    {
        id: 'contactNo',
        label: 'Mobile No.',
        minWidth: 110,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toString(),
    },
    {
        id: 'role',
        label: 'Role',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toString(),
    },
    {
        id: 'team',
        label: 'Team',
        minWidth: 130,
        align: 'right',
        format: (value) => value.toString(),
    },
    {
        id: 'hireDate',
        label: 'Hired Date',
        minWidth: 125,
        align: 'right',
        format: (value) => moment(value).format("MMM Do YY"),
    },
];

const useStyles = makeStyles({
    root: {
        overflowX: "auto",
        marginRight: "auto",
        marginLeft: "auto",
    },
    container: {
        maxHeight: 600,
    },
});

export default function StickyHeadTable({ employees }) {
    const classes = useStyles();
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color: theme.palette.text.primary }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow style={{ textDecoration: 'none' }} button component={NavLink} to={`/emp_details/${row._id}`} hover tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell style={{ backgroundColor: theme.palette.background.paper }} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : column.format(value)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ backgroundColor: theme.palette.background.paper }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}