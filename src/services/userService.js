import React from 'react'
import axios from '../axios'

const handleLoginApi = async (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getUsers = async (id) => {
    return axios.get('/api/get-users', { params: { id: id } });
}

export {
    handleLoginApi,
    getUsers,
}
