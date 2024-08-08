import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import { Autocomplete, Card, CircularProgress, TextField } from '@mui/material'
import { AssetsContext } from '../AssetsContext'
import { Asset } from '../TAsset'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useGetAssetsOfAUser } from '../Hook'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import style from '../style/userHolding.module.scss'

export const UserHoldings = () => {
  const { searchParams, setSearchParams, userHoldings, setUserHoldings } =
    useContext(AssetsContext)

  const [returnItems, setReturnItems] = useState<{ [key: string]: boolean }>({})
  const [assetId, setAssetId] = useState<string | null>(null)

  const [assetToReturnStatus, setAssetToReturnStatus] = useState<string | null>(
    null
  )

    const { error, loading } = useGetAssetsOfAUser(
      searchParams.get('selected') as string
    )
  
  const handleClose = useCallback(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete('selected')
      return newParams
    })
  }, [setSearchParams])

  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<Asset[]>([])
  const [autocompleteLoading, setAutocompleteLoading] = useState(false)

  useEffect(() => {
    let active = true

    if (!isOpen) {
      return undefined
    }

    setAutocompleteLoading(true)
    ;(async () => {
      if (active) {
        const { data } = await AxiosInstance.get<Asset[]>(
          '/asset?availability=available'
        )
        setOptions(data)
      }
      setAutocompleteLoading(false)
    })()

    return () => {
      active = false
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!assetId) return
    const payload = {
      userId: searchParams.get('selected'),
      takenDate: new Date().toISOString(),
    }
    const res = await AxiosInstance.patch(`/asset/${assetId}`, payload)
    if ([200, 201].includes(res.status)) {
      handleClose()
    } else {
      alert('Something went wrong')
    }
  }

  const handleItemReturner = async (
    e: FormEvent<HTMLFormElement>,
    assetId: string
  ) => {
    e.preventDefault()

    const payload = {
      userId: null,
      returnDate: new Date().toISOString(),
      status: assetToReturnStatus,
    }
    const res = await AxiosInstance.patch(`/asset/${assetId}`, payload)
    if ([200, 201].includes(res.status)) {
      setReturnItems((prev) => ({ ...prev, [assetId]: false }))
      setUserHoldings((prev) => {
        if (!prev) return null
        return {
          ...prev,
          assets: prev.assets.filter((asset) => asset._id !== assetId),
        }
      })
      handleClose()
    } else {
      alert('Something went wrong')
    }
  }


    console.log(userHoldings)
    if (loading) {
      return (
        <div className={style.noItemsOnSelectedUser}>
          <CircularProgress />
        </div>
      )
    }
    console.log(error)
    if (error)
      return (
        <div className={style.noItemsOnSelectedUser}>
          <span style={{ textAlign: 'center' }}>Error: {error}</span>
        </div>
      )

    return (
      <div className={style.selectedUserDetails}>
        <img
          src="https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a"
          alt="user's profile"
        />
        <h3>
          {userHoldings?.firstName} {userHoldings?.lastName}
        </h3>

        <div className={style.selectedUserSimpleBio}>
          <p>{userHoldings?.email}</p>|<p>{userHoldings?.phone}</p>|
          <p>{userHoldings?.role}</p>
        </div>

        <div className={style.assetsContainer}>
          {userHoldings?.assets.map(
            ({ _id, type, serialNumber, takenDate }) => (
              <div key={_id} className={style.assetContainer}>
                <div className={style.assetGeneralInfo}>
                  <h4>{type}</h4>
                  <p>{serialNumber}</p>
                </div>
                <div className={style.dateAndActions}>
                Taken on:{' '}
                {dayjs(takenDate).format('DD-MMM-YYYY')}{' '}
                  <Button btnText="Return" type={ButtonTypes.PRIMARY} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  
}
