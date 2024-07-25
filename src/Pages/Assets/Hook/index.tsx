import { useContext, useEffect } from 'react'
import { Asset } from '../TAsset'
import { AssetsContext } from '../AssetsContext'
import { useFetch } from '@/Hooks/useFetch'

export const useData =  () => {
  const { data, error, loading } = useFetch<Asset[]>('/asset', 10)
  const { setAssets } = useContext(AssetsContext)

  useEffect(() => {
    if (data) {
      setAssets(data)
    }
  }, [data, setAssets])

  return {
    error,
    loading,
  }
}
