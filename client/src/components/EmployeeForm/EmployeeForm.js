import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux'
import { add_new_employee } from '../../redux/actions/employeeAction'
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import SaveIcon from '@material-ui/icons/Save';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

const getTeamCollection = () => ([
    { id: '1', title: 'ER' },
    { id: '2', title: 'TR' },
    { id: '3', title: 'MR' },
    { id: '4', title: 'SDE' },
])


const initialFValues = {
    fullName: '',
    emailId: '',
    contactNo: '',
    gender: 'male',
    role: '',
    team: '',
    bankName: '',
    bankAC: '',
    DOB: new Date(),
    location: '',
    hireDate: new Date()
}

function EmployeeForm(props) {

    // console.log(typeof initialFValues.hireDate)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('bankName' in fieldValues)
            temp.bankName = fieldValues.bankName ? "" : "This field is required."
        if ('bankAC' in fieldValues)
            temp.bankAC = fieldValues.bankAC.length === 12 ? "" : "Bank A/C should be 12 digits number"
        if ('location' in fieldValues)
            temp.location = fieldValues.location ? "" : "This field is required."
        if ('emailId' in fieldValues)
            temp.emailId = (/$^|.+@.+..+/).test(fieldValues.emailId) ? "" : "Email is not valid."
        if ('contactNo' in fieldValues)
            temp.contactNo = fieldValues.contactNo.length > 9 ? "" : "Minimum 10 numbers required."

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
            props.add_new_employee(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item md={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="emailId"
                        value={values.emailId}
                        onChange={handleInputChange}
                        error={errors.emailId}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="contactNo"
                        value={values.contactNo}
                        onChange={handleInputChange}
                        error={errors.contactNo}
                    />
                    <Controls.DatePicker
                        name="DOB"
                        label="DOB"
                        value={values.DOB}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="location"
                        label="Location"
                        value={values.location}
                        onChange={handleInputChange}
                        error={errors.location}
                    />
                    <Controls.Select
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        options={getDepartmentCollection()}
                    />
                </Grid>
                <Grid item md={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="team"
                        label="Team"
                        value={values.team}
                        onChange={handleInputChange}
                        options={getTeamCollection()}
                    />
                    <Controls.Input
                        label="Bank Name"
                        name="bankName"
                        value={values.bankName}
                        onChange={handleInputChange}
                        error={errors.bankName}
                    />
                    <Controls.Input
                        label="Bank A/C"
                        name="bankAC"
                        value={values.bankAC}
                        onChange={handleInputChange}
                        error={errors.bankAC}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
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

export default connect(null, { add_new_employee })(EmployeeForm)