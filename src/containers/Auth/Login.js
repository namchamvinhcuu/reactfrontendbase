import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            isShowPassword: false,
        }
    }

    handleOnChangeInputUserName = (event) => {
        this.setState({
            userName: event.target.value,
            // passWord: event.target.value,
        })
    }

    handleOnChangeInputPassword = (event) => {
        this.setState({
            passWord: event.target.value,
            // passWord: event.target.value,
        })
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleLogin = () => {
        console.log('current-state: ', this.state);
        this.setState({
            userName: '',
            passWord: '',
            isShowPassword: false,
        })
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>

                        <div className='col-12 login-text'>Login</div>

                        <div className='col-12 form-group login-input'>
                            <label>Username: </label>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.userName}
                                onChange={(event) => this.handleOnChangeInputUserName(event)}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    value={this.state.passWord}
                                    onChange={(event) => this.handleOnChangeInputPassword(event)}
                                />
                                <span onClick={() => {
                                    this.handleShowHidePassword();
                                }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>

                        <div className='col-12'>
                            <button
                                className='login-btn'
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >Sign In</button>
                        </div>

                        <div className='col-12 text-right'>
                            <span className='forgot-password'>Forgot password ?</span>
                        </div>

                        <div className='col-12 text-center'>
                            <span>Or login with:</span>
                        </div>

                        <div className='col-12 login-social'>
                            <i className='fab fa-google-plus-g google-icon'></i>
                            <i className="fab fa-facebook-f facebook-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
