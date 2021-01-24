import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { get_all_leave_forms, update_status } from '../../redux/actions/employeeAction'
import moment from 'moment'
import { Chip, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import HistoryIcon from '@material-ui/icons/History';
import Controls from '../controls/Controls';
import { useForm } from '../useForm';
import SaveIcon from '@material-ui/icons/Save';
import Loading from '../../Loading';

const Items = [
    { id: 'approved', title: 'Approved' },
    { id: 'rejected', title: 'Rejected' },
]

const initialValues = {
    status: 'approved'
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.text.primary
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary
    },
}));

function MyLeaveAppln({ get_all_leave_forms, forms, employees, update_status, ...props }) {
    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState('panel_0');

    const validate = () => { }
    const {
        values,
        handleInputChange,
    } = useForm(initialValues, true, validate);


    const handleSubmit = (form_id) => {
        update_status(values.status, form_id)
    }

    useEffect(() => {
        get_all_leave_forms()
    }, [get_all_leave_forms])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (props.loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={classes.root}>
            <h1>All Leave Applications</h1>
            {forms.map((form, index) => {
                return (
                    <Accordion
                        style={{ backgroundColor: theme.palette.background.paper }}
                        expanded={expanded === `panel_${index}`} onChange={handleChange(`panel_${index}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: theme.palette.text.icon }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>By : {form?.userInfo?.userName?.split("_")?.join(" ")}</Typography>
                            <Typography className={classes.secondaryHeading}>{moment(form.createdAt).subtract(10, 'days').calendar()}</Typography>
                            {form.status === "pending" && (
                                <Chip
                                    style={{ marginLeft: '30px' }}
                                    size="small"
                                    label={form.status}
                                    color="default"
                                    clickable
                                    icon={<HistoryIcon />}
                                />
                            )}
                            {form.status === "approved" && (
                                <Chip
                                    style={{ marginLeft: '30px' }}
                                    size="small"
                                    label={form.status}
                                    color="primary"
                                    clickable
                                    icon={<DoneIcon />}
                                />
                            )}
                            {form.status === "rejected" && (
                                <Chip
                                    style={{ marginLeft: '30px' }}
                                    size="small"
                                    label={form.status}
                                    color="secondary"
                                    clickable
                                    icon={<ClearIcon />}
                                />
                            )}
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
                                <Typography gutterBottom className={classes.secondaryHeading} style={{ marginLeft: '20px' }}>
                                    To : {moment(form.to).subtract(10, 'days').calendar()}
                                </Typography>
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <Controls.RadioGroup
                                    name="status"
                                    label="Status"
                                    value={values.status}
                                    onChange={handleInputChange}
                                    items={Items}
                                />
                            </div>
                            <div>
                                <Controls.Button
                                    onClick={() => handleSubmit(form._id)}
                                    type="submit"
                                    text="Submit"
                                    startIcon={<SaveIcon />}
                                    disableElevation
                                    variant="outlined"
                                    fullWidth={false}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
}

const mapStateToProps = (state) => ({
    forms: state.emp.leaveForms,
    employees: state.emp.employees,
    loading: state.loading.loading
})

export default connect(mapStateToProps, { get_all_leave_forms, update_status })(MyLeaveAppln)