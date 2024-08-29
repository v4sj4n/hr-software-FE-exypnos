import { FormEvent, useContext } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import {
    getHoldings,
    getItem,
    getUserHoldings,
    handleItemAssign,
    handleItemReturn,
} from './queries'

export const useEmployeesWithHoldings = () => {
    const { searchParams } = useContext(HoldingsContext)

    return useInfiniteQuery({
        initialPageParam: 0,
        queryKey: [
            'usersWithHoldings',
            searchParams.get('users'),
            searchParams.get('search'),
        ],
        queryFn: ({ pageParam }) =>
            getHoldings({
                pageParam,
                search: searchParams.get('search') || '',
                users: searchParams.get('users') || '',
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.totalPages > allPages.length
                ? allPages.length + 1
                : undefined
        },
    })
}

export const useGetUserHoldings = () => {
    const { searchParams } = useContext(HoldingsContext)

    return useQuery({
        queryKey: ['userHoldings', searchParams.get('selectedUser')],
        queryFn: () =>
            getUserHoldings(searchParams.get('selectedUser') as string),
    })
}

export const useGetItem = () => {
    const { searchParams } = useContext(HoldingsContext)

    return useQuery({
        queryKey: ['userHoldingsItem', searchParams.get('ownedItem')],
        queryFn: () => getItem(searchParams.get('ownedItem') as string),
    })
}

export const useHandleItemAssigner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            event,
            assetId,
            userId,
            date,
        }: {
            event: FormEvent<HTMLFormElement>
            assetId: string
            userId: string
            date: string
        }) => handleItemAssign(event, assetId, userId, date),
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
            returnDate,
        }: {
            event: FormEvent<HTMLFormElement>
            assetId: string
            status: string
            returnDate: string
        }) => handleItemReturn(event, assetId, status, returnDate),
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
