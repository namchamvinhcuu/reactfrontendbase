import { MuiDialog } from '@controls';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '@services';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { useFormCustom } from '@hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

export const CreateUserModalFunc = (props) => {

    const { isOpen, onClose, passingData, refreshGrid, ...others } = props;

    const initData = { ...passingData }
    const dataModalRef = useRef(initData);

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

        await createUserAsync(dataModalRef.current);

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

    // useEffect(() => {
    //     console.log('dataModal after change', dataModal);
    // }, [dataModal]);

    return (
        <React.Fragment>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <MuiDialog
                    maxWidth='sm'
                    title='Create User'
                    isOpen={isOpen}
                    disable_animate={300}
                    onClose={handleCloseDialog}
                    onReset={handleReset}
                >

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid sm={6}>
                            <TextField
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
                        <Grid sm={6}>
                            <TextField
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
                        <Grid sm={6}>
                            <TextField
                                label='First name'
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
                        <Grid sm={6}>
                            <TextField
                                label='Last name'
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
                        <Grid sm={12}>
                            <TextField
                                label='Address'
                                variant='outlined'
                                size='small'
                                fullWidth
                                multiline
                                rows={2}
                                name='address'
                                value={values.address}
                                {...register('address', {
                                    onChange: (e) => handleInputChange(e)
                                })}
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