import React from 'react'
import LeaveForm from "../EmployeeForm/LeaveForm";
import { Paper, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3, 3),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper
    },

}))

export default function NewEmp() {

    const classes = useStyles();

    const { loading } = useSelector(state => state.loading)

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <h1 style={{ marginLeft: '30px' }}>
                Request Leave Application
            </h1>
            <Paper className={classes.pageContent}>
                <LeaveForm />
            </Paper>
        </>
    )
}