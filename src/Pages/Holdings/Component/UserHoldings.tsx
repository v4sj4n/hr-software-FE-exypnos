import { useContext, useCallback, useState, useEffect, FormEvent } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Asset } from '../TAsset'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import {
    useGetUserHoldings,
    useHandleItemAssigner,
    useHandleItemReturner,
} from '../Hook/index.ts'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { inputStyles } from '@/Components/Input/Styles'
import { HoldingsContext } from '../HoldingsContext'
import style from '../style/userHoldings.module.scss'

export const UserHoldings = () => {
    const { searchParams, setSearchParams } = useContext(HoldingsContext)
    const [returnItems, setReturnItems] = useState<{ [key: string]: boolean }>(
        {},
    )
    const [assetId, setAssetId] = useState<string | null>(null)
    const [assetToReturnStatus, setAssetToReturnStatus] = useState<
        string | null
    >(null)

    const { error, isError, isLoading, data } = useGetUserHoldings()
    const handleItemAssigner = useHandleItemAssigner()
    const handleItemReturner = useHandleItemReturner()

    const handleClose = useCallback(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete('selectedHolding')
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
                    '/asset?availability=available',
                )
                setOptions(data)
            }
            setAutocompleteLoading(false)
        })()

        return () => {
            active = false
        }
    }, [isOpen])

    if (isLoading) {
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )
    }
    if (isError)
        return (
            <div className={style.noItemsOnSelectedUser}>
                <span style={{ textAlign: 'center' }}>
                    Error: {error.message}
                </span>
            </div>
        )

    return (
        <div className={style.selectedUserDetails}>
            <div>
                <div className={style.closeIcon} onClick={handleClose}>
                    <TooltipImproved
                        text={`Close the profile of ${data.firstName} ${data.lastName}`}
                        placement="top"
                        offset={[-10, 0]}
                    >
                        <CloseIcon />
                    </TooltipImproved>
                </div>
                <img src={data.imageUrl} alt={`${data.firstName}'s profile`} />
                <h3>
                    {data.firstName} {data.lastName}
                </h3>

                <div className={style.selectedUserSimpleBio}>
                    <p>{data.email}</p>|<p>{data.phone}</p>|<p>{data.role}</p>
                </div>

                <div className={style.assetsContainer}>
                    {data.assets.map(
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
                                            onSubmit={(
                                                e: FormEvent<HTMLFormElement>,
                                            ) => {
                                                handleItemReturner.mutate({
                                                    event: e,
                                                    assetId: _id,
                                                    status: assetToReturnStatus as string,
                                                })
                                            }}
                                        >
                                            <TooltipImproved
                                                text={`Return the item as broken by ${data.firstName} ${data.lastName}`}
                                                placement="left"
                                                offset={[0, 2.5]}
                                            >
                                                <span>
                                                    <button
                                                        onClick={() => {
                                                            setAssetToReturnStatus(
                                                                'broken',
                                                            )
                                                        }}
                                                        type="submit"
                                                    >
                                                        broken
                                                    </button>
                                                </span>
                                            </TooltipImproved>

                                            <TooltipImproved
                                                text={`Make the item available by removing it from ${data.firstName} ${data.lastName} `}
                                                placement="right"
                                                offset={[0, 2.5]}
                                            >
                                                <span>
                                                    <button
                                                        onClick={() => {
                                                            setAssetToReturnStatus(
                                                                'available',
                                                            )
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
                                        <p>
                                            Taken on:{' '}
                                            {dayjs(takenDate).format(
                                                'DD-MMM-YYYY',
                                            )}
                                        </p>
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
                        ),
                    )}
                </div>
            </div>

            <form
                onSubmit={(event: FormEvent<HTMLFormElement>) =>
                    handleItemAssigner.mutate({
                        event,
                        assetId: assetId as string,
                        userId: searchParams.get('selectedHolding') as string,
                    })
                }
                className={style.assignAssetForm}
            >
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
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <TooltipImproved
                    text={`Assign the selected item as a possesion of ${data.firstName} ${data.lastName}`}
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
        </div>
    )
}
