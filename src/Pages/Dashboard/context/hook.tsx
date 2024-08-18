import React, { createContext, useState, useContext } from 'react'

interface DashboardContextType {
    employeeData: {
        present: number
        absent: number
        onLeave: number
        remote: number
    }
    updateEmployeeData: (
        data: Partial<DashboardContextType['employeeData']>,
    ) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined,
)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [employeeData, setEmployeeData] = useState({
        present: 20,
        absent: 8,
        onLeave: 5,
        remote: 3,
    })

    const updateEmployeeData = (
        data: Partial<DashboardContextType['employeeData']>,
    ) => {
        setEmployeeData((prevData) => ({ ...prevData, ...data }))
    }

    return (
        <DashboardContext.Provider value={{ employeeData, updateEmployeeData }}>
            {children}
        </DashboardContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
    const context = useContext(DashboardContext)
    if (context === undefined) {
        throw new Error(
            'useDashboardContext must be used within a DashboardProvider',
        )
    }
    return context
}
