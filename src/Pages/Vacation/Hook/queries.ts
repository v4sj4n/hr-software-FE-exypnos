import AxiosInstance from '@/Helpers/Axios'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'

export const getAllVacations = async () => {
    return (await AxiosInstance.get('/vacation')).data
}

export const getUsersWithVacations = async () => {
    return (await AxiosInstance.get('/vacation/user')).data
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
