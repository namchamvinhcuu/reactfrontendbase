import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from "react-hook-form";
import { emitter } from '@utils'
import { userService } from '@services'
import { MuiDialog } from '@controls'

import TextField from '@mui/material/TextField';

export const CreateUserModalFunc = (props) => {

    const { register, formState: { errors }, handleSubmit, clearErrors } = useForm();
    const onSubmit = data => console.log(data);

    const { isOpen, onClose, passingData, refreshGrid, ...others } = props;

    const [dataModal, setDataModal] = useState({ ...passingData });

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
            {/* <Modal
                    show={this.props.isOpen}
                    onHide={() => { this.toggle(); }}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                    centered
                >

                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>Create new user</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'email')
                                            }}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            value={this.state.password}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'password')
                                            }}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            placeholder="Enter first name"
                                            value={this.state.firstName}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'firstName')
                                            }}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={this.state.lastName}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'lastName')
                                            }}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            as="textarea" rows={2}
                                            name="address"
                                            placeholder="Enter address"
                                            value={this.state.address}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'address')
                                            }}
                                        />

                                    </Form.Group>

                                </Col>

                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={() => { this.handleCreateNewUser(); }}>
                                <i className="fas fa-save"></i>
                                &nbsp;Save
                            </Button>
                            <Button variant="secondary" onClick={() => { this.setState({ ...this.initUser }); }}>
                                <i className="fas fa-redo"></i>
                                &nbsp;Reset
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal> */}

            <MuiDialog
                isOpen={isOpen}
                onClose={handleClose}
                // animate={'grow'}
                disable_animate={500}
                onSave={createUserAsync}
            >
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" />
            </MuiDialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModalFunc)