import React from 'react'
import { CandidateContext } from '../Interfaces/Candidate'

export const useCandidateContext = () => {
    const context = React.useContext(CandidateContext)
    if (context === undefined) {
        throw new Error(
            'useEmployeeContext must be used within an EmployeeProvider',
        )
    }
    return context
}
