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
import { useParams } from 'react-router-dom'

// export const useEmployeesWithHoldings = () => {
//     // const { searchParams } = useContext(HoldingsContext)
//     return useQuery({
//         queryKey: [
//             'usersWithHoldings',
//             // searchParams.get('users'),
//             // searchParams.get('search'),
//         ],
//         queryFn: () =>
//             getHoldings(
//                 // searchParams.get('users') || '',
//                 // searchParams.get('search') || '',
//             ),
//     })
// }

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
    const { id } = useParams()

    return useQuery({
        queryKey: ['userHoldings', id],
        queryFn: () => getUserHoldings(id as string),
    })
}

export const useGetItem = () => {
    const { searchParams } = useContext(HoldingsContext)

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
