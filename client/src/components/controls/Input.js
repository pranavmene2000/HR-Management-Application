import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, error = null, onChange,disabled } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    )
}
