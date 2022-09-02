import axios from '../axios'

const handleLoginApi = async (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getUsers = async (id) => {
    return axios.get('/api/get-users', { params: { id: id } });
}

const createUser = async (postData) => {
    return axios.post('/api/create-user', { ...postData });
}

const editUser = async (postData) => {
    return axios.put('/api/edit-user', { ...postData });
}

const deleteUser = async (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

export {
    handleLoginApi,
    getUsers,
    createUser,
    editUser,
    deleteUser,
}
