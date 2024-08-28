import AxiosInstance from '@/Helpers/Axios'
import { FormEvent } from 'react'

const LIMIT = 5

export const getHoldings = async ({
    pageParam,
    users,
    search,
}: {
    pageParam: number
    users: string
    search: string
}) => {
    console.log('Getting holdings:', pageParam)
    return new Promise((resolve) => {
        setTimeout(async () => {
            const response = await AxiosInstance.get(
                `/asset/user?users=${users}&search=${search}&page=${pageParam}&limit=${LIMIT}`,
            )
            resolve({
                data: response.data.data,
                totalPages: response.data.totalPages,
            })
        }, 1500)
    })
}

export const getUserHoldings = async (userId: string) => {
    return (await AxiosInstance.get(`/asset/user/${userId}`)).data
}

export const getItem = async (itemId: string) => {
    console.log('Getting item:', itemId)
    return (await AxiosInstance.get(`/asset/${itemId}`)).data
}

export const handleItemReturn = async (
    event: FormEvent<HTMLFormElement>,
    assetId: string,
    status: string,
    returnDate: string,
) => {
    event.preventDefault()
    const payload = {
        userId: null,
        returnDate: returnDate,
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
