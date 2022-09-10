import { connect } from 'react-redux';
import React, { Component, forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import axios from '../../axios'

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
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#dddddd' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
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
        }
    }
}));

class MuiDataGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGettingData: false,
            isFirstloading: true,
            dataSearch: {},
            rows: [],
            pageSize: props.pageSize ?? 10,
            rowCount: 0,
            currentPage: 0,
            isPaging: false
        }
    }

    componentDidMount = async () => {
        await this.loadData();
    }

    // componentDidUpdate = async (prevProps, prevState) => {
    //     this.props.setTrigger({
    //         refreshGrid: this.refreshGrid,
    //         search: this.search,
    //         addNewRow: this.addNewRow,
    //         updateRow: this.updateRow,
    //         getDataGrid: this.getDataGrid,
    //         // onRefreshComplete:this.onRefreshComplete
    //     })

    //     const { url } = this.props;

    //     if (prevState.pageSize !== this.state.pageSize || url !== prevProps.url) {
    //         await this.loadData();
    //     }
    // }

    loadData = async (dataSearch, isResetPage) => {
        const { url, rows, IsPagingServer } = this.props;

        // if (!url) {
        //     this.setState({ rows: this.props.rows })
        //     return;
        // }

        let filterObj = dataSearch || {};

        const pageSize = this.props.pageSize || this.state.pageSize;

        if (IsPagingServer) {
            filterObj = { ...dataSearch, page: isResetPage ? 0 : this.state.currentPage, pagesize: pageSize }
        }

        let objState = { isGettingData: true, pageSize: pageSize };

        if (isResetPage) {
            objState.currentPage = 0;
        }

        if (dataSearch) {
            objState.isFirstloading = true
        };

        this.setState({ ...objState, dataSearch: dataSearch })

        return new Promise(async (resolve, reject) => {

            if (!url) {
                this.setState({ isGettingData: false, isFirstloading: false, rowCount: 0, rows: [] });
                return resolve([]);
            }
            else {
                const res = await axios.get(url, { params: { ...filterObj } });

                this.props.onRefreshComplete && this.props.onRefreshComplete(res);
                this.setState({ isGettingData: false, isFirstloading: false, rowCount: res.totalCount, rows: res })
            }



            // api_get(url, filterObj).then((data) => {
            //     let rows = []
            //     if (data.hasOwnProperty("items"))
            //         rows = data.items;
            //     else rows = data;

            //     this.props.onRefreshComplete && this.props.onRefreshComplete(rows)
            //     this.setState({ isGettingData: false, isFirstloading: false, rowCount: data.totalCount, rows: rows })
            //     resolve(rows);
            // });
        });

    }

    render() {
        const {
            numberLoading,
            showLoading,
            IsPagingServer,
        } = this.props;

        const { isGettingData, isFirstloading, rows, currentPage, rowCount, isPaging } = this.state;
        const isShowLoading = showLoading === undefined ? isGettingData : showLoading;
        const pageSize = this.props.pageSize || this.state.pageSize;

        return (
            <React.Fragment>
                {
                    IsPagingServer
                        ? //<BoxLoading number={numberLoading || 3} show={isFirstloading}>
                        <StyledDataGrid
                            headerHeight={45}
                            rowHeight={30}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => {
                                this.setState({ pageSize: newPageSize });

                            }}
                            rowsPerPageOptions={[5, 10, 20]}

                            loading={isPaging}
                            rowCount={rowCount}
                            page={currentPage}
                            paginationMode="server"
                            onPageChange={(newPage) => { this.pageChange(newPage) }}
                            pagination

                            {...this.props}
                            rows={rows} //important below ...this.props
                        />
                        //</BoxLoading>
                        : //<BoxLoading number={numberLoading || 3} show={isFirstloading}>
                        <StyledDataGrid
                            headerHeight={45}
                            rowHeight={30}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => this.setState({ pageSize: newPageSize })}
                            rowsPerPageOptions={[10, 20, 50]}
                            pagination
                            {...this.props}
                            rows={rows} //important below ...this.props
                        />
                    //</BoxLoading>

                }
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

export default connect(mapStateToProps, mapDispatchToProps)(MuiDataGrid);