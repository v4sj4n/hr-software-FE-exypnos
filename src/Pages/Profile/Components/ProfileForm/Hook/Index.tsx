import AxiosInstance from '@/Helpers/Axios'
import { UserProfileData } from '@/Pages/Employees/interfaces/Employe'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EmployeePayroll, EmployePayroll } from '../Interface/Interface'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { AxiosError } from 'axios'

export const useGetAndUpdateUserById = () => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<UserProfileData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [updateToastOpen, setUpdateToastOpen] = useState(false)
    const [updateToastMessage, setUpdateToastMessage] = useState('')
    const [updateToastSeverity, setUpdateToastSeverity] = useState<
        'success' | 'error'
    >('success')
    const { userRole, currentUser } = useAuth()

    const isCurrentUser = currentUser?._id === id
    const isAdmin = userRole === 'hr'
  const engagement=[
        'full_time_remote','full_time_on_site','part_time_remote','part_time_on_site', 'internship','external',
    ]
    const genderOptions = ['Male', 'Female']
    const [isCancel, setIsCancel] = useState(false)

    const Places = [
        'Tirana',
        'Durrës',
        'Vlorë',
        'Shkodër',
        'Fier',
        'Elbasan',
        'Korçë',
        'Berat',
        'Lushnjë',
        'Pogradec',
        'Lezhë',
        'Gjirokastër',
        'Kukës',
        'Sarandë',
        'Kavajë',
        'Kamëz',
        'Laç',
        'Patos',
        'Tepelenë',
        'Përmet',
        'Gramsh',
        'Librazhd',
        'Rrëshen',
        'Bulqizë',
        'Peshkopi',
        'Çorovodë',
        'Divjakë',
        'Krujë',
        'Himarë',
        'Ersekë',
        'Delvinë',
        'Mallakastër',
        'Ballsh',
        'Bajram Curri',
        'Selenicë',
    ]

    const position = [
        'designer',
        'backend_developer',
        'frontend_developer',
        'fullstack_developer',
        'tester',
        'devops',
    ]

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
    const handleCancel = async () => {
        if (!isAdmin) {
            setError('Only admins can delete users')
            return
        }
        setIsLoading(true)
        try {
            await AxiosInstance.delete(`/user/${id}`)
            setIsCancel(true)
            setUpdateToastOpen(true)
            setUpdateToastMessage('User has been successfully deleted.')
            setUpdateToastSeverity('success')
        } catch (error) {
            console.error('Error deleting user:', error)
            setError('Failed to delete user')
            setUpdateToastOpen(true)
            setUpdateToastMessage('Error occurred while deleting user.')
            setUpdateToastSeverity('error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGenderChange = (value: string | string[]) => {
        if (!isAdmin) return
        setUser((prevUser) => {
            if (!prevUser) return null
            return {
                ...prevUser,
                gender: Array.isArray(value) ? value[0] : value,
            }
        })
    }

    const handlePositionChange = (value: string | string[]) => {
        if (!isAdmin) return
        setUser((prevUser) => {
            if (!prevUser) return null
            return {
                ...prevUser,
                position: Array.isArray(value) ? value[0] : value,
            }
        })
    }

    const handleEngagementChange = (value: string | string[]) => {
        if (!isAdmin) return
        setUser((prevUser) => {
            if (!prevUser) return null
            return {
                ...prevUser,
                engagement: Array.isArray(value) ? value[0] : value,
            }
        })
    }

    const handlePlaceChange = (value: string | string[]) => {
        if (!isAdmin) return
        setUser((prevUser) => {
            if (!prevUser) return null
            return {
                ...prevUser,
                pob: Array.isArray(value) ? value[0] : value,
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
            pob: user.pob,
            position: user.position,
            dob: user.dob,
            gender: user.gender,
            email: user.auth.email,
            engagement: user.engagement,
        }

        try {
            const response = await AxiosInstance.patch(
                `/user/${id}`,
                userToUpdate,
            )
            setUpdateToastOpen(true)
            setUpdateToastMessage('User updated successfully')
            setUpdateToastSeverity('success')
            setUser(response.data)
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setUpdateToastOpen(true)
                setUpdateToastMessage(error.response?.data.message)
                setUpdateToastSeverity('error')
            }
        }
    }

    const handleUpdateToastClose = () => {
        setUpdateToastOpen(false)
    }

    return {
        handleChange,
        handleGenderChange,
        genderOptions,
        handleUpdate,
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
        updateToastOpen,
        updateToastMessage,
        updateToastSeverity,
        handleUpdateToastClose,
        handlePlaceChange,
        Places,
        handleCancel,
        isCancel,
        setIsCancel,
        position,
        handlePositionChange,
        engagement,
        handleEngagementChange
    }
}

export const useCreatePayroll = () => {
    const { id } = useParams<{ id: string }>()

    const [payroll, setPayroll] = useState<EmployePayroll>({
        workingDays: undefined,
        grossSalary: undefined,
        userId: id || '',
        bonus: undefined,
        extraHours: undefined,
        bonusDescription: '',
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
            [name]: [
                'workingDays',
                'grossSalary',
                'bonus',
                'extraHours',
            ].includes(name)
                ? value === ''
                    ? undefined
                    : Number(value)
                : value,
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
            bonus: payroll.bonus,
            extraHours: payroll.extraHours,
            bonusDescription: payroll.bonusDescription,
        }

        try {
            const response = await AxiosInstance.post('/salary', fieldsToCreate)
            console.log('Payroll created successfully:', response.data)
            setCreateToastOpen(true)
            setCreateToastMessage('Payroll created successfully')
            setCreateToastSeverity('success')
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setCreateToastOpen(true)
                setCreateToastMessage(error.response?.data.message)
                setCreateToastSeverity('error')
            }
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

    const { isLoading, error } = useQuery<EmployeePayroll[], Error>({
        queryKey: ['EditingPayroll', id, lastMonth, currentYear],
        queryFn: async () => {
            const url = `/salary/user/${id}?month=${lastMonth}&year=${currentYear}`
            const response = await AxiosInstance.get<EmployeePayroll[]>(url)
            console.log('Gerti', response.data[0]._id)
            setEditingPayroll(response.data[0])
            return response.data
        },
    })

    const handleUpdateChangePayroll = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target
        setEditingPayroll((prevPayroll) => {
            if (!prevPayroll) return null
            return {
                ...prevPayroll,
                [name]: [
                    'workingDays',
                    'grossSalary',
                    'bonus',
                    'extraHours',
                ].includes(name)
                    ? value === ''
                        ? undefined
                        : Number(value)
                    : value,
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
            bonus: EditingPayroll.bonus,
            extraHours: EditingPayroll.extraHours,
            bonusDescription: EditingPayroll.bonusDescription,
        }
        console.log(EditingPayroll)
        try {
            const response = await AxiosInstance.patch(
                `/salary/${EditingPayroll._id}`,
                fieldsToUpdate,
            )
            console.log('Payroll updated successfully:', response.data)
            setToastMessage('profile updated successfully')
            setToastOpen(true)
            setToastSeverity('success')
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setToastMessage(err.response?.data.message)
                setToastSeverity('error')
                setToastOpen(true)
            }
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
