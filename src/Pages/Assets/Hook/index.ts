import { useContext, useEffect } from 'react'
import { UserWithAsset } from '../TAsset'
import { AssetsContext } from '../AssetsContext'
import { useFetch } from '@/Hooks/useFetch'
import { User } from '@/Context/AuthProvider'

export const useGetUsersWithAssets = (searchParams: URLSearchParams) => {
  const users = searchParams.get('users') || 'all'
  const search = searchParams.get('search') || ''

  const { data, error, loading } = useFetch<UserWithAsset[]>(
    `/asset/user?users=${users}&search=${search}`,
    1
  )
  const { setUsersWithAssets } = useContext(AssetsContext)

  useEffect(() => {
    if (data) {
      setUsersWithAssets(data)
    }
  }, [data, setUsersWithAssets])

  return {
    error,
    loading,
  }
}

export const useOneAsset = <T>(serial: string) => {
  const { data, error, loading } = useFetch<T>(`/asset/sn/${serial}`)

  return {
    data,
    error,
    loading,
  }
}

export const useGetUsers = () => {
  const { data, error, loading } = useFetch<User[]>('/user', 30)

  return {
    data,
    error,
    loading,
  }
}

export const useGetAssetsOfAUser = (userId: string) => {
  const { setUserHoldings } = useContext(AssetsContext)

  const { data, loading, error } = useFetch<UserWithAsset>(
    `asset/user/${userId}`
  )

  setUserHoldings(data)

  return {
    error,
    loading,
  }
}
