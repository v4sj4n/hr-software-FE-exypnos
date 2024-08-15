import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllVacations, getVacation, updateVacation } from './queries'
import {  useContext } from 'react'
import { VacationContext } from '../VacationContext'
import { VacationFormFields } from '@/Schemas/Vacations/Vacation.schema'

export const useGetVacations = () => {
  const allVacations = useQuery({
    queryKey: ['vacations'],
    queryFn: getAllVacations,
  })
  return allVacations
}

export const useGetVacation = (id: string) => {
  const { searchParams } = useContext(VacationContext)
  const singleVacation = useQuery({
    queryKey: ['vacation', id, searchParams.get('selectedVacation') as string],
    queryFn: () => getVacation(id),
  })
  return singleVacation
}

export const useUpdateVacation = () => {
  const { searchParams } = useContext(VacationContext)
  const queryClient = useQueryClient()

  const updateVacationMutation = useMutation({
    mutationFn: ({ vacation }: { vacation: VacationFormFields }) =>
      updateVacation(searchParams.get('selectedVacation') as string, vacation),
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
  return updateVacationMutation
}
