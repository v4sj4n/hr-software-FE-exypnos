import React, { useState } from 'react'
import { PayrollContextSpecific, PayrollRowSpecifc } from '../interface'
import { GridPaginationModel } from '@mui/x-data-grid'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const PayrollProviderSpecific: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

const {id} = useParams()
    const [month, setMonth] = useState<number | undefined>(undefined)
    const [year, setYear] = useState<number | undefined>(undefined)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    
    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPage(model.page);
        setPageSize(model.pageSize);
    };

    const fetchPayroll = async (): Promise<{ data: PayrollRowSpecifc[], totalPages: number }> => {
        const response = await AxiosInstance.get<{ data: PayrollRowSpecifc[], totalPages: number }>(
        `/salary/user/${id}?month=${month}&year=${year}&limit=${pageSize}&page=${page}`
        )
        return response.data
    }

    const { data: payrollId, isPending } = useQuery<{ data: PayrollRowSpecifc[], totalPages: number }, Error>({
        queryKey: ['payrollId', month, year, page, pageSize],
        queryFn: () => fetchPayroll()
    })

    const rows: PayrollRowSpecifc[] = payrollId?.data.map((payrollData, index) => ({
        id: (page * pageSize) + index,
        originalId: payrollData.userId._id,
        netSalary: `${payrollData.netSalary}${payrollData.currency}`,
        healthInsurance: `${payrollData.healthInsurance}${payrollData.currency}`,
        month: payrollData.month,
        workingDays: payrollData.workingDays,
        socialSecurity: payrollData.socialSecurity,
        fullName: `${payrollData.userId.firstName} ${payrollData.userId.lastName}`,
        grossSalary: payrollData.grossSalary,
        year: payrollData.year,
        bonusDescription: payrollData.bonusDescription,
        currency: payrollData.currency,
        bonus: payrollData.bonus,
        userId: payrollData.userId._id,
    })) ?? []

    const columns = [
        { field: 'id', headerName: 'No', flex: 0.5 },
        { field: 'fullName', headerName: 'Full Name', flex: 1.7 },
        { field: 'netSalary', headerName: 'netSalary', flex: 1.7 },
        { field: 'healthInsurance', headerName: 'healthInsurance', flex: 1.7 },
        { field: 'month', headerName: 'month', flex: 1 },
        { field: 'workingDays', headerName: 'workingDays', flex: 1.5 },
        { field: 'socialSecurity', headerName: 'socialSecurity', flex: 1.5 },
        { field: 'grossSalary', headerName: 'grossSalary', flex: 1 },
        { field: 'year', headerName: 'year', flex: 1.5 },
        { field: 'bonusDescription', headerName: 'bonusDescription', flex: 2 },
    ]

    const headerTextColors = { firstName: '#0000FF' }

    const getRowId = (row: PayrollRowSpecifc) => row.id

    const contextValue = {
        rows,
        columns,
        headerTextColors,
        getRowId,
        setMonth,
        setYear,
        isPending,
        page,
        pageSize,
        totalPages: payrollId?.totalPages ?? 0,
        handlePaginationModelChange,
    }

    return (
        <PayrollContextSpecific.Provider value={contextValue}>
            {children}
        </PayrollContextSpecific.Provider>
    )
}
