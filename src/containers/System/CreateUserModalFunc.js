import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { emitter } from '@utils';
import { userService } from '@services';
import { MuiDialog } from '@controls';

import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const CreateUserModalFunc = (props) => {

    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();
    const onSubmit = data => console.log(data);

    const { isOpen, onClose, passingData, refreshGrid, ...others } = props;

    const [dataModal, setDataModal] = useState({ ...passingData });
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setDataModal({});
        onClose();
    }

    const createUserAsync = async (postData) => {
        try {
            let res = await userService.createUser(postData);
            if (res && res.errCode !== 0) {
                /** using Toast to show error */
            }
            else {
                refreshGrid();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setDataModal({ ...passingData });
    }, [passingData]);

    return (
        <React.Fragment>
            <MuiDialog
                maxWidth="md"
                title="Test"
                isOpen={isOpen}
                onClose={handleClose}
                disable_animate={300}
                onSave={createUserAsync}
                onReset={createUserAsync}
            >

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...register("email", { required: "Required" })}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...register("password", { required: "Required" })}
                        />

                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="First name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...register("firstName", { required: "Required" })}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Last name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...register("lastName", { required: "Required" })}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            {...register("address", { required: "Required" })}
                        />
                    </Grid>
                </Grid>
            </MuiDialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModalFunc)