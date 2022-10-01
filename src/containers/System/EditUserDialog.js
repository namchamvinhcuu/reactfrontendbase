import { MuiDialog } from '@controls';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '@services';
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { useFormCustom } from '@hooks';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { MuiResetButton, MuiSubmitButton } from '@controls'

export const EditUserDialog = (props) => {

    const { isOpen, onClose, passingData, refreshGrid, ...others } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const initData = { ...passingData }
    const dataModalRef = useRef(initData);
    const {
        values,
        setValues,
        handleInputChange
    } = useFormCustom({});

    const onSubmit = async (data) => {
        dataModalRef.current = { ...passingData, ...data, email: initData.email };

        setIsSubmit(true)
        await editUserAsync(dataModalRef.current);
        setIsSubmit(false);
        handleCloseDialog();
    };

    const editUserAsync = async (postData) => {
        try {
            let res = await userService.editUser(postData);
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
        // email: yup.string().email().required(),
        firstName: yup.string().min(3).required(),
        lastName: yup.string().min(3).required(),
        address: yup.string().min(3).required(),
    });
    const { register, formState: { errors }, handleSubmit, setValue, clearErrors } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        resolver: yupResolver(schema)
    });

    register('email', {
        value: passingData.email
    })

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
        setValues({ ...passingData });
        dataModalRef.current = { ...passingData };

    }, [passingData, setValues]);

    return (
        <React.Fragment>

            <MuiDialog
                maxWidth='sm'
                title='Edit User'
                isOpen={isOpen}
                disable_animate={300}
                onClose={handleCloseDialog}
                onReset={handleReset}
            >
                <form
                    style={{
                        paddingTop: '10px'
                    }}
                    onSubmit={
                        handleSubmit(onSubmit)
                    }
                >
                    <Grid container rowSpacing={2.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid xs={12}>
                            <TextField
                                label='Email'
                                variant='outlined'
                                size='small'
                                fullWidth
                                name='email'
                                value={values.email}
                                disabled
                            // {...register("email", {
                            //     // value: values.email,
                            //     // disabled: true,
                            //     // onChange: (e) => handleInputChange(e),
                            //     // setValueAs: () => dataModalRef.current.email

                            // })}

                            // error={!!errors?.email}
                            // helperText={errors?.email ? errors.email.message : null}
                            />
                        </Grid>

                        <Grid xs={6}>
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

                        <Grid xs={6}>
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
                        <Grid xs={12}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDialog)