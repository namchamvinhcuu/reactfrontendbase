import {
    Grid
} from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import * as actions from '@actions'
import { MuiDataGridFunc } from '@controls'
import { EditUserDialog } from '../EditUserDialog'

import { userService } from '@services'

export const UserManageReduxDataGrid = (props) => {

    const { userArr, language } = props;

    const userGridRef = useRef();
    const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [rowCount, setRowCount] = useState(userArr?.count || 0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});

    const toggleEditUserModal = async (user) => {
        setIsOpenEditUserModal(!isOpenEditUserModal);
        // emitter.emit('EVENT_BINDING_EDIT_USER_MODAL', { ...user });
    }

    const handleDeleteUser = async (user) => {
        if (window.confirm("Delete the item?")) {
            try {
                let res = await userService.deleteUser(user.id);
                if (res && res.errCode === 0) {
                    await props.getUser();
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: "action",
            headerName: "",
            flex: 0.3,
            // headerAlign: 'center',
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item xs={6}>
                            <IconButton
                                aria-label="edit"
                                color="warning"
                                size="small"
                                sx={[{ '&:hover': { border: '1px solid orange', }, }]}
                                onClick={() => toggleEditUserModal(params.row)}
                            >
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6}>
                            <IconButton
                                aria-label="delete"
                                color="error"
                                size="small"
                                sx={[{ '&:hover': { border: '1px solid red', }, }]}
                                onClick={() => handleDeleteUser(params.row)}
                            >
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    </Grid>
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

    const refreshGrid = async () => {
        return await props.getUser();
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(0);
    };

    const handleRowSelection = (arrIds) => {

        let currentGridData = userGridRef.current.getDataGrid();
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

    useEffect(() => {
        const initUserArr = async () => {
            const params = {
                id: 'all',
                page: page,
                pageSize: pageSize
            }
            await props.getUser(params);
        }

        initUserArr();

        console.log('userArr.rows', userArr)
    }, [page, pageSize]);

    useEffect(() => {
        setRowCount((prevRowCountState) => {
            return userArr.count !== 0 ? userArr.count : prevRowCountState
        });
    }, [userArr]);

    useEffect(() => {

        return () => {
            //Clear when component un-mounted
        };
    });

    return (
        <React.Fragment>
            <MuiDataGridFunc
                ref={userGridRef}
                showLoading={isLoading}
                isPagingServer={true}

                headerHeight={45}
                // rowHeight={30}

                columns={columns}
                rows={userArr.rows ?? []}

                page={page}
                pageSize={pageSize}
                rowCount={rowCount}
                rowsPerPageOptions={[2, 5, 10]}

                onPageChange={(newPage) => handlePageChange(newPage)}
                onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}

                onSelectionModelChange={(newSelectedRowId) => {
                    handleRowSelection(newSelectedRowId)
                }}
                selectionModel={selectedRowData}
            />

            <EditUserDialog
                isOpen={isOpenEditUserModal}
                onClose={toggleEditUserModal}
                passingData={selectedRowData}
                refreshGrid={refreshGrid}
            />
        </React.Fragment>

    )
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userArr: state.user.userArr,
})

const mapDispatchToProps = dispatch => {
    return {
        getUser: async (params) => dispatch(actions.getUser(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageReduxDataGrid)