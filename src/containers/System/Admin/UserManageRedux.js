import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import {
    Container
    , Form
    , Row
    , Col
    , FloatingLabel
    , Button
} from 'react-bootstrap';

class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
    }


    render() {
        return (
            <React.Fragment>
                <div className='title'> Manage users using redux</div>

                <Container>
                    <Form>
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

                        <Row >
                            <Col className='btn-group-col'>
                                <Button
                                    variant="primary"
                                // onClick={() => { this.setState({ ...this.initUser }); }}
                                >
                                    <i className="fas fa-save"></i>
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                // onClick={() => { this.setState({ ...this.initUser }); }}
                                >
                                    <i className="fas fa-redo"></i>
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

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

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
