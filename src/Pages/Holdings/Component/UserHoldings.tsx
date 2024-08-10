import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Asset } from '../TAsset'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { getUserHoldings } from '../Hook/index.ts'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { inputStyles } from '@/Components/Input/Styles'
import { HoldingsContext } from '../HoldingsContext'
import style from '../style/userHoldings.module.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const UserHoldings = () => {
  const { searchParams, setSearchParams, setUserHoldings } =
    useContext(HoldingsContext)
  const queryClient = useQueryClient()

  const [returnItems, setReturnItems] = useState<{ [key: string]: boolean }>({})
  const [assetId, setAssetId] = useState<string | null>(null)

  const [assetToReturnStatus, setAssetToReturnStatus] = useState<string | null>(
    null
  )

  const userHoldings = useQuery({
    queryKey: ['userHoldings', searchParams.get('selected')],
    queryFn: () => getUserHoldings(searchParams.get('selected') as string),
  })

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
      queryClient.invalidateQueries({ queryKey: ['usersWithHoldings'] })
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
      queryClient.invalidateQueries({ queryKey: ['usersWithHoldings'] })
      handleClose()
    } else {
      alert('Something went wrong')
    }
  }

  console.log(userHoldings)
  if (userHoldings?.isLoading) {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    )
  }
  if (userHoldings?.isError)
    return (
      <div className={style.noItemsOnSelectedUser}>
        <span style={{ textAlign: 'center' }}>
          Error: {userHoldings.error.message}
        </span>
      </div>
    )

  return (
    <div className={style.selectedUserDetails}>
      <img
        src={userHoldings?.data.imageUrl}
        alt={`${userHoldings?.data.firstName}'s profile`}
      />
      <h3>
        {userHoldings?.data.firstName} {userHoldings?.data.lastName}
      </h3>

      <div className={style.selectedUserSimpleBio}>
        <p>{userHoldings?.data.email}</p>|<p>{userHoldings?.data.phone}</p>|
        <p>{userHoldings?.data.role}</p>
      </div>

      <div className={style.assetsContainer}>
        {userHoldings?.data.assets.map(
          ({
            _id,
            type,
            serialNumber,
            takenDate,
          }: {
            _id: string
            type: string
            serialNumber: string
            takenDate: string
          }) => (
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
                      text={`Return the item as broken by ${userHoldings?.data.firstName} ${userHoldings?.data.lastName}`}
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
                      text={`Make the item available by removing it from ${userHoldings?.data.firstName} ${userHoldings?.data.lastName} `}
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
          )
        )}
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
          text={`Assign the selected item as a possesion of ${userHoldings?.data.firstName} ${userHoldings?.data.lastName}`}
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
