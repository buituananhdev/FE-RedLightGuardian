import axiosApiInstance from '@/plugins/api'
export const getViolationsApi = async () => {
    return await axiosApiInstance.get('/violations')
}
export const updateViolationApi = async (id, data) => {
    delete data.id
    delete data.isEmailVerified
    delete data.balance
    return await axiosApiInstance.patch(`/violations/${id}`, data)
}
export const changeBalance = async (violationID, balance) => {
    return await axiosApiInstance.patch(`/violations/${violationID}/change-balance`, { balance: balance })
}

export const deleteViolation = async (id) => {
    return await axiosApiInstance.delete(`/violations/${id}`)
}

export const getAllViolations = async () => {
    return await axiosApiInstance.get('/violations')
}

export const getSingleViolation = async (id) => {
    return await axiosApiInstance.get(`/violations/${id}`)
}

export const updateViolation = async (id, newViolation) => {
    return await axiosApiInstance.put(`/violations/${id}`, newViolation)
}
