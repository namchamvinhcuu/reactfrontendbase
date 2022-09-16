import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import './UserManage.scss'

// import * as userService from '../../services/userService'
import { userService } from '@services'
import { emitter } from '../../utils/emitter'
import { useModal } from '@hooks'

import {
    Button,
} from '@mui/material'

import MuiDataGridFunc from '../../components/Control/MuiDataGridFunc'
import CreateUserModal from './CreateUserModal'
import CreateUserModalFunc from './CreateUserModalFunc'
import EditUserModal from './EditUserModal'

export const UserManageFunc = (props) => {

    const ref = useRef();

    const initUserData = {
        id: 0
        , email: ''
        , password: ''
        , firstName: ''
        , lastName: ''
        , address: ''
    }

    const [arrUsers, setArrUsers] = useState([]);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(arrUsers?.totalRowCount || 0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowdata, setSelectedRowData] = useState({ ...initUserData });

    const toggleCreateUserModal = async () => {
        setIsOpenCreateUserModal(!isOpenCreateUserModal);
    }

    const toggleEditUserModal = async (user) => {
        setIsOpenEditUserModal(!isOpenEditUserModal);
        emitter.emit('EVENT_BINDING_EDIT_USER_MODAL', { ...user });
    }

    const getUsers = async (id) => {
        let res = await userService.getUsers(id);
        if (res && res.errCode === 0) {
            setArrUsers([...res.users]);
        }
    }

    const editUserAsync = async (postData) => {
        try {
            let res = await userService.editUser(postData);
            if (res && res.errCode !== 0) {
                /** using Toast to show error */
            }
            else {
                await getUsers('all');
                toggleEditUserModal();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUser = async (user) => {
        if (window.confirm("Delete the item?")) {
            try {
                let res = await userService.deleteUser(user.id);
                if (res && res.errCode === 0) {
                    await getUsers('all');
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(0);
    };

    const handleRowSelection = (arrIds) => {

        let currentGridData = ref.current.getDataGrid();
        let selectedRow = currentGridData.filter(function (item) {
            return item.id === arrIds[0]
        });

        if (selectedRow && selectedRow.length > 0) {
            setSelectedRowData({ ...selectedRow[0] });
        }
        else {
            setSelectedRowData({});
        }
    }

    const refreshGrid = async () => {
        return await getUsers('all');
    }



    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: "action",
            headerName: "",
            flex: 0.7,
            // headerAlign: 'center',
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
                            onClick={() => toggleEditUserModal(params.row)}
                        >
                            <i className="fas fa-edit" aria-hidden="true"></i>
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ margin: '2px' }}
                            onClick={() => handleDeleteUser(params.row)}
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

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            await getUsers('all')
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    useEffect(() => {
        setRowCount((prevRowCountState) => {
            return arrUsers.length !== 0 ? arrUsers.length : prevRowCountState
        });
    }, [arrUsers.length, setRowCount]);

    return (
        <React.Fragment>

            <CreateUserModalFunc
                isOpen={isOpenCreateUserModal}
                onClose={toggleCreateUserModal}
                passingData={selectedRowdata}
                refreshGrid={refreshGrid}
            />

            <EditUserModal
                isOpen={isOpenEditUserModal}
                toggleEditUserModal={toggleEditUserModal}
                editUserAsync={editUserAsync}
            />
            <div className='title text-center'>User Management</div>
            <div className='container'>
                <div className='my-1'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleCreateUserModal}
                    >
                        <i className="fas fa-plus"></i>
                        Create
                    </Button>
                </div>

                <MuiDataGridFunc
                    ref={ref}
                    showLoading={isLoading}
                    isPagingServer={false}

                    headerHeight={45}
                    rowHeight={30}

                    columns={columns}
                    rows={arrUsers.length ? arrUsers : []}

                    page={page}
                    pageSize={pageSize}
                    rowCount={rowCount}
                    rowsPerPageOptions={[5, 10, 20]}

                    onPageChange={(newPage) => handlePageChange(newPage)}
                    onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}

                    onSelectionModelChange={(arrIds) => handleRowSelection(arrIds)}
                />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageFunc)