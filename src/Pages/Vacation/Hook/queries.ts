import AxiosInstance from '@/Helpers/Axios'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'

const LIMIT = 5

export const getAllVacations = async (page: string, limit: string) => {
    return (await AxiosInstance.get(`/vacation?page=${page}&limit=${limit}`))
        .data
}

export const getUsersWithVacations = async ({
    pageParam,
    search,
    users,
}: {
    pageParam: number
    search: string
    users: string
}) => {
    const response = await AxiosInstance.get(
        `/vacation/user?search=${search}&users=${users}&page=${pageParam}&limit=${LIMIT}&startDate=2024-01-01T00:00:00.810Z&endDate=2025-01-01T10:00:00.810Z`,
    )
    return {
        data: response.data.data,
        totalPages: response.data.totalPages,
    }
}

export const getUserWithVacations = async (id: string) => {
    return (await AxiosInstance.get(`/vacation/user/${id}`)).data
}

export const getVacation = async (id: string) => {
    return (await AxiosInstance.get(`/vacation/${id}`)).data
}

export const updateVacation = async (
    id: string,
    vacation: VacationFormFields,
) => {
    return (await AxiosInstance.patch(`/vacation/${id}`, vacation)).data
}
