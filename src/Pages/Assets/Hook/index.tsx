import { useContext } from 'react'
import { useFetch } from '../../../Hooks/useFetch'
import { Asset } from '../TAsset'
import { AssetContext } from '../AssetContext'

export const useData = () => {
  const { data, error, loading } = useFetch<Asset[]>('/asset', 10)
  const { setAssets } = useContext(AssetContext)
  if (data) {
    setAssets(data)
  }

  return {
    error,
    loading,
  }
}
