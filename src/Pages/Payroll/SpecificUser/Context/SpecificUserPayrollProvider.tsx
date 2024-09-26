import React, { useState } from 'react'
import { PayrollContextSpecific, PayrollRowSpecifc } from '../interface'
import { GridPaginationModel } from '@mui/x-data-grid'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getMonthName } from '../../utils/Utils'

export const PayrollProviderSpecific: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const { id } = useParams()
    const [month, setMonth] = useState<number | undefined>(undefined)
    const [year, setYear] = useState<number | undefined>(undefined)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPage(model.page)
        setPageSize(model.pageSize)
    }

    const { data, isPending } = useQuery({
        queryKey: ['payrollId', id, month, year, page, pageSize],
        queryFn: async () => {
            const res = await AxiosInstance.get(
                `/salary/user/${id}?month=${month}&year=${year}&limit=${pageSize}&page=${page}`,
            )
            return res.data
        },
    })

    const payrollId = data?.data ?? []
    const totalPages = data?.totalPages ?? 0

    const rows: PayrollRowSpecifc[] =
        payrollId.map((payrollData: any, index: number) => ({
            id: page * pageSize + index + 1,
            originalId: payrollData.userId._id,
            netSalary: `${Number(payrollData.netSalary).toLocaleString()}${payrollData.currency}`,
            healthInsurance: `${Number(payrollData.healthInsurance).toLocaleString()}${payrollData.currency}`,
            month: getMonthName(payrollData.month),
            workingDays: payrollData.workingDays,
            socialSecurity: Number(payrollData.socialSecurity).toLocaleString(),
            fullName: `${payrollData.userId.firstName} ${payrollData.userId.lastName}`,
            grossSalary: Number(payrollData.grossSalary).toLocaleString(),
            year: payrollData.year,
            bonusDescription: payrollData.bonusDescription,
            currency: payrollData.currency,
            bonus: Number(payrollData.bonus).toLocaleString(),
            userId: payrollData.userId._id,
        })) ?? []

    const columns = [
        { field: 'id', headerName: 'No', flex: 0.5 },
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        { field: 'netSalary', headerName: ' Net Salary', flex: 1 },
        { field: 'healthInsurance', headerName: 'Health Insurance', flex: 1 },
        { field: 'month', headerName: 'Month', flex: 1 },
        { field: 'workingDays', headerName: 'Working Days', flex: 1 },
        { field: 'socialSecurity', headerName: 'Social Security', flex: 1 },
        { field: 'grossSalary', headerName: 'Gross Salary', flex: 1 },
        { field: 'year', headerName: 'Year', flex: 0.8 },
        { field: 'bonus', headerName: 'Bonus', flex: 0.7 },
        { field: 'bonusDescription', headerName: 'Bonus Description', flex: 2 },
    ]

    const getRowId = (row: PayrollRowSpecifc) => row.id

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value
        const [yearString, monthString] = date.split('-')
        setYear(parseInt(yearString))
        setMonth(parseInt(monthString))
    }

    const contextValue = {
        handleDateChange,
        rows,
        columns,
        getRowId,
        isPending,
        page,
        pageSize,
        totalPages: totalPages,
        handlePaginationModelChange,
        fullName: payrollId[0]
            ? `${payrollId[0].userId.firstName} ${payrollId[0].userId.lastName}`
            : '',
    }

    return (
        <PayrollContextSpecific.Provider value={contextValue}>
            {children}
        </PayrollContextSpecific.Provider>
    )
}
