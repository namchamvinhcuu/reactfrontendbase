import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './UserManage.scss';

import { Button } from 'react-bootstrap';



import { emitter } from '../../utils/emitter';

import * as userService from '../../services/userService'

import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenCreateUserModal: false,
            isOpenEditUserModal: false,
        }
    }

    componentDidMount = async () => {
        await this.getUsers('all');
    }

    columns = [
        { name: 'id', header: 'Id', defaultVisible: false, type: 'number' },
        { name: 'email', header: 'Email', minWidth: 50, defaultFlex: 2 },
        { name: 'firstName', header: 'First Name', maxWidth: 1000, defaultFlex: 1 },
        { name: 'lastName', header: 'Last Name', maxWidth: 1000, defaultFlex: 1 },
        { name: 'address', header: 'Address', maxWidth: 1000, defaultFlex: 1 },
        {
            name: '', header: 'Action', maxWidth: 1000, defaultFlex: 1, render: (params) => {

                return (
                    <React.Fragment>
                        <Button
                            className='btn-in-table'
                            variant="outline-warning"
                            onClick={() => { this.toggleEditUserModal(params.data); }}
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </Button>
                        <Button
                            className='btn-in-table'
                            variant="outline-danger"
                            onClick={() => { this.handleDeleteUser(params.data); }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </React.Fragment>
                )
            }

        },
    ]

    gridStyle = { height: 'auto' }

    getUsers = async (id) => {
        let res = await userService.getUsers(id);
        if (res && res.errCode === 0) {
            this.setState({
                // arrUsers: res.users,
                arrUsers: [...res.users],
            }, () => {
                console.log('current this.state.arrUsers: ', this.state.arrUsers);
            });
        }
    }

    toggleCreateUserModal = async () => {
        this.setState({
            isOpenCreateUserModal: !this.state.isOpenCreateUserModal,
        });
    }

    createUserAsync = async (postData) => {
        try {
            let res = await userService.createUser(postData);
            if (res && res.errCode !== 0) {
                /** using Toast to show error */
            }
            else {
                await this.getUsers('all');
                this.toggleCreateUserModal();

                emitter.emit('EVENT_REFRESH_CREATE_USER_MODAL', { message: 'test emitter' });
            }
        } catch (error) {
            console.log(error)
        }
    }

    toggleEditUserModal = async (user) => {
        this.setState({
            isOpenEditUserModal: !this.state.isOpenEditUserModal,
        }, () => {
            emitter.emit('EVENT_BINDING_EDIT_USER_MODAL', { ...user });
        });
    }

    editUserAsync = async (postData) => {
        try {
            let res = await userService.editUser(postData);
            if (res && res.errCode !== 0) {
                /** using Toast to show error */
            }
            else {
                await this.getUsers('all');
                this.toggleEditUserModal();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await userService.deleteUser(user.id);
            if (res && res.errCode === 0) {
                await this.getUsers('all');
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <CreateUserModal
                    isOpen={this.state.isOpenCreateUserModal}
                    toggleCreateUserModal={this.toggleCreateUserModal}
                    createUserAsync={this.createUserAsync}
                />
                <EditUserModal
                    isOpen={this.state.isOpenEditUserModal}
                    toggleEditUserModal={this.toggleEditUserModal}
                    editUserAsync={this.editUserAsync}
                />
                <div className='title text-center'>User Management</div>
                <div className='container'>
                    <div className='my-1'>
                        <Button
                            onClick={() => { this.toggleCreateUserModal(); }}
                        >
                            <i className="fas fa-plus"></i>
                            Create
                        </Button>
                    </div>

                    {/* <Table
                        striped
                        responsive
                        hover
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrUsers && this.state.arrUsers.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className='text-center'>
                                            <Button
                                                className='btn-in-table'
                                                variant="outline-warning"
                                                onClick={() => { this.toggleEditUserModal(item); }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </Button>
                                            <Button
                                                className='btn-in-table'
                                                variant="outline-danger"
                                                onClick={() => { this.handleDeleteUser(item); }}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table> */}

                    {

                    }
                    {/* <ReactDataGrid
                        idProperty="id"
                        columns={this.columns}
                        dataSource={this.state.arrUsers && this.state.arrUsers.length > 0 ? this.state.arrUsers : []}
                        style={this.gridStyle}
                    /> */}
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
