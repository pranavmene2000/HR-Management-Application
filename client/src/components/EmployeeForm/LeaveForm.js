import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux'
import { submit_leave_form } from '../../redux/actions/employeeAction'
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import SaveIcon from '@material-ui/icons/Save';

const LeaveItems = () => ([
    { id: 'sick', title: 'Sick' },
    { id: 'casual', title: 'Casual' },
    { id: 'maternity', title: 'Maternity' },
    { id: 'religious', title: 'Religious' }
])

const initialFValues = {
    typeOfleave: '',
    reason: '',
    from: new Date(),
    to: new Date(),
}

function LeaveForm(props) {
    // console.log(typeof initialFValues.hireDate)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('typeOfleave' in fieldValues)
            temp.typeOfleave = fieldValues.typeOfleave ? "" : "This field is required."
        if ('reason' in fieldValues)
            temp.reason = fieldValues.reason ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    console.log(values)

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Submit Clicked")
        if (validate()) {
            props.submit_leave_form({ ...values, userId: props.auth.user.userId })
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item md={6}>
                    <Controls.Select
                        name="typeOfleave"
                        label="Type Of Leave"
                        value={values.typeOfleave}
                        onChange={handleInputChange}
                        options={LeaveItems()}
                    />
                    <Controls.Input
                        multiple={true}
                        name="reason"
                        label="Reason"
                        value={values.reason}
                        onChange={handleInputChange}
                        error={errors.reason}
                    />
                </Grid>
                <Grid item md={6}>
                    <Controls.DatePicker
                        name="from"
                        label="From"
                        value={values.from}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="to"
                        label="To"
                        value={values.to}
                        onChange={handleInputChange}
                    />

                    <div style={{ marginLeft: "5px", marginTop: "5px" }}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            startIcon={<SaveIcon />}
                            disableElevation
                            disableFocusRipple
                            disableRipple
                            variant="outlined"
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            startIcon={<RotateLeftOutlinedIcon />}
                            onClick={resetForm}
                            disableElevation
                            disableFocusRipple
                            disableRipple
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { submit_leave_form })(LeaveForm)