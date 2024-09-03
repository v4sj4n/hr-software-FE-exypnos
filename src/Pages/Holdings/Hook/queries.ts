import AxiosInstance from '@/Helpers/Axios'

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
    const response = await AxiosInstance.get(
        `/asset/user?users=${users}&search=${search}&page=${pageParam}&limit=${LIMIT}`,
    )
    return {
        data: response.data.data,
        totalPages: response.data.totalPages,
    }
}

export const getUserHoldings = async (userId: string) => {
    return (await AxiosInstance.get(`/asset/user/${userId}`)).data
}

export const getItem = async (itemId: string) => {
    console.log('Getting item:', itemId)
    return (await AxiosInstance.get(`/asset/${itemId}`)).data
}

export const handleItemReturn = async (
    assetId: string,
    status: string,
    returnDate: string,
) => {
    const payload = {
        userId: null,
        returnDate: returnDate,
        status,
    }
    await AxiosInstance.patch(`/asset/${assetId}`, payload)
}

export const handleItemAssign = async (
    assetId: string,
    userId: string,
    date: string,
) => {
    const payload = {
        userId,
        takenDate: date,
    }
    await AxiosInstance.patch(`/asset/${assetId}`, payload)
}
