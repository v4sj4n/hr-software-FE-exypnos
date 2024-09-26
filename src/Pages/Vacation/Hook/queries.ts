import AxiosInstance from '@/Helpers/Axios'
import { CreateVacationFormFields } from '@/Schemas/Vacations/CreateVacation.schema'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'
import {
    UsersWithVacations,
    UserWithVacation,
    Vacation,
    Vacations,
} from '../types'

const LIMIT = 5

export const getAllVacations = async (
    page: string,
    limit: string,
): Promise<Vacations> => {
    return (await AxiosInstance.get(`/vacation?page=${page}&limit=${limit}`))
        .data
}

export const getMyVacations = async (
    id: string,
): Promise<{ data: UserWithVacation }> => {
    return await AxiosInstance.get(`/vacation/user/${id}`)
}

export const getUsersWithVacations = async ({
    pageParam,
    search,
    users,
}: {
    pageParam: number
    search: string
    users: string
}): Promise<UsersWithVacations> => {
    const response = await AxiosInstance.get(
        `/vacation/user?search=${search}&users=${users}&page=${pageParam}&limit=${LIMIT}&startDate=2024-01-01T00:00:00.810Z&endDate=2025-01-01T10:00:00.810Z`,
    )
    return {
        data: response.data.data,
        totalPages: response.data.totalPages,
        all: response.data.all,
    }
}

export const getUserWithVacations = async (
    id: string,
): Promise<UserWithVacation> => {
    return (await AxiosInstance.get(`/vacation/user/${id}`)).data
}

export const getVacation = async (id: string): Promise<Vacation> => {
    return (await AxiosInstance.get(`/vacation/${id}`)).data
}

export const updateVacation = async (
    id: string,
    vacation: VacationFormFields,
) => {
    return (await AxiosInstance.patch(`/vacation/${id}`, vacation)).data
}
export const createVacation = async (vacation: CreateVacationFormFields) => {
    return (await AxiosInstance.post(`/vacation`, vacation)).data
}
