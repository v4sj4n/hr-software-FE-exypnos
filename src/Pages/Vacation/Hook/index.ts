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
import { useParams } from 'react-router-dom'

export const useGetVacations = () => {
    return useQuery({
        queryKey: ['vacations'],
        queryFn: getAllVacations,
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
    const { id } = useParams()
    return useQuery({
        queryKey: ['userWithVacations', id],
        queryFn: () => getUserWithVacations(id as string),
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
