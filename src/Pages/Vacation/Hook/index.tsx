import { useContext, useEffect } from 'react'
import { useFetch } from '@/Hooks/useFetch'
import { Vacation } from '../TVacation'
import { VacationContext } from '../VacationContext'

export const useData = () => {
  const { data, error, loading } = useFetch<Vacation[]>('/vacation', 10)

  const { setVacations } = useContext(VacationContext)

  useEffect(() => {
    if (data) {
      console.log(data)
      setVacations(data)
    }
  }, [data, setVacations])

  return {
    error,
    loading,
  }
}
