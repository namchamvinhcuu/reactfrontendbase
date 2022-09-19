import React, { useEffect, useState, useImperativeHandle } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import { DataGrid } from "@mui/x-data-grid"

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;',
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    padding: '4px',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#dddddd' : '#1d1d1d',
    },

    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },

    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,

    },

    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },

    '& .MuiDataGrid-cell': {
        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
        fontSize: '14px',
    },

    '& .MuiDataGrid-footerContainer': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30px',
        backgroundColor: theme.palette.mode === 'light' ? '#D5D5D5' : '#1d1d1d',

        '.MuiTablePagination-root': {

            '.MuiTablePagination-toolbar': {

                minHeight: '30px',

                '.MuiTablePagination-selectLabel': {
                    margin: '0 auto',
                    fontSize: '1.1em',
                },

                '.MuiTablePagination-displayedRows': {
                    margin: '0 auto',
                    fontSize: '1.1em'
                },

                '.MuiInputBase-root': {
                    margin: '0 auto',
                    fontSize: '1.1em'
                }
            },
        },
    },

    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',

        '& .MuiDataGrid-sortIcon': {
            color: '#fff'
        },

        '& .MuiDataGrid-columnHeader': {
            outline: 'none'
        }
    },
}));

const MuiDataGridFunc = React.forwardRef((props, ref) => {

    const {
        isPagingServer,
        headerHeight,
        rowHeight,

        rows,
        columns,
        rowCount,
        page,
        pageSize,
        rowsPerPageOptions,
        onPageChange,
        onPageSizeChange,

        onSelectionModelChange,

    } = props;

    useImperativeHandle(ref, () => ({
        getDataGrid: () => getDataGrid(),
    }));

    const getDataGrid = () => {
        return [...rows]
    }

    return (
        <React.Fragment>
            {
                isPagingServer
                    ?
                    <StyledDataGrid
                        autoHeight
                        headerHeight={headerHeight}
                        // rowHeight={rowHeight}
                        getRowHeight={() => 'auto'}
                        columns={columns}
                        rows={rows}

                        pagination
                        paginationMode="server"
                        page={page}
                        pageSize={pageSize}
                        rowCount={rowCount}
                        rowsPerPageOptions={rowsPerPageOptions}

                        onPageChange={onPageChange}
                        onPageSizeChange={onPageSizeChange}

                        onSelectionModelChange={onSelectionModelChange}
                    />
                    :
                    <StyledDataGrid
                        autoHeight
                        headerHeight={headerHeight}
                        // rowHeight={rowHeight}
                        getRowHeight={() => 'auto'}
                        columns={columns}
                        rows={rows}

                        pagination
                        page={page}
                        pageSize={pageSize}
                        rowCount={rowCount}
                        rowsPerPageOptions={rowsPerPageOptions}

                        onPageChange={onPageChange}
                        onPageSizeChange={onPageSizeChange}

                        onSelectionModelChange={onSelectionModelChange}
                    />

            }
        </React.Fragment>
    )
});

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true, })(MuiDataGridFunc)

// export default MuiDataGridFunc;