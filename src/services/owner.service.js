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

export const getAllOwners = async (page = 1, pageSize = 8, key_word = '') => {
    let url = `/owners?page=${page}&pageSize=${pageSize}`
    if (key_word) {
        url += `&key_word=${key_word}`
    }
    return await axiosApiInstance.get(url)
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
