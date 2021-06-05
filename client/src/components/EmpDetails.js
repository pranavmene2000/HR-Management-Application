import React, { useEffect } from 'react'
import Appbar from './Appbar'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get_all_employees } from '../redux/actions/employeeAction'
import { Container, Fab, Grid, TextField } from '@material-ui/core';
import moment from 'moment'
import FinanceTable from './NavbarComponents/table/FinanceTable'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loading from '../Loading'

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    upArraw: {
        position: 'absolute',
        bottom: '20px',
        right: '20px'
    }
}))

function EmpDetails({ get_all_employees, Employee, ...props }) {
    const classes = useStyles();

    useEffect(() => {
        get_all_employees()
    }, [get_all_employees])

    if (props.loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <Container maxWidth="xl">
                <Appbar />
                <div className={classes.toolbar} />
                <Grid container spacing={3} justify="space-between" alignItems="flex-start">
                    <Grid item md={6}>
                        <h1>
                            Personal Information
                        </h1>
                        <Grid container spacing={3}>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Employee ID</span>
                                <TextField disabled value={Employee?.empID} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Full Name</span>
                                <TextField disabled value={Employee?.fullName} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Gender</span>
                                <TextField disabled value={Employee?.gender} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Email Id</span>
                                <TextField disabled value={Employee?.emailId} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>DOB</span>
                                <TextField disabled value={moment(Employee?.DOB).format("MMM Do YY")} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}> Location</span>
                                <TextField disabled value={Employee?.location} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}> Role</span>
                                <TextField disabled value={Employee?.role} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Team</span>
                                <TextField disabled value={Employee?.team} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Contact No</span>
                                <TextField disabled value={Employee?.contactNo} ct variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Hire Date</span>
                                <TextField disabled value={moment(Employee?.hireDate).format("MMM Do YY")} variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Bank Name</span>
                                <TextField disabled value={Employee?.bankName} ct variant="outlined" />
                            </Grid>
                            <Grid item md={4} style={{ flexDirection: 'column', display: "flex" }}>
                                <span style={{ paddingBottom: '5px' }}>Bank A/C</span>
                                <TextField disabled value={Employee?.bankAC} ct variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <FinanceTable employee={Employee} />
                    </Grid>
                </Grid>
            </Container>
            <div className={classes.upArraw}>
                <Fab onClick={() => props.history.goBack()} size="medium" color="default" aria-label="add" className={classes.margin}>
                    <ArrowBackIcon />
                </Fab>
            </div>
        </>
    )
}

const mapStateToProps = (state, ownProps) => ({
    Employee: state.emp.employees.find(emp => emp._id === ownProps.match.params.emp_id),
    loading: state.loading.loading
})

export default connect(mapStateToProps, { get_all_employees })(withRouter(EmpDetails))
