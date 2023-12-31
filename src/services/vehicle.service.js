import axiosApiInstance from '@/plugins/api'

export const getVehiclesApi = async () => {
    return await axiosApiInstance.get('/vehicles')
}

export const updateVehicleApi = async (id, data) => {
    delete data.id
    delete data.isEmailVerified
    delete data.balance
    return await axiosApiInstance.patch(`/vehicles/${id}`, data)
}

export const changeBalance = async (vehicleID, balance) => {
    return await axiosApiInstance.patch(`/vehicles/${vehicleID}/change-balance`, { balance: balance })
}

export const deleteVehicle = async (id) => {
    return await axiosApiInstance.delete(`/vehicles/${id}`)
}

export const getAllVehicles = async (page = 1, key_word = '', ownerID = '', pageSize = 8) => {
    let url = `/vehicles?page=${page}&pageSize=${pageSize}`
    if (key_word) {
        url += `&key_word=${key_word}`
    }
    if (ownerID) {
        url += `&ownerID=${ownerID}`
    }
    return await axiosApiInstance.get(url)
}

export const getSingleVehicle = async (id) => {
    return await axiosApiInstance.get(`/vehicles/${id}`)
}

export const updateVehicle = async (id, newVehicle) => {
    return await axiosApiInstance.put(`/vehicles/${id}`, newVehicle)
}

export const addVehicle = async (newVehicle) => {
    return await axiosApiInstance.post(`/vehicles`, newVehicle)
}
