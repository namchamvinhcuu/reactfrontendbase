import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'

import { MuiResetButton, MuiSubmitButton } from '@controls'
import { Paper, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Container } from '@mui/system'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useFormCustom } from '@hooks'
import UserManageFunc from '../UserManageFunc'

// import { MuiTextField } from '@controls'

export const UserManageReduxFunc = (props) => {

    const initUserData = {
        id: 0
        , email: ''
        , password: ''
        , firstName: ''
        , lastName: ''
        , address: ''
    }

    const dataModalRef = useRef(initUserData);
    // const elRef = useRef();

    const [isSubmit, setIsSubmit] = useState(false);

    const {
        values,
        setValues,
        handleInputChange
    } = useFormCustom(initUserData);

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3).required(),
        firstName: yup.string().min(3).required(),
        lastName: yup.string().min(3).required(),
        // address: yup.string().min(3).required(),
    });
    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onReset = () => {
        setValues({ ...initUserData });
        dataModalRef.current = { ...initUserData };
        clearErrors();
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const onSubmit = async (data) => {
        setIsSubmit(true);

        await delay(10000);
        dataModalRef.current = { ...initUserData, ...data };
        console.log('submit data:', dataModalRef.current)
        setIsSubmit(false);

    }

    return (
        <React.Fragment>
            <Container maxWidth={false}>

                <Grid container justifyContent="center" spacing={2} sx={{ padding: "2px 0" }}>
                    <Grid xs={12} className="title">
                        Manage users using redux
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ padding: "5px 0" }}>
                    <Grid xs={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Paper
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light' ? '#FDFCFC' : '#fff',
                                }}
                            >
                                <Grid container>
                                    <Grid xs={12} className="title">
                                        Create new user
                                    </Grid>

                                    <Grid xs={6}>
                                        {/* <MuiTextField
                                            ref={elRef}
                                            disabled={elDisabled}
                                            label='Email'
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            name='email'
                                            value={values.email}
                                            handleInputChange={handleInputChange}
                                            register={register}

                                            error={!!errors?.email}
                                            helperText={errors?.email ? errors.email.message : null}
                                        /> */}
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
                                            type='password'
                                            value={values.password}
                                            {...register('password', {
                                                onChange: (e) => handleInputChange(e)
                                            })}

                                            error={!!errors?.password}
                                            helperText={errors?.password ? errors.password.message : null}
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
                                                // ref={elRef}
                                                onClick={onReset}
                                                disabled={isSubmit}
                                            />

                                            <MuiSubmitButton
                                                text="save"
                                                loading={isSubmit}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </form>
                    </Grid>

                    <Grid xs={8}>
                        <UserManageFunc />
                    </Grid>
                </Grid>
            </Container>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageReduxFunc)