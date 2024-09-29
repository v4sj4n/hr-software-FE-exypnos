import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from '@tanstack/react-query'
import {
    createVacation,
    getAllVacations,
    getMyVacations,
    getUsersWithVacations,
    getUserWithVacations,
    getVacation,
    updateVacation,
} from './queries'
import { useContext } from 'react'
import { VacationContext } from '../VacationContext'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'
import { CreateVacationFormFields } from '@/Schemas/Vacations/CreateVacation.schema'
import { useForm } from '@tanstack/react-form'
import dayjs from 'dayjs'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { AxiosError } from 'axios'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

export const useGetVacations = () => {
    const { searchParams } = useContext(VacationContext)

    return useQuery({
        queryKey: [
            'vacations',
            searchParams.get('page'),
            searchParams.get('limit'),
        ],
        queryFn: () =>
            getAllVacations(
                searchParams.get('page') as string,
                searchParams.get('limit') as string,
            ),
    })
}

export const useGetVacation = () => {
    const { searchParams } = useContext(VacationContext)
    return useQuery({
        queryKey: ['vacation', searchParams.get('selectedVacation')],
        queryFn: () => getVacation(searchParams.get('selectedVacation')!),
    })
}

export const useGetUsersWithVacations = () => {
    const { searchParams } = useContext(VacationContext)

    return useInfiniteQuery({
        initialPageParam: 0,
        queryKey: [
            'usersWithHoldings',
            searchParams.get('search'),
            searchParams.get('users'),
        ],
        queryFn: ({ pageParam }) =>
            getUsersWithVacations({
                pageParam,
                search: (searchParams.get('search') as string) || '',
                users: (searchParams.get('users') as string) || '',
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.totalPages > allPages.length
                ? allPages.length
                : undefined
        },
    })
}
export const useGetUserWithVacations = () => {
    const { searchParams } = useContext(VacationContext)
    return useQuery({
        queryKey: ['userWithVacations', searchParams.get('userId')],
        queryFn: () => getUserWithVacations(searchParams.get('userId')!),
    })
}

export const useCreateVacation = () => {
    const queryClient = useQueryClient()
    const { createVacationToggler, setErrors, setToastConfigs } =
        useContext(VacationContext)
    return useMutation({
        mutationFn: ({ vacation }: { vacation: CreateVacationFormFields }) =>
            createVacation(vacation),

        onError(error) {
            console.log('error', error)

            setToastConfigs({
                isOpen: true,
                message: 'Failed to create vacation',
                severity: 'error',
            })
            if (error instanceof AxiosError)
                setErrors({
                    createError: error?.response?.data.message,
                    updateError: null,
                })
            else {
                setErrors({
                    createError: 'an error happened, a vacation wasnt created',
                    updateError: null,
                })
            }
        },
        onSuccess: () => {
            setToastConfigs({
                isOpen: true,
                message: 'Vacation created successfully',
                severity: 'success',
            })
            createVacationToggler()
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['vacations'],
            })
        },
    })
}
export const useCreateVacationForm = () => {
    const vacationCreator = useCreateVacation()

    const form = useForm<{
        description: string
        type: 'vacation' | 'sick' | 'personal' | 'maternity'
        startDate: string
        endDate: string
    }>({
        defaultValues: {
            description: '',
            type: 'personal',
            startDate: dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD'),
            endDate: dayjs(new Date()).add(3, 'day').format('YYYY-MM-DD'),
        },
        onSubmit: async ({ value }) => {
            vacationCreator.mutate({ vacation: value })
        },
    })

    return { form }
}

export const useUpdateVacation = () => {
    const { setErrors, setToastConfigs, handleCloseVacationModalOpen } =
        useContext(VacationContext)
    const { searchParams } = useContext(VacationContext)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ vacation }: { vacation: VacationFormFields }) =>
            updateVacation(
                searchParams.get('selectedVacation') as string,
                vacation,
            ),
        onError(error) {
            setToastConfigs({
                isOpen: true,
                message: error?.message || 'Failed to update vacation',
                severity: 'error',
            })
            if (error instanceof AxiosError)
                setErrors({
                    createError: null,
                    updateError: error.response?.data.message,
                })
            else {
                setErrors({
                    createError: null,
                    updateError: 'something happened',
                })
            }
        },
        onSuccess: () => {
            setToastConfigs({
                isOpen: true,
                message: 'Vacation updated successfully',
                severity: 'success',
            })
            handleCloseVacationModalOpen()
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['vacations'],
            })
            queryClient.invalidateQueries({
                queryKey: ['vacation'],
            })
            queryClient.invalidateQueries({
                queryKey: [searchParams.get('selectedVacation') as string],
            })
        },
    })
}

export const useUpdateVacationForm = (vacation: UseQueryResult<any, Error>) => {
    const updater = useUpdateVacation()

    const form = useForm({
        defaultValues: {
            status: vacation.data.status,
            type: vacation.data.type,
            startDate: dayjs(vacation.data.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(vacation.data.endDate).format('YYYY-MM-DD'),
        },
        validatorAdapter: valibotValidator(),
        onSubmit: async ({ value }) => {
            value.endDate = dayjs(value.endDate).toISOString()
            value.startDate = dayjs(value.startDate).toISOString()
            updater.mutate({ vacation: value })
        },
    })
    return { form }
}

export const useGetMyVacations = () => {
    const { currentUser } = useAuth()
    return useQuery({
        queryKey: ['myvacations', currentUser?._id],
        queryFn: () => getMyVacations(currentUser?._id as string),
    })
}
