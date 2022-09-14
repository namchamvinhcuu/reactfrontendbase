import axios from 'axios';
import _ from 'lodash';
import config from './config';


// console.log(process.env.REACT_APP_BACKEND_URL)

const instance = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: config.api.API_BASE_URL,
    timeout: 10 * 1000,
    withCredentials: true
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

export const isSuccessStatusCode = (s) => {
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

// let refreshtokenRequest = null;

// instance.interceptors.request.use(async (request) => {
//     if (
//         request.url.indexOf(process.env.REACT_APP_BACKEND_URL + 'login') >= 0
//         || request.url.indexOf(process.env.REACT_APP_BACKEND_URL + 'refreshtoken') >= 0
//         || request.url.indexOf(process.env.REACT_APP_BACKEND_URL + 'logout') >= 0
//     ) {
//         return request;
//     }
//     // else {

//     //     // let token = GetLocalStorage(ACCESS_TOKEN);
//     //     if (token) {

//     //         const tokenDecode = jwt_decode(token.Token);
//     //         const isExpired = dayjs.unix(tokenDecode.exp).diff(dayjs()) < 1;
//     //         if (!isExpired) {
//     //             request.headers.Authorization = `Bearer ${token.Token}`;
//     //             return request;
//     //         }

//     //         else {


//     //             console.log(refreshtokenRequest)
//     //             refreshtokenRequest = refreshtokenRequest
//     //                 ? refreshtokenRequest
//     //                 : axiosInstance.getNewAccessToken()

//     //             const response = await refreshtokenRequest;

//     //             // const response = await axiosInstance.getNewAccessToken()

//     //             refreshtokenRequest = null;

//     //             if (response && response !== '') {
//     //                 let newToken = {
//     //                     Token: response.Token ?? null,
//     //                     RefreshToken: response.RefreshToken ?? null
//     //                 };

//     //                 SetLocalStorage(ACCESS_TOKEN, newToken);
//     //                 request.headers.Authorization = `Bearer ${response.Token}`;
//     //                 return request;
//     //             }
//     //             else {
//     //                 WarnAlert('You lost your authorization, please login again !');
//     //                 await axiosInstance.Logout();
//     //                 return request;
//     //             }
//     //         }

//     //     }
//     //     else {
//     //         // WarnAlert('You lost your authorization, please login again !');
//     //         await instance.Logout();
//     //         return request;
//     //     }
//     // }

// }, err => {
//     return Promise.reject(err)
// });

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        }

        // Return direct data to callback
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        // Handle special case
        if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }

        const { data } = response;

        if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        }

        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }

        return Promise.reject(createError(response.status));
    }
);

export default instance;
