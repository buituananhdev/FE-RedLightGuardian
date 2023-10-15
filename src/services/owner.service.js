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

export const getAllOwners = async () => {
  return await axiosApiInstance.get('/owners')
}
