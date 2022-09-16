import { MuiDialog } from '@controls';
import { userService } from '@services';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Unstable_Grid2';


export const CreateUserModalFunc = (props) => {


    const onSubmit = data => alert('click');

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

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3).required(),
        firstName: yup.string().min(3).required(),
        lastName: yup.string().min(3).required(),
        address: yup.string().min(3).required(),
    });
    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setDataModal({ ...passingData });
    }, [passingData]);

    return (
        <React.Fragment>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <MuiDialog
                    maxWidth="sm"
                    title="Test"
                    isOpen={isOpen}
                    onClose={handleClose}
                    disable_animate={300}
                    onSave={onSubmit}
                    onReset={onSubmit}
                >

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid sm={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("email")}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                        </Grid>
                        <Grid sm={6}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("password")}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
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
                        <Grid sm={6}>
                            <TextField
                                label="First name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("firstName")}
                                error={!!errors?.firstName}
                                helperText={errors?.firstName ? errors.firstName.message : null}
                            />
                        </Grid>
                        <Grid sm={6}>
                            <TextField
                                label="Last name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                {...register("lastName")}
                                error={!!errors?.lastName}
                                helperText={errors?.lastName ? errors.lastName.message : null}
                            />
                        </Grid>
                        <Grid sm={12}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                size="small"
                                fullWidth
                                multiline
                                rows={2}
                                {...register("address")}
                                error={!!errors?.address}
                                helperText={errors?.address ? errors.address.message : null}
                            />
                        </Grid>
                    </Grid>
                </MuiDialog>
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModalFunc)