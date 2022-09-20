import actionTypes from './actionTypes'

import { userService } from '@services'

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const getUserStart = () => {
    // type: actionTypes.GET_USER_START,

    return async (dispatch, getState) => {
        try {
            const res = await userService.getUsers('all');
            if (res && res.errCode === 0) {
                dispatch(getUserSuccess([...res.users]));
            }
            else {
                dispatch(getUserFail());
            }
        } catch (error) {
            dispatch(getUserFail());
        }
    }

}

export const getUserSuccess = (userArr) => ({
    type: actionTypes.GET_USER_SUCCESS,
    userArr: userArr
})

export const getUserFail = () => ({
    type: actionTypes.GET_USER_FAIL
})

export const addUserSuccess = (newUser) => ({
    type: actionTypes.ADD_USER_SUCCESS,
    newUser: newUser
})

export const addUserFail = () => ({
    type: actionTypes.ADD_USER_FAIL,
    newUser: {}
})

export const editUserSuccess = (editUser) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    editUser: editUser
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
    editUser: {}
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

