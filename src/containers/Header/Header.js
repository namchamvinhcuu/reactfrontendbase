import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "@actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { languages } from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    changeLanguage = async (language) => {
        //fire redux actions
        this.props.changeLanguage(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>


                <div className='change-language'>
                    <div className='welcome'>
                        <span><FormattedMessage id='header.welcome' />, {userInfo && userInfo.firstName} !</span>
                    </div>
                    {/** chuyển đổi ngôn ngữ */}
                    <div className={language === languages.VI ? 'change-language-vi active' : 'change-language-vi'}>
                        <span onClick={() => this.changeLanguage(languages.VI)}>
                            VN
                        </span>
                    </div>
                    <div className={language === languages.EN ? 'change-language-en active' : 'change-language-en'}>
                        <span onClick={() => this.changeLanguage(languages.EN)}>
                            EN
                        </span>
                    </div>

                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title='Log Out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.admin.isLoggedIn,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
