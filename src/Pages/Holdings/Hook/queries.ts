import AxiosInstance from '@/Helpers/Axios'
import { FormEvent } from 'react'

export const getHoldings = async (users: string, search: string) => {
    return (
        await AxiosInstance.get(`/asset/user?users=${users}&search=${search}`)
    ).data
}

export const getUserHoldings = async (userId: string) => {
    return (await AxiosInstance.get(`/asset/user/${userId}`)).data
}

export const getItem = async (itemId: string) => {
    return (await AxiosInstance.get(`/asset/${itemId}`)).data
}

export const handleItemReturn = async (
    event: FormEvent<HTMLFormElement>,
    assetId: string,
    status: string,
) => {
    event.preventDefault()
    const payload = {
        userId: null,
        returnDate: new Date().toISOString(),
        status,
    }
    await AxiosInstance.patch(`/asset/${assetId}`, payload)
}

export const handleItemAssign = async (
    event: FormEvent<HTMLFormElement>,
    assetId: string,
    userId: string,
) => {
    event.preventDefault()
    const payload = {
        userId,
        takenDate: new Date().toISOString(),
    }
    await AxiosInstance.patch(`/asset/${assetId}`, payload)
}
