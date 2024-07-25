import { useEffect, useState } from 'react'
import AxiosInstance from '../Helpers/Axios'
import { AxiosError } from 'axios'

export const useFetch = <T,>(url: string, intervalInSeconds: number = 0) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await AxiosInstance.get(url)
        if (res.status === 200) {
          setData(res.data)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (err: unknown) {
        console.log(err)
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'An error occurred')
        }
        setError(
          'An error occurred while fetching data. Please try again later.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    let intervalId: NodeJS.Timeout | null = null

    if (intervalInSeconds > 0) {
      intervalId = setInterval(fetchData, intervalInSeconds * 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [url, intervalInSeconds])

  return { data, error, loading }
}
