import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Asset } from '../TAsset'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useGetAssetsOfAUser } from '../Hook'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { inputStyles } from '@/Components/Input/Styles'
import { HoldingsContext } from '../HoldingsContext'
import style from '../style/userHoldings.module.scss'

export const UserHoldings = () => {
  const { searchParams, setSearchParams, userHoldings, setUserHoldings } =
    useContext(HoldingsContext)

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

  const handleItemAssigner = async (e: FormEvent<HTMLFormElement>) => {
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
        src={userHoldings?.imageUrl}
        alt={`${userHoldings?.firstName}'s profile`}
      />
      <h3>
        {userHoldings?.firstName} {userHoldings?.lastName}
      </h3>

      <div className={style.selectedUserSimpleBio}>
        <p>{userHoldings?.email}</p>|<p>{userHoldings?.phone}</p>|
        <p>{userHoldings?.role}</p>
      </div>

      <div className={style.assetsContainer}>
        {userHoldings?.assets.map(({ _id, type, serialNumber, takenDate }) => (
          <div key={_id} className={style.assetContainer}>
            <div className={style.assetGeneralInfo}>
              <h4>{type}</h4>
              <p>{serialNumber}</p>
            </div>

            {returnItems[_id] && (
              <div className={style.returnFormActions}>
                <p>Assign Returning status:</p>
                <form
                  onSubmit={(e) => {
                    handleItemReturner(e, _id)
                  }}
                >
                  <TooltipImproved
                    text={`Return the item as broken by ${userHoldings?.firstName} ${userHoldings?.lastName}`}
                    placement="left"
                    offset={[0, 2.5]}
                  >
                    <span>
                      <button
                        onClick={() => {
                          setAssetToReturnStatus('broken')
                        }}
                        type="submit"
                      >
                        broken
                      </button>
                    </span>
                  </TooltipImproved>

                  <TooltipImproved
                    text={`Make the item available by removing it from ${userHoldings?.firstName} ${userHoldings?.lastName} `}
                    placement="right"
                    offset={[0, 2.5]}
                  >
                    <span>
                      <button
                        onClick={() => {
                          setAssetToReturnStatus('available')
                        }}
                        type="submit"
                      >
                        available
                      </button>
                    </span>
                  </TooltipImproved>
                </form>
              </div>
            )}
            {!returnItems[_id] && (
              <div className={style.dateAndActions}>
                <p>Taken on: {dayjs(takenDate).format('DD-MMM-YYYY')}</p>
                <Button
                  btnText="Return"
                  type={ButtonTypes.PRIMARY}
                  onClick={() => {
                    setReturnItems((prev) => ({
                      ...prev,
                      [_id]: true,
                    }))
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleItemAssigner} className={style.assignAssetForm}>
        <Autocomplete
          id="users-list"
          sx={{
            width: '100%',
            marginBottom: '1rem',
          }}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={(event, newValue) => {
            event.preventDefault()
            console.log(newValue)
            if (newValue) {
              setAssetId(newValue?._id)
            }
          }}
          options={options}
          loading={autocompleteLoading}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.type + ' ' + option.serialNumber}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assign to User"
              variant="filled"
              size="small"
              sx={{
                ...inputStyles,
              }}
              InputLabelProps={{
                style: {
                  color: '#4C556B',
                  fontFamily: '"Outfit", sans-serif',
                },
                shrink: true,
              }}
              InputProps={{
                disableUnderline: true,
                ...params.InputProps,
                endAdornment: (
                  <>
                    {autocompleteLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TooltipImproved
          text={`Assign the selected item as a possesion of ${userHoldings?.firstName} ${userHoldings?.lastName}`}
          placement="right"
          offset={[-10, 0]}
        >
          <span>
            <Button btnText={'Assign'} isSubmit type={ButtonTypes.PRIMARY} />
          </span>
        </TooltipImproved>
      </form>
    </div>
  )
}
