import AxiosInstance from '@/Helpers/Axios'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'

export const getAllVacations = async () => {
    const res = await AxiosInstance.get('/vacation')
    return res.data
}

export const getVacation = async (id: string) => {
    const res = await AxiosInstance.get(`/vacation/${id}`)
    return res.data
}

export const updateVacation = async (
    id: string,
    vacation: VacationFormFields,
) => {
    const res = await AxiosInstance.patch(`/vacation/${id}`, vacation)
    return res.data
}
