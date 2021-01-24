import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect, useSelector } from 'react-redux';
import { my_leave_forms } from '../../redux/actions/employeeAction'
import moment from 'moment'
import { Chip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import HistoryIcon from '@material-ui/icons/History';
import Loading from '../../Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        margin: theme.spacing(0, 0, 0, 35),
        color: theme.palette.text.secondary,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function MyLeaveAppln({ my_leave_forms, forms }) {
    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState('panel_0');

    useEffect(() => {
        my_leave_forms()
    }, [my_leave_forms])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { loading } = useSelector(state => state.loading)

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={classes.root}>
            <h1>My Leave Applications</h1>
            {forms.map((form, index) => {
                return (
                    <Accordion style={{ backgroundColor: theme.palette.background.paper }} expanded={expanded === `panel_${index}`} onChange={handleChange(`panel_${index}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{color : theme.palette.text.icon}} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            {form.status === "pending" && (
                                <Chip
                                    style={{ margin: '0' }}
                                    size="small"
                                    label={form.status}
                                    color="default"
                                    clickable
                                    icon={<HistoryIcon />}
                                />
                            )}
                            {form.status === "approved" && (
                                <Chip
                                    style={{ margin: '0' }}
                                    size="small"
                                    label={form.status}
                                    color="primary"
                                    clickable
                                    icon={<DoneIcon />}
                                />
                            )}
                            {form.status === "rejected" && (
                                <Chip
                                    style={{ margin: '0' }}
                                    size="small"
                                    label={form.status}
                                    color="secondary"
                                    clickable
                                    icon={<ClearIcon />}
                                />
                            )}
                            <Typography className={classes.heading}>{form.typeOfleave}</Typography>
                            <Typography className={classes.secondaryHeading}>{moment(form.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <Typography gutterBottom className={classes.secondaryHeading}>
                                    Reason : {form.reason}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Typography className={classes.secondaryHeading}>
                                    From : {moment(form.from).subtract(10, 'days').calendar()}
                                </Typography>
                                <Typography className={classes.secondaryHeading} style={{ marginLeft: '20px' }}>
                                    To : {moment(form.to).subtract(10, 'days').calendar()}
                                </Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
}

const mapStateToProps = (state) => ({
    forms: state.emp.MyLeaveForms
})

export default connect(mapStateToProps, { my_leave_forms })(MyLeaveAppln)