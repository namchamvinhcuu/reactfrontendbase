import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { emitter } from '../../utils/emitter';

import {
    Container
    , Form
    , Row
    , Col
    , FormGroup
    , Label
    , Input
    , Button
    , Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class EditUserModal extends Component {

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
        emitter.on('EVENT_BINDING_EDIT_USER_MODAL', (data) => {
            this.setState({
                ...data
            });
        })
    }

    toggle = async () => {
        this.props.toggleEditUserModal();
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
        let arrInput = ['email', 'firstName', 'lastName', 'address'];

        for (let index = 0; index < arrInput.length; index++) {
            if (!this.state[arrInput[index]]) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    handleEditUser = async () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            //Call Api to edit user
            this.props.editUserAsync(this.state);
        }
    }

    render() {
        return (
            <div className="text-center" >
                <Modal
                    isOpen={this.props.isOpen}
                    /*toggle={() => { this.toggle(); }}*/ /**Dùng để đóng modal khi click ra ngoài */
                    size='lg'
                    centered
                >
                    <ModalHeader
                        toggle={() => { this.toggle(); }}
                    >
                        Edit User
                    </ModalHeader>

                    <Form>

                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="edit_Email">
                                            Email
                                        </Label>
                                        <Input
                                            id="edit_Email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            // bsSize="sm"
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="edit_FirstName">
                                            First Name
                                        </Label>
                                        <Input
                                            id="edit_FirstName"
                                            name="firstname"
                                            type="text"
                                            placeholder="Enter first name"
                                            value={this.state.firstName}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'firstName')
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="edit_LastName">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="edit_LastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Enter last name"
                                            value={this.state.lastName}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'lastName')
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="edit_Address">
                                            Address
                                        </Label>
                                        <Input
                                            id="edit_Address"
                                            name="address"
                                            type="text"
                                            placeholder="Enter address"
                                            value={this.state.address}
                                            // bsSize="sm"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, 'address')
                                            }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={() => { this.handleEditUser(); }}>
                                <i className="fas fa-save"></i>
                                Save
                            </Button>
                            <Button color="secondary" onClick={() => { this.setState({ ...this.initUser }); }}>
                                <i className="fas fa-redo"></i>
                                Reset
                            </Button>
                        </ModalFooter>

                    </Form>

                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
