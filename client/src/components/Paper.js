import React from 'react'
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2,2),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper
    }
})) 

function PaperC({children}) {
    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}>
            {children}
        </Paper>
    )
}

export default PaperC
