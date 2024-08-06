import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import {
  Autocomplete,
  Card,
  CircularProgress,
  TextField,
  Tooltip,
  Zoom,
} from '@mui/material'
import { AssetsContext } from '../AssetsContext'
import { useFetch } from '@/Hooks/useFetch'
import { Asset, UserWithAsset } from '../TAsset'
import style from '../style/userHolding.module.scss'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import { inputStyles } from '@/Components/Input/Styles'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'

const modStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

export const UserHoldings = () => {
  const { searchParams, setSearchParams } = useContext(AssetsContext)

  const [returnItems, setReturnItems] = useState<{ [key: string]: boolean }>({})

  const [assetToReturnStatus, setAssetToReturnStatus] = useState<string | null>(
    null
  )

  const { data, loading, error } = useFetch<UserWithAsset>(
    `asset/user/${searchParams.get('selected')}`
  )
  console.log(data)

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
  const [assetId, setAssetId] = useState<string | null>(null)

  const handleItemReturn = async (
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
      handleClose()
    } else {
      alert('Something went wrong')
    }
  }

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
        <Card sx={modStyle}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className={style.mainContainer} style={{}}>
              <img
                src={data?.imageUrl}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                alt=""
              />
              <h3>
                {data?.firstName} {data?.lastName}
              </h3>

              <div className={style.simpleBio}>
                <p>{data?.email}</p>
                <p>{data?.phone}</p>
                <p>{data?.role}</p>
              </div>
              <hr />
              <div className={style.assetsContainer}>
                {data?.assets.map((asset) => {
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
                                  handleItemReturn(e, asset._id)
                                }}
                              >
                                <Tooltip
                                  title={`Return the item as broken by ${data?.firstName} ${data?.lastName}`}
                                  arrow
                                  placement="left"
                                  TransitionComponent={Zoom}
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: 'offset',
                                          options: {
                                            offset: [0, 2.5],
                                          },
                                        },
                                      ],
                                    },
                                  }}
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
                                </Tooltip>
                                <Tooltip
                                  title={`Make the item available by removing it from ${data?.firstName} ${data?.lastName} `}
                                  arrow
                                  placement="right"
                                  TransitionComponent={Zoom}
                                  slotProps={{
                                    popper: {
                                      modifiers: [
                                        {
                                          name: 'offset',
                                          options: {
                                            offset: [0, 2.5],
                                          },
                                        },
                                      ],
                                    },
                                  }}
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
                                </Tooltip>
                              </form>
                            </div>
                          ) : (
                            <div className={style.dateContainer}>
                              <p>
                                Taken on:{' '}
                                {dayjs(asset?.takenDate).format('DD-MMM-YYYY')}{' '}
                              </p>
                              <Tooltip
                                title={`Add the item as returned by ${data?.firstName} ${data?.lastName}`}
                                arrow
                                placement="right"
                                TransitionComponent={Zoom}
                                slotProps={{
                                  popper: {
                                    modifiers: [
                                      {
                                        name: 'offset',
                                        options: {
                                          offset: [0, 2.5],
                                        },
                                      },
                                    ],
                                  },
                                }}
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
                              </Tooltip>
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
                <Tooltip
                  title={`Assign the selected item as a possesion of ${data?.firstName} ${data?.lastName}`}
                  arrow
                  placement="right"
                  TransitionComponent={Zoom}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [-10, 0],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <span>
                    <Button
                      btnText={'Assign'}
                      isSubmit
                      type={ButtonTypes.PRIMARY}
                    />
                  </span>
                </Tooltip>
              </form>

              <p className={style.holdingDescription}>
                Holding {data?.assets.length} item
                {data?.assets.length === 1 ? '' : 's'}{' '}
              </p>
            </div>
          )}
        </Card>
      </Fade>
    </Modal>
  )
}
