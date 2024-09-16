import React, { useState } from 'react'
import { PayrollContext, PayrollRow } from '../Interface/Payroll'
import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { getMonthName } from '../utils/Utils'

export const PayrollProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [month, setMonth] = useState<number | undefined>(undefined)
    const [year, setYear] = useState<number | undefined>(undefined)
    const [fullName, setFullName] = useState('')
    const [bonus, setBonus] = useState<number | undefined>(undefined)
    const [minNetSalary, setMinNetSalary] = useState<number | undefined>(undefined)
    const [maxNetSalary, setMaxNetSalary] = useState<number | undefined>(undefined)
    const [workingDays, setWorkingDays] = useState<number | undefined>(undefined)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPage(model.page)
        setPageSize(model.pageSize)
    }

    const navigate = useNavigate()

    const fetchPayroll = async() => {
        const response = await AxiosInstance.get<{data: PayrollRow[], totalPages: number}>
        (
`/salary?month=${month}&year=${year}&bonus=${bonus}&maxNetSalary=${maxNetSalary}&minNetSalary=${minNetSalary}&workingDays=${workingDays}&fullName=${fullName}&limit=${pageSize}&page=${page}`,
        )
        return response.data
    }

    const {
        data: payrollData,
        isPending,
        isError,
    } = useQuery<{ data: PayrollRow[]; totalPages: number }, Error>({
        queryKey: [
            'payroll',
            month,
            year,
            page,
            pageSize,
            fullName,
            workingDays,
            minNetSalary,
            maxNetSalary,
            bonus,
        ],
        queryFn: () => fetchPayroll(),
    })

    const rows: PayrollRow[] =
        payrollData?.data.map((payrollItem, index) => ({
            id: page * pageSize + index + 1,
            originalId: payrollItem.userId._id,
            netSalary: `${payrollItem.netSalary}${payrollItem.currency}`,
            healthInsurance: `${payrollItem.healthInsurance}${payrollItem.currency}`,
            month: getMonthName(payrollItem.month),
            workingDays: payrollItem.workingDays,
            tax: payrollItem.tax,
            socialSecurity: payrollItem.socialSecurity,
            fullName: `${payrollItem.userId.firstName} ${payrollItem.userId.lastName}`,
            grossSalary: payrollItem.grossSalary,
            year: payrollItem.year,
            bonusDescription: payrollItem.bonusDescription,
            currency: payrollItem.currency,
            bonus: payrollItem.bonus,
            userId: payrollItem.userId._id,
        })) ?? []

    const columns = [
        { field: 'id', headerName: 'No', flex: 0.5 },
        { field: 'fullName', headerName: 'Full Name', flex: 1.7 },
        { field: 'netSalary', headerName: 'Net Salary', flex: 1.7 },
        { field: 'healthInsurance', headerName: 'Health Insurance', flex: 1.7 },
        { field: 'month', headerName: 'Month', flex: 1 },
        { field: 'workingDays', headerName: 'Working Days', flex: 1.5 },
        { field: 'socialSecurity', headerName: 'Social Security', flex: 1.5 },
        { field: 'grossSalary', headerName: 'Gross Salary', flex: 1 },
        { field: 'year', headerName: 'Year', flex: 1.5 },
        { field: 'bonus', headerName: 'Bonus', flex: 1.2 },
        { field: 'bonusDescription', headerName: 'Bonus Description', flex: 2 },
        { field: 'tax', headerName: 'Tax', flex: 2 },
    ]

    const getRowId = (row: PayrollRow) => row.id

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/payroll/user/${params.row.originalId}`)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value
        const [yearString, monthString] = date.split('-')
        setYear(parseInt(yearString))
        setMonth(parseInt(monthString))
    }

    const handleFullNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFullName(event.target.value)
    }

    const handleWorkingDaysChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWorkingDays(parseInt(event.target.value))
    }

    const handleMinSalaryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMinNetSalary(parseFloat(event.target.value))
    }

    const handleMaxSalaryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMaxNetSalary(parseFloat(event.target.value))
    }

    const handleBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBonus(parseFloat(event.target.value))
    }

    const contextValue = {
        rows,
        columns,
        getRowId,
        handleRowClick,
        setFullName,
        setMaxNetSalary,
        setMinNetSalary,
        setMonth,
        setYear,
        isPending,
        isError,
        setBonus,
        setWorkingDays,
        page,
        pageSize,
        totalPages: payrollData?.totalPages ?? 0,
        handlePaginationModelChange,
        handleDateChange,
        handleFullNameChange,
        handleWorkingDaysChange,
        handleMinSalaryChange,
        handleMaxSalaryChange,
        handleBonusChange,
    }

    return (
        <PayrollContext.Provider value={contextValue}>
            {children}
        </PayrollContext.Provider>
    )
}
