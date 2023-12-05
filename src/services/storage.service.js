import axiosApiInstance from '@/plugins/api'

export const uploadFile = async (formData) => {
    return await axiosApiInstance.post(`/storages/upload`, formData)
}
