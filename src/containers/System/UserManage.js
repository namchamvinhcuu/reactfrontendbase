import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './UserManage.scss';

import { Button } from 'react-bootstrap';
import {
    // Table
    // , TableBody
    // , TableCell
    // , TableContainer
    // , TableHead
    // , TablePagination
    // , TableRow
    Button as MuiButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";

import { DataGrid } from '@mui/x-data-grid';

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
            page: 0,
            rowsPerPage: 10
        }
    }

    defaultMaterialTheme = createTheme();


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

    columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },

        {
            field: 'address',
            headerName: 'Address',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            // valueGetter: (params) =>
            //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    // columns = [
    //     { id: 'id', name: 'ID', hide: true },
    //     { id: 'email', name: 'Email', width: 130 },
    //     { id: 'firstName', name: 'First name', width: 130 },
    //     { id: 'lastName', name: 'Last name', width: 130 },

    //     {
    //         id: 'address',
    //         name: 'Address',
    //         // description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         // valueGetter: (params) =>
    //         //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    // ];

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
                        <MuiButton
                            variant="contained"
                            color="secondary"
                            onClick={() => { this.toggleCreateUserModal(); }}
                        >
                            <i className="fas fa-plus"></i>
                            Create
                        </MuiButton>
                    </div>

                    {/* <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {this.columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.arrUsers && this.state.arrUsers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {this.columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 10, 25, 100]}
                        component="div"
                        count={this.state.arrUsers.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    /> */}

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid

                            rows={this.state.arrUsers.length ? this.state.arrUsers : []}
                            columns={this.columns}
                            pageSize={1}
                            rowsPerPageOptions={[1]}
                            checkboxSelection={false}
                        />
                    </div>
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
