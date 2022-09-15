import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { emitter } from '../../utils/emitter';

import {
    Container
    , Form
    , Row
    , Col
    , Modal
    , Button
} from 'react-bootstrap';

class CreateUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.initUser
        }

        this.listenToEmitter();
    }

    initUser = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
    }

    componentDidMount = async () => {
    }

    listenToEmitter() {
        emitter.on('EVENT_REFRESH_CREATE_USER_MODAL', (data) => {
            this.setState({
                ...this.initUser
            });
        })
    }

    toggle = async () => {
        this.props.toggleCreateUserModal();
    }

    handleOnChangeInput = async (event, inputName) => {
        let postData = { ...this.state };
        postData[inputName] = event.target.value;

        this.setState({
            ...postData
        });
    }

    checkValidInput = async () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for (let index = 0; index < arrInput.length; index++) {
            if (!this.state[arrInput[index]]) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    handleCreateNewUser = async () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            //Call Api to create new user
            this.props.createUserAsync(this.state);

            /** Refresh User without using emitter */
            // this.setState({
            //     ...this.initUser
            // });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modal
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
                            <Button variant="primary" onClick={() => { this.handleCreateNewUser(); }}>
                                <i className="fas fa-save"></i>
                                &nbsp;Save
                            </Button>
                            <Button variant="secondary" onClick={() => { this.setState({ ...this.initUser }); }}>
                                <i className="fas fa-redo"></i>
                                &nbsp;Reset
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
