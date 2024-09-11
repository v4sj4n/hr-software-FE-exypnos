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

export const useUpdateVacation = () => {
    const { searchParams } = useContext(VacationContext)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ vacation }: { vacation: VacationFormFields }) =>
            updateVacation(
                searchParams.get('selectedVacation') as string,
                vacation,
            ),
        onSuccess: () => {
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
export const useCreateVacation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ vacation }: { vacation: CreateVacationFormFields }) =>
            createVacation(vacation),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['vacations'],
            })
        },
    })
}

export const useUpdateVacationForm = (vacation: UseQueryResult<any, Error>) => {
    const { setErrors, setToastConfigs, handleCloseVacationModalOpen } =
        useContext(VacationContext)
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
            if (updater.isError) {
                setToastConfigs({
                    isOpen: true,
                    message:
                        updater.error?.message || 'Failed to update vacation',
                    severity: 'error',
                })
                if (updater.error instanceof AxiosError)
                    setErrors({
                        createError: null,
                        updateError: updater.error.response?.data,
                    })
                else {
                    setErrors({
                        createError: null,
                        updateError: 'something happened',
                    })
                }
            } else {
                setToastConfigs({
                    isOpen: true,
                    message: 'Vacation updated successfully',
                    severity: 'success',
                })
                handleCloseVacationModalOpen()
            }
        },
    })
    return { form }
}

export const useCreateVacationForm = () => {
    const { createVacationToggler, setErrors, setToastConfigs } =
        useContext(VacationContext)

    const { mutate, isError, error: mutationError } = useCreateVacation()

    const form = useForm<{
        description: string
        type: 'vacation' | 'sick' | 'personal' | 'maternity'
        startDate: string
        endDate: string
    }>({
        defaultValues: {
            description: '',
            type: 'vacation',
            startDate: dayjs(new Date()).format('YYYY-MM-DD'),
            endDate: dayjs(new Date()).add(2, 'day').format('YYYY-MM-DD'),
        },
        onSubmit: async ({ value }) => {
            mutate({ vacation: value })
            if (isError) {
                setToastConfigs({
                    isOpen: true,
                    message:
                        mutationError?.message || 'Failed to create vacation',
                    severity: 'error',
                })
                if (mutationError instanceof AxiosError)
                    setErrors({
                        createError: mutationError.response?.data,
                        updateError: null,
                    })
                else {
                    setErrors({
                        createError: 'something happened',
                        updateError: null,
                    })
                }
            } else {
                setToastConfigs({
                    isOpen: true,
                    message: 'Vacation created successfully',
                    severity: 'success',
                })
                createVacationToggler()
            }
        },
    })

    return { form }
}
