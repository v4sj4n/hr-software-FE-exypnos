import { useQuery } from '@tanstack/react-query'
import { getAllVacations } from './queries'

export const useGetVacations = () => {
  const employeesWithHoldings = useQuery({
    queryKey: ['vacations'],
    queryFn: getAllVacations,
  })
  return employeesWithHoldings
}
