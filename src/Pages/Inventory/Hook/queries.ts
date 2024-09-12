import AxiosInstance from '@/Helpers/Axios'

export const getAllInventoryItems = async (page: string, limit: string) => {
    const res = await AxiosInstance.get(`/asset?page=${page}&limit=${limit}`)
    return res.data
}

export const getOneInventoryItem = async (serial: string) => {
    const res = await AxiosInstance.get(`/asset/sn/${serial}`)
    return res.data
}

export const createInventoryItem = async (
    type: 'laptop' | 'monitor',
    serialNumber: string,
) => {
    const res = await AxiosInstance.post(`/asset`, { type, serialNumber })
    return res.data
}
