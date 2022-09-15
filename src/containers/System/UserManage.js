import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserManage.scss';

import {
    Button,
} from '@mui/material';


import { emitter } from '../../utils/emitter';

import * as userService from '../../services/userService';

import MuiDataGrid from '../../components/Control/MuiDataGrid';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenCreateUserModal: false,
            isOpenEditUserModal: false,
            page: 0,
            rowsPerPage: 10
        }
    }

    componentDidMount = async () => {
        await this.getUsers('all');
    }

    componentDidUpdate = async () => {
        // await this.getUsers('all');
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

    columns = [
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: "action",
            headerName: "",
            flex: 1,
            headerAlign: 'center',
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Button
                            variant="outlined"
                            color="warning"
                            size="small"
                            sx={{ margin: '2px' }}
                        // onClick={() => editRow(params)}
                        >
                            <i className="fas fa-edit" aria-hidden="true"></i>
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ margin: '2px' }}
                        // onClick={() => editRow(params)}
                        >
                            <i className="fas fa-trash" aria-hidden="true"></i>
                        </Button>
                    </div>
                );
            },
        },
        { field: 'email', headerName: 'Email', flex: 1, },
        { field: 'firstName', headerName: 'First name', flex: 1, },
        { field: 'lastName', headerName: 'Last name', flex: 1, },
        {
            field: 'address',
            headerName: 'Address',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            // valueGetter: (params) =>
            //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0,
        });
    };

    render() {
        return (
            <React.Fragment>
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
                            variant="contained"
                            color="secondary"
                            onClick={() => { this.toggleCreateUserModal(); }}
                        >
                            <i className="fas fa-plus"></i>
                            Create
                        </Button>
                    </div>



                    <MuiDataGrid
                        autoHeight
                        showLoading
                        columns={this.columns}
                        rows={this.state.arrUsers.length ? this.state.arrUsers : []}
                        pageSize={6}
                        rowsPerPageOptions={[6, 10, 50]}
                        IsPagingServer={true}
                    />
                </div>
            </React.Fragment>
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
