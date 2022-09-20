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

export const UserManageReduxDataGrid = (props) => {

    const { userArr, language } = props;

    const ref = useRef();
    const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(userArr?.totalRowCount || 0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});

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
                                sx={
                                    [
                                        {
                                            '&:hover': {
                                                border: '1px solid orange',
                                            },
                                        }
                                    ]
                                }
                            // onClick={() => toggleEditUserModal(params.row)}
                            >
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6}>
                            <IconButton
                                aria-label="delete"
                                color="error"
                                size="small"
                                sx={
                                    [
                                        {
                                            '&:hover': {
                                                border: '1px solid red',
                                            },
                                        }
                                    ]
                                }
                            // onClick={() => handleDeleteUser(params.row)}
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

    useEffect(() => {

        console.log('getUser', props.getUser())

        // Chỉ định clean up sau khi gọi effect:
        return function cleanup() {

        };
    }, []);

    return (
        <MuiDataGridFunc
            ref={ref}
            showLoading={isLoading}
            isPagingServer={false}

            headerHeight={45}
            // rowHeight={30}

            columns={columns}
            rows={userArr.length ? userArr : []}

            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            rowsPerPageOptions={[5, 10, 20]}

            onPageChange={(newPage) => handlePageChange(newPage)}
            onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}

            onSelectionModelChange={(newSelectedRowId) => {
                handleRowSelection(newSelectedRowId)
            }}
            selectionModel={selectedRowData}
        />
    )
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userArr: state.user.userArr,
})

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageReduxDataGrid)