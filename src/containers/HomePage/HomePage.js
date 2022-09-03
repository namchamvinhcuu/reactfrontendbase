import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';

class HomePage extends Component {

    render() {
        // const { isLoggedIn } = this.props;
        // let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';

        return (
            <HomeHeader />
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.admin.isLoggedIn,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
