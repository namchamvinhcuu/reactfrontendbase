import { MuiDialog } from '@controls';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '@services';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { useFormCustom } from '@hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { MuiResetButton, MuiSubmitButton } from '@controls'
import { TextField } from '@mui/material'

export const CreateUserModalFunc = (props) => {

    const { isOpen, onClose, passingData, refreshGrid, ...others } = props;
    const [isSubmit, setIsSubmit] = useState(false);


    const initData = { ...passingData }
    const dataModalRef = useRef(initData);
    // const isDisableEle = useRef(false);



    const [showPassword, setShowPassword] = useState(false);

    const {
        values,
        setValues,
        handleInputChange
    } = useFormCustom(initData);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onSubmit = async (data) => {
        dataModalRef.current = { ...passingData, ...data };
        setIsSubmit(true);
        await createUserAsync(dataModalRef.current);
        setIsSubmit(false);

        handleCloseDialog();
    };

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

    const handleCloseDialog = () => {
        setValues({ ...initData });
        clearErrors();
        onClose();
    }

    const handleReset = () => {
        setValues({ ...initData });
        clearErrors();
    }

    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <MuiDialog
                maxWidth='sm'
                title='Create User'
                isOpen={isOpen}
                disabledCloseBtn={isSubmit}
                disable_animate={300}
                onClose={handleCloseDialog}
            >
                <form
                    style={{
                        paddingTop: '10px'
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container rowSpacing={2.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid xs={6}>

                            <TextField
                                disabled={isSubmit}
                                label='Email'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='email'
                                value={values.email}
                                {...register('email', {
                                    onChange: (e) => handleInputChange(e)
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}

                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                disabled={isSubmit}
                                label='Password'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='password'
                                value={values.password}
                                {...register('password', {
                                    onChange: (e) => handleInputChange(e)
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                disabled={isSubmit}
                                label='First Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='firstName'
                                value={values.firstName}
                                {...register('firstName', {
                                    onChange: (e) => handleInputChange(e)
                                })}

                                error={!!errors?.firstName}
                                helperText={errors?.firstName ? errors.firstName.message : null}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                disabled={isSubmit}
                                label='Last Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='lastName'
                                value={values.lastName}
                                {...register('lastName', {
                                    onChange: (e) => handleInputChange(e)
                                })}

                                error={!!errors?.lastName}
                                helperText={errors?.lastName ? errors.lastName.message : null}
                            />


                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                disabled={isSubmit}
                                label='Address'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='address'
                                multiline
                                rows={2}
                                value={values.address}
                                {...register('address', {
                                    onChange: (e) => handleInputChange(e)
                                })}
                                error={!!errors?.address}
                                helperText={errors?.address ? errors.address.message : null}
                            />


                        </Grid>
                        <Grid xs={12}>
                            <Grid
                                container
                                direction="row-reverse"
                            >
                                <MuiResetButton
                                    onClick={handleReset}
                                    disabled={isSubmit}
                                />

                                <MuiSubmitButton
                                    text="save"
                                    loading={isSubmit}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            </MuiDialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModalFunc)