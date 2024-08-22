import AxiosInstance from "@/Helpers/Axios"
import { PayrollRow } from "../Interface/Payroll"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
// import React, { useState } from "react"

export const usePayroll = (month?: number, year?: number) => {
   return useQuery<PayrollRow[], Error>({
    queryKey: ['payroll', month, year],
    queryFn: async () => {
        const url = `/salary${month !== undefined ? `?month=${month}` : ''}${year !== undefined ? `&year${year}` : ''}`
        const response = await AxiosInstance.get<PayrollRow[]>(url);
        return response.data
    }
   })
}


export const usePayrollUserId = (month?: number, year?: number) => {
    const { id } = useParams<{ id: string }>();
    return useQuery<PayrollRow[], Error>({
        queryKey: ['payrollId', id, month, year],
        queryFn: async () => {
            console.log(id);
            const url = `/salary/user/${id}${month !== undefined ? `?month=${month}` : ''}${year !== undefined ? `&year=${year}` : ''}`;
            const response = await AxiosInstance.get<PayrollRow[]>(url);
            return response.data;
        },
    });
};


// interface CreatePayrollProps {
//     workingDays: number,
//     currency: string,
//     month: number,
//     year: string,

// }

// export const useCreatePayroll = () => {

//     const { id } = useParams<{ id: string }>();
//     const [createPayroll, setCreatePayroll] = useState<PayrollRow>({
//         workingDays:0,
//         currency:'',
//         month:'',
//         year:'',
//     })

//     const handleCahnge = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target

//         setCreatePayroll((prevPayroll) => ({
//            ...prevPayroll,
//             [name]: value,
//         }))
//     }

//     const handleCreateParoll = async (e: React.FormEvent<HTMLButtonElement>) => {
//         e.preventDefault()
//         await AxiosInstance.post(`/salary${id}`, createPayroll)
//         setCreatePayroll({
//             workingDays:0,
//             currency:'',
//             month:0,
//             year:'',
//         })
//     }
//     return{ handleCahnge, handleCreateParoll}
// }


