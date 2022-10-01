const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //user
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    GET_USER_START: 'GET_USER_START',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    ADD_USER_FAIL: 'ADD_USER_FAIL',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_SUCCESS',

})

export default actionTypes;