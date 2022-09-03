import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {
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
                                <div><b>Chuyên Khoa</b></div>
                                <div className='sub-title'>Tìm bác sỹ theo chuyên khoa</div>
                            </div>
                            <div className='content-middle-child'>
                                <div><b>Cơ Sở Y Tế</b></div>
                                <div className='sub-title'>Chọn bệnh viện/phòng khám</div>
                            </div>
                            <div className='content-middle-child'>
                                <div><b>Bác Sỹ</b></div>
                                <div className='sub-title'>Chọn bác sỹ giỏi</div>
                            </div>
                            <div className='content-middle-child'>
                                <div><b>Gói Khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>

                        <div className='home-header-content-right'>
                            <i className="fas fa-question-circle"></i>
                            <div className='flag'>VN</div>
                        </div>

                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='banner-up'>
                        <div className='home-header-banner-title'>
                            <div style={{ fontSize: "30px", marginTop: "30px" }}>NỀN TẢNG Y TẾ</div>
                            <div style={{ fontWeight: "550" }}>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
