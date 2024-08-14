import { FormEvent, useContext } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getHoldings,
  getUserHoldings,
  handleItemAssign,
  handleItemReturn,
} from './queries'

export const useEmployeesWithHoldings = () => {
  const { searchParams } = useContext(HoldingsContext)
  const employeesWithHoldings = useQuery({
    queryKey: [
      'usersWithHoldings',
      searchParams.get('users'),
      searchParams.get('search'),
    ],
    queryFn: () =>
      getHoldings(
        searchParams.get('users') || '',
        searchParams.get('search') || ''
      ),
  })
  return employeesWithHoldings
}

export const useGetUserHoldings = () => {
  const { searchParams } = useContext(HoldingsContext)
  const userHoldings = useQuery({
    queryKey: ['userHoldings', searchParams.get('selected')],
    queryFn: () => getUserHoldings(searchParams.get('selected') as string),
  })
  return userHoldings
}

export const useHandleItemAssigner = () => {
  const queryClient = useQueryClient()
  const handleItemAssigner = useMutation({
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
  return handleItemAssigner
}

export const useHandleItemReturner = () => {
  const queryClient = useQueryClient()
  const handleItemReturner = useMutation({
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
  return handleItemReturner
}
