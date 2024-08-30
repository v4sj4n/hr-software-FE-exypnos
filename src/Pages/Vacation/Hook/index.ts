import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getAllVacations,
    getUsersWithVacations,
    getUserWithVacations,
    getVacation,
    updateVacation,
} from './queries'
import { useContext } from 'react'
import { VacationContext } from '../VacationContext'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'

export const useGetVacations = () => {
    const { searchParams } = useContext(VacationContext)

    return useQuery({
        queryKey: ['vacations',
            searchParams.get('page'),
            searchParams.get('limit'),
        ],
        queryFn: () => getAllVacations(searchParams.get('page') as string, searchParams.get('limit') as string),
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
    return useQuery({
        queryKey: ['usersWithVacations'],
        queryFn: () => getUsersWithVacations(),
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
