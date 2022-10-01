import React, { useImperativeHandle } from 'react'
import { TextField } from '@mui/material'
const MuiTextField = React.forwardRef((props, ref) => {

    const { label, variant, size, name, value, register, handleInputChange, error, helperText, ...other } = props;

    useImperativeHandle(ref, () => ({

    }));

    return (
        <TextField
            label={label ?? ''}
            variant={variant ?? 'outlined'}
            size={size ?? 'small'}
            fullWidth
            name={name ?? ''}
            value={value ?? ''}

            {...register(name, {
                onChange: (e) => handleInputChange(e)
            })}
            error={error ?? false}
            helperText={helperText ?? null}
        />
    )
})

export default MuiTextField