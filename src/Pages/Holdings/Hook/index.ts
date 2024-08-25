import { FormEvent, useContext } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getHoldings,
    getItem,
    getUserHoldings,
    handleItemAssign,
    handleItemReturn,
} from './queries'
import { useParams, useSearchParams } from 'react-router-dom'

export const useEmployeesWithHoldings = () => {
    const { searchParams } = useContext(HoldingsContext)
    return useQuery({
        queryKey: [
            'usersWithHoldings',
            searchParams.get('users'),
            searchParams.get('search'),
        ],
        queryFn: () =>
            getHoldings(
                searchParams.get('users') || '',
                searchParams.get('search') || '',
            ),
    })
}

export const useGetUserHoldings = () => {
    const { id } = useParams()

    return useQuery({
        queryKey: ['userHoldings', id],
        queryFn: () => getUserHoldings(id as string),
    })
}

export const useGetItem = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    return useQuery({
        queryKey: ['userHoldingsItem', searchParams.get('selectedOwnedItem')],
        queryFn: () => getItem(searchParams.get('selectedOwnedItem') as string),
    })
}

export const useHandleItemAssigner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            event,
            assetId,
            userId,
        }: {
            event: FormEvent<HTMLFormElement>
            assetId: string
            userId: string
        }) => handleItemAssign(event, assetId, userId),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['usersWithHoldings'],
            })
            queryClient.invalidateQueries({
                queryKey: ['userHoldings'],
            })
        },
    })
}

export const useHandleItemReturner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            event,
            assetId,
            status,
        }: {
            event: FormEvent<HTMLFormElement>
            assetId: string
            status: string
        }) => handleItemReturn(event, assetId, status),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['usersWithHoldings'],
            })
            queryClient.invalidateQueries({
                queryKey: ['userHoldings'],
            })
        },
    })
}
