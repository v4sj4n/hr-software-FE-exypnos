import AxiosInstance from "@/Helpers/Axios"
import { PayrollRow } from "../Interface/Payroll"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const usePayroll = () => {
   return useQuery<PayrollRow[], Error>({
    queryKey: ['payroll'],
    queryFn: async () => {
        const response = await AxiosInstance.get<PayrollRow[]>('/salary');
        return response.data
    }
   })
}


export const usePayrollUserId = () => {
    const { id } = useParams<{ id: string }>();
    return useQuery<PayrollRow[], Error>({
        queryKey: ['payrollId', id],
        queryFn: async () => {
            console.log(id)
            const response = await AxiosInstance.get<PayrollRow[]>(`/salary/user/${id}`);
            return response.data
        },
    })
}




