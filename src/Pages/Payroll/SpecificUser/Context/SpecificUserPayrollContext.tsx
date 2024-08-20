import React from 'react'
import { PayrollContextSpecific } from '../interface'

export const usePayrollContextSpecific = () => {
    const context = React.useContext(PayrollContextSpecific)
    if (context === undefined) {
        throw new Error(
            'usePayrollContext must be used within an PayroolProvider',
        )
    }
    return context
}
