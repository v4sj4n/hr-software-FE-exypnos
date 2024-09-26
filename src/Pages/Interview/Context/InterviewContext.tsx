import { createContext, useContext } from 'react'

import { InterviewContextType } from '../interface/interface'

export const InterviewContext = createContext<InterviewContextType | undefined>(
    undefined,
)

export const useInterviewContext = () => {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error(
            'useInterviewContext must be used within an InterviewProvider',
        )
    }
    return context
}
