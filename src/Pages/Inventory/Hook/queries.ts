import AxiosInstance from '@/Helpers/Axios'
import { CreateInventoryItemFormFields } from '@/Schemas/Inventory/CreateInventoryItem.schema'

export const getAllInventoryItems = async (page: string, limit: string) => {
    const res = await AxiosInstance.get(`/asset?page=${page}&limit=${limit}`)
    return res.data
}

export const getOneInventoryItem = async (serial: string) => {
    const res = await AxiosInstance.get(`/asset/sn/${serial}`)
    return res.data
}

export const createInventoryItem = async (
    iventoryItem: CreateInventoryItemFormFields,
) => {
    const res = await AxiosInstance.post(`/asset`, iventoryItem)
    return res.data
}
