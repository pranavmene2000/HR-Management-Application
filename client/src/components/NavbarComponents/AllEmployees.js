import React, { useEffect } from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { connect, useDispatch } from 'react-redux'
import { get_all_employees } from '../../redux/actions/employeeAction'
import EmployeeTable from './table/EmployeeTable'
import { searchKeyword, sortBy } from '../../redux/actions/employeeAction'
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../Loading'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const getTeamCollection = [
    { id: '1', title: 'ER' },
    { id: '2', title: 'TR' },
    { id: '3', title: 'MR' },
    { id: '4', title: 'SDE' },
]

function AllEmployees({ get_all_employees, employees, ...props }) {
    const classes = useStyles();

    useEffect(() => {
        get_all_employees()
    }, [get_all_employees])

    const dispatch = useDispatch()
    console.log(props.state.emp.team)

    if(props.loading){
        return (
            <Loading />
        )
    }

    return (
        <div>
            <Grid container alignItems="center" style={{ marginTop: "5px", marginBottom: "5px" }} spacing={2}>
                <Grid item>
                    <TextField
                        id="outlined-basic"
                        label="Enter name,email,role,team"
                        variant="outlined"
                        onChange={(e) => dispatch(searchKeyword(e.target.value.toLowerCase()))}
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sort by team</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined-sortby-team"
                            value={props.state.emp.team.toUpperCase()}
                            onChange={(e) => dispatch(sortBy(e.target.value.toLowerCase()))}
                            label="Sort by team"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {getTeamCollection.map(({ title, id }) => {
                                return (
                                    <MenuItem key={id} value={title}>
                                        {title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <EmployeeTable employees={employees} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { keyword, employees, team } = state.emp;
    const v = employees.filter(emp => emp.team.toLowerCase().trim() === team);

    return {
        employees: v.length !== 0 ? v.filter(emp =>
            emp.fullName.toLowerCase().trim().startsWith(keyword) ||
            emp.role.toLowerCase().trim().startsWith(keyword) ||
            emp.team.toLowerCase().trim().startsWith(keyword) ||
            emp.emailId.toLowerCase().trim().startsWith(keyword)
        ) :
            employees.filter(emp =>
                emp.fullName.toLowerCase().trim().startsWith(keyword) ||
                emp.role.toLowerCase().trim().startsWith(keyword) ||
                emp.team.toLowerCase().trim().startsWith(keyword) ||
                emp.emailId.toLowerCase().trim().startsWith(keyword)
            ),

        state,
        loading: state.loading.loading
    }
}

export default connect(mapStateToProps, { get_all_employees })(AllEmployees)
