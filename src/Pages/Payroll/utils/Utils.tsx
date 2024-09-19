import AxiosInstance from "@/Helpers/Axios"
import { PayrollRow } from "../Interface/Payroll"

export const getMonthName = (monthNumber: number): string => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    return monthNames[monthNumber - 1]
}



// export const fetchEvents = async (
//     search: string,
//     pageParam: number,
// ): Promise<EventsData[]> => {
//     const Limit = 6
//     const response = await AxiosInstance.get<EventsData[]>(
//         `/event?search=${search}&page=${pageParam}&limit=${Limit}`,
//     )
//     return response.data
// }


export const fetchPayroll = async (
    month: number | undefined,
    year: number | undefined,
    page: number,
    fullName: string,
    workingDays: number | undefined,
    minNetSalary: number | undefined,
    maxNetSalary: number | undefined,
    bonus: number | undefined,
    ): Promise<PayrollRow[]> => {
        const pageSize = 6
        const response = await AxiosInstance.get<PayrollRow[]>(
            `/salary?month=${month}&year=${year}&bonus=${bonus}&maxNetSalary=${maxNetSalary}&minNetSalary=${minNetSalary}&workingDays=${workingDays}&fullName=${fullName}&limit=${pageSize}&page=${page}`,
        )
        return response.data
    }