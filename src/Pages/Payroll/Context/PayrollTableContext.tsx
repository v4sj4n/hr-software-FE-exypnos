import React from 'react'
import { PayrollContext } from '../Interface/Payroll'

export const usePayrollContext = () => {
    const context = React.useContext(PayrollContext)
    if (context === undefined) {
        throw new Error(
            'usePayrollContext must be used within an PayroolProvider',
        )
    }
    return context
}
