import React from 'react'
import { EmployeeContext } from '../interfaces/Employe'

export const useEmployeeContext = () => {
    const context = React.useContext(EmployeeContext)
    if (context === undefined) {
        throw new Error(
            'useEmployeeContext must be used within an EmployeeProvider',
        )
    }
    return context
}
