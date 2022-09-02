import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './UserManage.scss';

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
                    <div className='mx-1'>
                        <button className='btn btn-primary'
                            onClick={() => {
                                this.toggleCreateUserModal();
                            }}
                        >
                            <i className="fas fa-plus"></i>
                            &nbsp;Add New
                        </button>
                    </div>
                    <table id="customers">
                        <thead>
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
                                            <button className='btn-edit' onClick={() => { this.toggleEditUserModal(item); }}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => { this.handleDeleteUser(item); }}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
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
