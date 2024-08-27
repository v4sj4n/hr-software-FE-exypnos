import AxiosInstance from '@/Helpers/Axios'
import { PayrollRow } from '../Interface/Payroll'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const usePayroll = (month?: number, year?: number) => {
    return useQuery<PayrollRow[], Error>({
        queryKey: ['payroll', month, year],
        queryFn: async () => {
            const url = `/salary${month !== undefined ? `?month=${month}` : ''}${year !== undefined ? `&year${year}` : ''}`
            const response = await AxiosInstance.get<PayrollRow[]>(url)
            console.log(response.data)
            return response.data
        },
    })
}

export const usePayrollUserId = (month?: number, year?: number) => {
    const { id } = useParams<{ id: string }>()
    return useQuery<PayrollRow[], Error>({
        queryKey: ['payrollId', id, month, year],
        queryFn: async () => {
            console.log(id)
            const url = `/salary/user/${id}${month !== undefined ? `?month=${month}` : ''}${year !== undefined ? `&year=${year}` : ''}`
            const response = await AxiosInstance.get<PayrollRow[]>(url)
            return response.data
        },
    })
}
