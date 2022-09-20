import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userArr: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.GET_USER_START:
            console.log('get user start action in redux', action)
            return {
                ...state,
            }
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                userArr: [...action.userArr]
            }
        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                userArr: []
            }
        case actionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                newUser: action.newUser
            }
        case actionTypes.ADD_USER_FAIL:
            return {
                ...state,
                newUser: action.newUser
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                editUser: action.editUser
            }
        case actionTypes.EDIT_USER_FAIL:
            return {
                ...state,
                editUser: action.editUser
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default userReducer;