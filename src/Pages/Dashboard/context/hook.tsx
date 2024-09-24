import AxiosInstance from '@/Helpers/Axios'
import React, { createContext, useState, useContext, useEffect } from 'react'

interface EmployeeData {
    present: number
    absent: number
    onLeave: number
    remote: number
}

interface DashboardContextType {
    employeeData: EmployeeData
    updateEmployeeData: (data: Partial<EmployeeData>) => void
    isLoading: boolean
    error: string | null
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined,
)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [employeeData, setEmployeeData] = useState<EmployeeData>({
        present: 0,
        absent: 0,
        onLeave: 0,
        remote: 0,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const updateEmployeeData = (data: Partial<EmployeeData>) => {
        setEmployeeData((prevData) => ({
            ...prevData,
            ...data,
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const [presentResponse, onLeaveResponse, remoteResponse] =
                    await Promise.all([
                        AxiosInstance.get('/user/remote/false'),
                        AxiosInstance.get('/vacation/onLeave'),
                        AxiosInstance.get('/user/remote/true'),
                    ])

                const present = presentResponse?.data
                const onLeave = onLeaveResponse?.data
                const remote = remoteResponse?.data
                const absent = present + remote

                setEmployeeData({ present, onLeave, remote, absent })

                console.log('Updated Employee Data:', {
                    present,
                    onLeave,
                    remote,
                    absent,
                })
            } catch (error) {
                console.error('Failed to fetch employee data:', error)
                setError(
                    'Failed to fetch employee data. Please try again later.',
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <DashboardContext.Provider
            value={{ employeeData, updateEmployeeData, isLoading, error }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext)
    if (context === undefined) {
        throw new Error(
            'useDashboardContext must be used within a DashboardProvider',
        )
    }
    return context
}
