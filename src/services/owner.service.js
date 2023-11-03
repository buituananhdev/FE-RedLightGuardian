import axiosApiInstance from '@/plugins/api'
export const getOwnersApi = async () => {
    return await axiosApiInstance.get('/owners')
}
export const updateOwnerApi = async (id, data) => {
    delete data.id
    delete data.isEmailVerified
    delete data.balance
    return await axiosApiInstance.patch(`/owners/${id}`, data)
}
export const changeBalance = async (ownerID, balance) => {
    return await axiosApiInstance.patch(`/owners/${ownerID}/change-balance`, { balance: balance })
}
export const deleteOwner = async (id) => {
    return await axiosApiInstance.delete(`/owners/${id}`)
}

export const getAllOwners = async (key_word = '', page = 1, pageSize = 10) => {
    return await axiosApiInstance.get(`/owners?key_word=${key_word}&page=${page}&pageSize=${pageSize}`)
}

export const getSingleOwner = async (id) => {
    return await axiosApiInstance.get(`/owners/${id}`)
}

export const updateOwner = async (id, newOwner) => {
    return await axiosApiInstance.put(`/owners/${id}`, newOwner)
}

export const addOwner = async (newOwner) => {
    return await axiosApiInstance.post(`/owners`, newOwner)
}
