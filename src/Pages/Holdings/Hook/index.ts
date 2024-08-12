import { FormEvent, useContext, useEffect } from 'react'
import { UserWithHoldings } from '../TAsset'
import { HoldingsContext } from '../HoldingsContext'
import { useFetch } from '@/Hooks/useFetch'
import { User } from '@/Context/AuthProvider'
import AxiosInstance from '@/Helpers/Axios'

export const useGetUsersWithHoldings = (searchParams: URLSearchParams) => {
  const users = searchParams.get('users') || 'all'
  const search = searchParams.get('search') || ''

  const { data, error, loading, refetch } = useFetch<UserWithHoldings[]>(
    `/asset/user?users=${users}&search=${search}`,
    30
  )
  const { setUsersWithHoldings } = useContext(HoldingsContext)

  useEffect(() => {
    if (data) {
      setUsersWithHoldings((prevUsers) => {
        if (!prevUsers) return data
        return data.map((newUser) => {
          const prevUser = prevUsers.find((u) => u._id === newUser._id)
          if (prevUser) {
            return {
              ...prevUser,
              ...newUser,
              assets: newUser.assets,
            }
          }
          return newUser
        })
      })
    }
  }, [data, setUsersWithHoldings])

  return {
    error,
    loading,
    refetch,
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
  const { setUserHoldings } = useContext(HoldingsContext)

  const { data, loading, error } = useFetch<UserWithHoldings>(
    `asset/user/${userId}`
  )

  setUserHoldings(data)

  return {
    error,
    loading,
  }
}

export const getHoldings = async (users: string, search: string) => {
  const res = await AxiosInstance.get(
    `/asset/user?users=${users}&search=${search}`
  )
  return res.data
}

export const getUserHoldings = async (userId: string) => {
  const res = await AxiosInstance.get(`/asset/user/${userId}`)
  return res.data
}

export const handleItemReturn = async (
  event: FormEvent<HTMLFormElement>,
  assetId: string,
  status: string
) => {
  event.preventDefault()
  const payload = {
    userId: null,
    returnDate: new Date().toISOString(),
    status,
  }
 await AxiosInstance.patch(`/asset/${assetId}`, payload)

}

export const handleItemAssign = async (
  event: FormEvent<HTMLFormElement>,
  assetId: string,
  userId: string
) => {
  event.preventDefault()
  const payload = {
    userId,
    takenDate: new Date().toISOString(),
  }
  await AxiosInstance.patch(`/asset/${assetId}`, payload)
}
