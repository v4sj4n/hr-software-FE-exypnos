import { useAuth } from '@/Context/AuthProvider'
import AxiosInstance from '@/Helpers/Axios'
import { UserProfileData } from '@/Pages/Employees/interfaces/Employe'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployeePayroll, EmployePayroll } from './Interface'

export const useGetAndUpdateUserById = () => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<UserProfileData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { userRole, currentUser } = useAuth()

    const isCurrentUser = currentUser?._id === id
    const isAdmin = userRole === 'admin' || userRole === 'hr'

    useEffect(() => {
        setIsLoading(true)
        AxiosInstance.get<UserProfileData>(`/user/${id}`)
            .then((response) => {
                setUser(response.data)
                console.log('User fetched:', response.data)
                setError(null)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setError('Failed to fetch user data')
                setUser(null)
            })
            .finally(() => setIsLoading(false))
    }, [id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAdmin) return
        const { name, value } = event.target
        setUser((prevUser) => {
            if (!prevUser) return null
            if (name === 'email') {
                return {
                    ...prevUser,
                    auth: {
                        ...prevUser.auth,
                        email: value,
                    },
                }
            } else {
                return {
                    ...prevUser,
                    [name]: value,
                }
            }
        })
    }

    const handleUpdate = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!user) {
            setError('Only admins can update user information')
            return
        }

        const userToUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.auth.email,
            pob: user.pob,
            dob: user.dob,
            gender: user.gender,
        }

        setIsLoading(true)
        try {
            const response = await AxiosInstance.patch(
                `/user/${id}`,
                userToUpdate,
            )
            console.log('User updated successfully:', response.data)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error updating user:', error)
            setError('Failed to update user')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleChange,
        handleUpdate,
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
    }
}

export const useCreatePayroll = () => {
    const { id } = useParams<{ id: string }>()

    const [payroll, setPayroll] = useState<EmployePayroll>({
        workingDays: undefined,
        grossSalary: undefined,
        userId: id || '',
    })
    const [createToastOpen, setCreateToastOpen] = useState(false)
    const [createToastMessage, setCreateToastMessage] = useState('')
    const [createToastSeverity, setCreateToastSeverity] = useState<
        'success' | 'error'
    >('success')

    const handleChangePayroll = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target
        setPayroll((prevPayroll) => ({
            ...prevPayroll,
            [name]: value === '' ? undefined : Number(value),
        }))
    }

    const handleCreatePayroll = async (
        event: React.FormEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
        const fieldsToCreate = {
            ...payroll,
            workingDays: payroll.workingDays,
            grossSalary: payroll.grossSalary,
        }

        try {
            const response = await AxiosInstance.post('/salary', fieldsToCreate)
            console.log('Payroll created successfully:', response.data)
            setCreateToastOpen(true)
            setCreateToastMessage('Payroll created successfully')
            setCreateToastSeverity('success')
        } catch (error) {
            console.error('Error creating payroll:', error)
            setCreateToastOpen(true)
            setCreateToastMessage('Failed to create payroll')
            setCreateToastSeverity('error')
        }
    }

    const handleCreateToastClose = () => {
        setCreateToastOpen(false)
    }

    return {
        payroll,
        handleChangePayroll,
        handleCreatePayroll,
        createToastMessage,
        createToastOpen,
        createToastSeverity,
        handleCreateToastClose,
    }
}

export const useUpdatePayroll = () => {
    const { id } = useParams<{ id: string }>()
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const lastMonth = currentDate.getMonth() - 1

    const [EditingPayroll, setEditingPayroll] =
        useState<EmployeePayroll | null>(null)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )

    const { isLoading, error, status } = useQuery<EmployeePayroll[], Error>({
        queryKey: ['EditingPayroll', id, lastMonth, currentYear],
        queryFn: async () => {
            const url = `/salary/user/${id}?month=${lastMonth}&year=${currentYear}`
            const response = await AxiosInstance.get<EmployeePayroll[]>(url)
            console.log('Gerti', response.data[0]._id)
            setEditingPayroll(response.data[0])
            return response.data
        },
    })

    console.log(status)
    const handleUpdateChangePayroll = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target
        setEditingPayroll((prevPayroll) => {
            if (!prevPayroll) return null
            return {
                ...prevPayroll,
                [name]: value === '' ? undefined : Number(value),
            }
        })
    }

    const handleUpdatePayroll = async (
        event: React.FormEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
        if (!EditingPayroll) return

        const fieldsToUpdate = {
            workingDays: EditingPayroll.workingDays,
            grossSalary: EditingPayroll.grossSalary,
        }
        console.log(EditingPayroll)
        try {
            const response = await AxiosInstance.patch(
                `/salary/${EditingPayroll._id}`,
                fieldsToUpdate,
            )
            console.log('Payroll updated successfully:', response.data)
            setToastMessage('Payroll updated successfully')
            setToastOpen(true)
            setToastSeverity('success')
        } catch (error) {
            console.error('Error updating payroll:', error)
            setToastMessage('Error updating payroll')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const handleToastClose = () => {
        setToastOpen(false)
    }

    return {
        EditingPayroll,
        handleUpdateChangePayroll,
        handleUpdatePayroll,
        isLoading,
        error,
        handleToastClose,
        toastOpen,
        toastMessage,
        toastSeverity,
    }
}
