import { Button, Divider, Grid, makeStyles, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import Paper from '../Paper'
import HistoryIcon from '@material-ui/icons/History';
import Axios from 'axios'
import { showSuccessSnackbar } from '../../redux/actions/uiAction'
import Finance from './Finance';
import Loading from '../../Loading';

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
        height: 38
    }
}));

const Payroll = ({ ...props }) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const [values, setValues] = useState({})

    const reset = () => {
        setSearch('')
        setValues((state) => ({
            fullName: '',
            emailId: '',
            contactNo: '',
            gender: '',
            role: '',
            team: '',
            hireDate: '',
            bankName: '',
            bankAC: '',
            location: '',
            DOB: ''
        }))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search)
        dispatch({ type: 'LOADING', payload: true })
        Axios.get(`/emp/${search}`)
            .then(({ data }) => {
                console.log(data)
                setValues(data)
                dispatch(showSuccessSnackbar(
                    "Employee Found !",
                    "bottom",
                    "right",
                    "success"
                ))
                setTimeout(() => {
                    dispatch({ type: 'LOADING', payload: false })
                }, 1000)
            })
            .catch(error => {
                if (error) {
                    dispatch(showSuccessSnackbar(
                        error.response.data.message,
                        "bottom",
                        "right",
                        "error"
                    ))
                }
                dispatch({ type: 'LOADING', payload: false })
                console.log(error.response.data)
            })

    }

    if (props.loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <Paper>
                <form onSubmit={handleSearch}>
                    <TextField
                        InputProps={{
                            className: classes.input
                        }}
                        variant="outlined"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Enter Employee ID "
                    />
                    <Button disabled={!search} type="submit" color="primary" startIcon={<SearchIcon />} variant="outlined" className={classes.input}>
                        Search
                    </Button>
                    <Button onClick={reset} color="default" startIcon={<HistoryIcon />} variant="outlined" component="span" className={classes.input}>
                        Reset
                </Button>
                </form>
                <Divider style={{ margin: '15px 8px' }} />
                <Grid container>
                    <Grid item md={3} >
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Full Name
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.fullName}
                            placeholder="Full Name"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Mobile Number
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.contactNo}
                            placeholder="Mobile Number"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Email Id
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.emailId}
                            placeholder="Email Id"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            DOB
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.DOB}
                            placeholder="DOB"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Location
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.location}
                            placeholder="Location"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Bank Name
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.bankName}
                            placeholder="Bank Name"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Bank A/C
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.bankAC}
                            placeholder="Bank A/C"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Team
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.team}
                            placeholder="Team"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Role
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.role}
                            placeholder="Role"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Gender
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.gender}
                            placeholder="Gender"
                            disabled
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Typography component="p" variant="p" style={{ marginLeft: '9px', fontSize: 12, color: theme.palette.text.primary }}>
                            Hiring date
                        </Typography>
                        <TextField
                            InputProps={{
                                className: classes.input
                            }}
                            variant="outlined"
                            value={values && values.hireDate}
                            placeholder="Hiring date"
                            disabled
                        />
                    </Grid>
                </Grid>
            </Paper>
            <p style={{ marginLeft: '20px', textAlign: 'center' }}>Update Financial Details</p>
            <Paper>
                <Finance empID={values.empID} userId={values._id} />
            </Paper>
        </>
    )
}

const mapStateToProps = (state) => ({
    state: state.emp.employees,
    loading: state.loading.loading,
})

export default connect(mapStateToProps, {})(Payroll)
