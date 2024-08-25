import React, { useState } from "react";
import { PayrollContext, PayrollRow } from "../Interface/Payroll";
import { usePayroll } from "../Hook";
import { GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export const PayrollProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [month, setMonth] = useState<number | undefined>(undefined);
    const [year, setYear] = useState<number | undefined>(undefined);
    const { data: payrollData = [] } = usePayroll(month, year)

    const navigate = useNavigate()

    const rows: PayrollRow[] = payrollData.map((payrollData, index) => ({
        id: index + 1,
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
    }))

    const columns = [
        { field: 'id', headerName: 'No',  flex: 0.5 },
        { field: 'fullName', headerName: 'Full Name',  flex: 1.7 },
        { field: 'netSalary', headerName: 'netSalary',  flex: 1.7 },
        { field: 'healthInsurance', headerName: 'healthInsurance',  flex: 1.7},
        { field: 'month', headerName: 'month', flex: 1 },
        { field: 'workingDays', headerName: 'workingDays', flex: 1.5 },
        { field: 'socialSecurity', headerName: 'socialSecurity',  flex: 1.5 },
        { field: 'grossSalary', headerName: 'grossSalary',  flex: 1 },
        { field: 'year', headerName: 'year', flex: 1.5 },
        { field: 'bonusDescription', headerName: 'bonusDescription',  flex: 2 },
    ]

    const headerTextColors = { firstName: '#0000FF' }

    const getRowId = (row: PayrollRow) => row.id;

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/payroll/user/${params.row.originalId}`)
    }

    const contextValue = {
        rows,
        columns,
        headerTextColors,
        getRowId,
        handleRowClick,
        setMonth,
        setYear
    }

    return (
        <PayrollContext.Provider value={contextValue}>
            {children}
        </PayrollContext.Provider>
    )
}