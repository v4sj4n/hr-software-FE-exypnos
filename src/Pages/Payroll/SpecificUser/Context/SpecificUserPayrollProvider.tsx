import React from "react";
import { PayrollContextSpecific, PayrollRowSpecifc } from "../interface";
import { usePayrollUserId } from "../../Hook";

export const PayrollProviderSpecific: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const { data: payrollId = [] } = usePayrollUserId();


    const rows: PayrollRowSpecifc[] = payrollId.map((payrollData, index) => ({
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
        { field: 'id', headerName: 'No', maxWidth: 70, flex: 1 },
        { field: 'fullName', headerName: 'Full Name', width: 150, flex: 1 },
        { field: 'netSalary', headerName: 'netSalary', width: 150, flex: 1 },
        { field: 'healthInsurance', headerName: 'healthInsurance', width: 150, flex: 1 },
        { field: 'month', headerName: 'month', width: 50, flex: 1 },
        { field: 'workingDays', headerName: 'workingDays', width: 50, flex: 1 },
        { field: 'socialSecurity', headerName: 'socialSecurity', width: 100, flex: 1 },
        { field: 'grossSalary', headerName: 'grossSalary', width: 100, flex: 1 },
        { field: 'year', headerName: 'year', width: 100, flex: 1 },
        { field: 'bonusDescription', headerName: 'bonusDescription', width: 100, flex: 1 },
    ]

    const headerTextColors = { firstName: '#0000FF' }

    const getRowId = (row: PayrollRowSpecifc) => row.id;

    const contextValue = {
        rows,
        columns,
        headerTextColors,
        getRowId,
    }

    return (
        <PayrollContextSpecific.Provider value={contextValue}>
            {children}
        </PayrollContextSpecific.Provider>
    )
}