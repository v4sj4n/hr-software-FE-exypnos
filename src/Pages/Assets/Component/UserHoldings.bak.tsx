import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Autocomplete, Card, CircularProgress, TextField } from '@mui/material'
import { AssetsContext } from '../AssetsContext'
import { Asset } from '../TAsset'
import style from '../style/userHolding.module.scss'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import { inputStyles } from '@/Components/Input/Styles'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useGetAssetsOfAUser } from '../Hook'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'

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

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className={style.mainContainer} style={{}}>
              <img
                src={userHoldings?.imageUrl}
                alt={`${userHoldings?.firstName}'s image`}
              />
              <h3>
                {userHoldings?.firstName} {userHoldings?.lastName}
              </h3>

              <div className={style.simpleBio}>
                <p>{userHoldings?.email}</p>
                <p>{userHoldings?.phone}</p>
                <p>{userHoldings?.role}</p>
              </div>
              <hr />
              <div className={style.assetsContainer}>
                {userHoldings?.assets.map((asset) => {
                  return (
                    <div
                      key={asset._id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className={style.itemDetails}>
                        <h4>
                          {asset.type[0].toUpperCase() + asset.type.slice(1)}
                        </h4>
                        <p>{asset.serialNumber}</p>
                      </div>
                      <div className={style.dateContainer}>
                        <div>
                          {returnItems[asset._id] ? (
                            <div className={style.assignReturningStatus}>
                              <p>Assign Returning status:</p>
                              <form
                                onSubmit={(e) => {
                                  handleItemReturner(e, asset._id)
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
                          ) : (
                            <div className={style.dateContainer}>
                              <p>
                                Taken on:{' '}
                                {dayjs(asset?.takenDate).format('DD-MMM-YYYY')}{' '}
                              </p>
                              <TooltipImproved
                                offset={[0, 2.5]}
                                text={`Add the item as returned by ${userHoldings?.firstName} ${userHoldings?.lastName}`}
                                placement="right"
                              >
                                <span>
                                  <Button
                                    btnText={'Return'}
                                    onClick={() => {
                                      setReturnItems((prev) => ({
                                        ...prev,
                                        [asset._id]: true,
                                      }))
                                    }}
                                    type={ButtonTypes.PRIMARY}
                                  />
                                </span>
                              </TooltipImproved>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <form onSubmit={handleSubmit} className={style.formInput}>
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
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  getOptionLabel={(option) =>
                    option.type + ' ' + option.serialNumber
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign to User"
                      variant="filled"
                      size="small"
                      sx={{ ...inputStyles }}
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
                    <Button
                      btnText={'Assign'}
                      isSubmit
                      type={ButtonTypes.PRIMARY}
                    />
                  </span>
                </TooltipImproved>
              </form>

              <p className={style.holdingDescription}>
                Holding {userHoldings?.assets.length} item
                {userHoldings?.assets.length === 1 ? '' : 's'}{' '}
              </p>
            </div>
          )}
        </Card>
      </Fade>
    </Modal>
  )
}
