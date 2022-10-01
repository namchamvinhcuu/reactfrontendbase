import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { languages } from '../../utils';

// import { changeLanguage } from '../../store/actions'
import * as actions from "@actions";

import './HomeHeader.scss'

class HomeHeader extends Component {



    changeLanguage = async (language) => {
        //fire redux actions
        this.props.changeLanguage(language);
    }

    render() {

        const { language } = this.props;

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>

                        <div className='home-header-content-left'>
                            <i className="fas fa-bars"></i>
                            <div className='home-header-content-left-logo'></div>
                        </div>

                        <div className='home-header-content-middle'>
                            <div className='content-middle-child'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.medical-specialty' />
                                    </b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id='home-header.find-doctor-by-specialty' />
                                </div>
                            </div>
                            <div className='content-middle-child'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.medical-institutions' />
                                    </b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id='home-header.choose-hospital-clinic' />
                                </div>
                            </div>
                            <div className='content-middle-child'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.doctor' />
                                    </b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id='home-header.choose-doctor' />
                                </div>
                            </div>
                            <div className='content-middle-child'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.fee' />
                                    </b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id='home-header.general-examination' />
                                </div>
                            </div>
                        </div>

                        <div className='home-header-content-right'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <span>
                                    <FormattedMessage id='home-header.support' />
                                </span>
                            </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(languages.VI)}>
                                    VN
                                </span>
                            </div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(languages.EN)}>
                                    EN
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='banner-up'>
                        <div className='home-header-banner-title'>
                            <div style={{ fontSize: "30px", marginTop: "30px", textTransform: "uppercase" }}>
                                <FormattedMessage id='banner.medical-background' />
                            </div>
                            <div style={{ fontWeight: "550", textTransform: "uppercase" }}>
                                <FormattedMessage id='banner.holistic-health-care' />
                            </div>
                        </div>

                        <div className='home-header-banner-search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>

                    <div className='banner-down'>
                        <div className='options'>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-hospital"></i>
                                </div>
                                <div className='option-child-text'>Khám Chuyên khoa</div>
                            </div>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className='option-child-text'>Khám từ xa</div>
                            </div>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-industry"></i>
                                </div>
                                <div className='option-child-text'>Khám tổng quát</div>
                            </div>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-x-ray"></i>
                                </div>
                                <div className='option-child-text'>Xét nghiệm y học</div>
                            </div>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-wrench"></i>
                                </div>
                                <div className='option-child-text'>Sức khỏe tinh thần</div>
                            </div>

                            <div className='options-child'>
                                <div className='option-child-icon'>
                                    <i className="fas fa-won-sign"></i>
                                </div>
                                <div className='option-child-text'>Khám nha khoa</div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.admin.isLoggedIn,
        isLoggedIn: state.user.isLoggedIn,

        /** using for multi-language */
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
