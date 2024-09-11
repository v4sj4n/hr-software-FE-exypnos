import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
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
    // const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ vacation }: { vacation: CreateVacationFormFields }) =>
            createVacation(vacation),
        onSuccess: () => {
            console.log('HELLO')
            // queryClient.invalidateQueries({
            //     queryKey: ['vacations'],
            // })
            // queryClient.invalidateQueries({
            //     queryKey: ['vacation'],
            // })
            // queryClient.invalidateQueries({
            //     queryKey: [searchParams.get('selectedVacation') as string],
            // })
        },
    })
}
