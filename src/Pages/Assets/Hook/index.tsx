import { useContext, useEffect } from 'react'
import { useFetch } from '../../../Hooks/useFetch'
import { Asset } from '../TAsset'
import { AssetsContext } from '../AssetContext'

export const useData = () => {
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
export const useOneAsset = (serial: string) => {
  const { data, error, loading } = useFetch<Asset>(
    `/asset/serial/${serial}`,
  )

  return {
    data,
    error,
    loading,
  }
}
