import axiosApiInstance from '@/plugins/api'

export const getCamerasApi = async () => {
    return await axiosApiInstance.get('/cameras')
}

export const updateCameraApi = async (id, data) => {
    delete data.id
    delete data.isEmailVerified
    delete data.balance
    return await axiosApiInstance.patch(`/cameras/${id}`, data)
}

export const changeBalance = async (cameraID, balance) => {
    return await axiosApiInstance.patch(`/cameras/${cameraID}/change-balance`, { balance: balance })
}

export const getCameraById = async (id) => {
    return await axiosApiInstance.get(`/cameras/${id}`)
}

export const updateCoordinatesCamera = async (id, newCoordinates) => {
    return await axiosApiInstance.patch(`/cameras/${id}`, { newCoordinates: newCoordinates })
}
