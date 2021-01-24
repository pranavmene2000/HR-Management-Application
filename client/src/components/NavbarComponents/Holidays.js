import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { holidays } from '../../HolidayaData';
import { makeStyles, Table, TableBody, useTheme } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Holidays() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Date</TableCell>
                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left"></TableCell>
                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Name</TableCell>
                        <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {holidays.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">{row.day}</TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">{row.Name}</TableCell>
                            <TableCell style={{ backgroundColor: theme.palette.background.paper }} align="left">{row.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}