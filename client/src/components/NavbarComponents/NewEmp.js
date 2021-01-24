import React from 'react'
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Loading from '../../Loading';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3,3),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper
    }
})) 

function NewEmp({...props}) {

    const classes = useStyles();
    
    if(props.loading){
        return (
            <Loading />
        )
    }

    return (
        <Paper className={classes.pageContent}>
            <EmployeeForm />
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.loading.loading,
    }
}

export default connect(mapStateToProps,null)(NewEmp);