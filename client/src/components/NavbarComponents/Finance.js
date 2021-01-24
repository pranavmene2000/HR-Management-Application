import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Controls from '../controls/Controls'
import { Form, useForm } from '../useForm'
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { submit_finance } from '../../redux/actions/employeeAction'
import { connect, useSelector } from 'react-redux';
import Loading from '../../Loading';

const initialFValues = {
    from: new Date(),
    to: new Date(),
    total_days: '',
    medical: '',
    pf: '',
    convence: '',
    basic: '', hRent: '', bonus: '', profTax: '', provFund: '', incomeTax: ''
}

function Finance({ ...props }) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('total_days' in fieldValues)
            temp.total_days = fieldValues.total_days ? "" : "This field is required."
        if ('medical' in fieldValues)
            temp.medical = fieldValues.medical ? "" : "This field is required."
        if ('pf' in fieldValues)
            temp.pf = fieldValues.pf ? "" : "This field is required."
        if ('medical' in fieldValues)
            temp.medical = fieldValues.medical ? "" : "This field is required."
        if ('net_salary' in fieldValues)
            temp.net_salary = fieldValues.net_salary ? "" : "This field is required."

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

    // console.log(values, props.empID)

    const [NET_SALARY, SET_NET_SALARY] = useState(0);

    const calculate = () => {
        console.log(values)
        const net = Number(values.basic) + Number(values.hRent) + Number(values.bonus) + Number(values.pf)
            - Number(values.profTax) - Number(values.provFund) - Number(values.incomeTax) - Number(values.convence)
            - Number(values.medical)
        console.log(net);
        SET_NET_SALARY(net)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Submit Clicked")
        if (validate()) {
            props.submit_finance({ ...values, net_salary: NET_SALARY.toString(), userId: props.userId, empID: props.empID })
            resetForm()
            SET_NET_SALARY(0)
        }
    }

    const { loading } = useSelector(state => state.loading)
    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
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

                    <Controls.Input
                        multiple={true}
                        name="basic"
                        label="Basic"
                        value={values.basic}
                        onChange={handleInputChange}
                        error={errors.basic}
                    />
                    <Controls.Input
                        multiple={true}
                        name="hRent"
                        label="House Rent Allowance"
                        value={values.hRent}
                        onChange={handleInputChange}
                        error={errors.hRent}
                    />

                    <Controls.Input
                        multiple={true}
                        name="convence"
                        label="Convence"
                        value={values.convence}
                        onChange={handleInputChange}
                        error={errors.convence}
                    />
                    <Controls.Input
                        multiple={true}
                        name="pf"
                        label="PF"
                        value={values.pf}
                        onChange={handleInputChange}
                        error={errors.pf}
                    />
                </Grid>
                <Grid item md={6}>
                    <Controls.Input
                        multiple={true}
                        name="bonus"
                        label="Bonus"
                        value={values.bonus}
                        onChange={handleInputChange}
                        error={errors.bonus}
                    />
                    <Controls.Input
                        multiple={true}
                        name="total_days"
                        label="Total days"
                        value={values.total_days}
                        onChange={handleInputChange}
                        error={errors.total_days}
                    />
                    <Controls.Input
                        multiple={true}
                        name="medical"
                        label="Medical"
                        value={values.medical}
                        onChange={handleInputChange}
                        error={errors.medical}
                    />
                    <Controls.Input
                        multiple={true}
                        name="profTax"
                        label="Professional Tax"
                        value={values.profTax}
                        onChange={handleInputChange}
                        error={errors.profTax}
                    />
                    <Controls.Input
                        multiple={true}
                        name="provFund"
                        label="Provident Fund"
                        value={values.provFund}
                        onChange={handleInputChange}
                        error={errors.provFund}
                    />
                    <Controls.Input
                        multiple={true}
                        name="incomeTax"
                        label="Income Tax"
                        value={values.incomeTax}
                        onChange={handleInputChange}
                        error={errors.incomeTax}
                    />
                    <Controls.Input
                        multiple={true}
                        name="net_salary"
                        label="Net Salary"
                        value={NET_SALARY}
                        onChange={handleInputChange}
                        disabled={true}
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
                            disabled={NET_SALARY === 0 || !props.empID}
                        />
                        <Controls.Button
                            type="button"
                            text="Calculate"
                            startIcon={<SaveIcon />}
                            onClick={calculate}
                            disableElevation
                            disableFocusRipple
                            disableRipple
                            variant="outlined"
                        // disabled={!props.empID}
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            startIcon={<RotateLeftOutlinedIcon />}
                            onClick={() => { resetForm(); SET_NET_SALARY(0) }}
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

export default connect(null, { submit_finance })(Finance)
