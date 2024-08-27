import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import Card from '@/Components/Card/Card'
import { useGetUserHoldings, useHandleItemAssigner } from '../Hook'
import style from '../style/userHoldings.module.scss'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Asset } from '../TAsset'
import AxiosInstance from '@/Helpers/Axios'
import { inputStyles } from '@/Components/Input/Styles'
import { useParams } from 'react-router-dom'
import { AssetModal } from './AssetModal'
import HoldingsProvider, { HoldingsContext } from '../HoldingsContext'
import Toast from '@/Components/Toast/Toast'

const UserHoldingsComponent = () => {
    const holdingsGetter = useGetUserHoldings()
    const {
        searchParams,
        setSearchParams,
        toastConfigs,
        setToastConfigs,
        handleToastClose,
    } = useContext(HoldingsContext)

    const handleItemClick = (id: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('selectedOwnedItem', id)
            console.log('Updated searchParams:', newParams.toString())
            return newParams
        })
    }

    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<Asset[]>([])
    const [autocompleteLoading, setAutocompleteLoading] = useState(false)
    const [assetId, setAssetId] = useState<string | null>(null)
    const itemAssigner = useHandleItemAssigner()
    const { id: userId } = useParams()

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

    if (holdingsGetter.isLoading) return <p>Loading...</p>
    if (holdingsGetter.isError) return <p>{holdingsGetter.error.message}</p>
    return (
        <Card
            border="1px solid gray"
            padding="1.5rem"
            className={style.userCard}
        >
            <div className={style.userImageNameRole}>
                <img src={holdingsGetter.data.imageUrl} alt="" />
                <div>
                    <h3>
                        {holdingsGetter.data.firstName}{' '}
                        {holdingsGetter.data.lastName}
                    </h3>
                    <p>{holdingsGetter.data.role}</p>
                </div>
            </div>
            <div className={style.generalInfo}>
                <div>
                    <h4>Email</h4>
                    <p>{holdingsGetter.data.email}</p>
                </div>
                <div>
                    <h4>Phone</h4>
                    <p>{holdingsGetter.data.phone}</p>
                </div>
            </div>

            <div className={style.itemsDiv}>
                <h4>Assigned items</h4>
                <div className={style.itemsListingContainer}>
                    {holdingsGetter.data.assets.map((item: Asset) => {
                        return (
                            <IconBasedOnAssetType
                                key={item._id}
                                onClick={() => handleItemClick(item._id)}
                                asset={item.type}
                            />
                        )
                    })}
                </div>
                <form
                    onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                        itemAssigner.mutate({
                            event,
                            assetId: assetId as string,
                            userId: userId as string,
                        })
                        if (itemAssigner.isError) {
                            setToastConfigs({
                                isOpen: true,
                                message: 'Error assigning item',
                                severity: 'error',
                            })
                        } else {
                            setToastConfigs({
                                isOpen: true,
                                message: 'Item assigned successfully',
                                severity: 'success',
                            })
                        }
                        setAssetId(null)
                    }}
                    className={style.itemAssigner}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
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
                        text={`Assign the selected item as a possesion of ${holdingsGetter.data.firstName} ${holdingsGetter.data.lastName}`}
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
            <Toast
                open={toastConfigs.isOpen}
                onClose={handleToastClose}
                message={toastConfigs.message || ''}
                severity={toastConfigs.severity}
            />

            {searchParams.get('selectedOwnedItem') && <AssetModal />}
        </Card>
    )
}

const IconBasedOnAssetType = ({
    asset,
    onClick,
}: {
    asset: string
    onClick?: () => void
}) => {
    return (
        <div className={style.assetContainer} onClick={onClick}>
            {asset === 'laptop' ? <LaptopOutlined /> : <MonitorOutlined />}
            <p>{asset}</p>
        </div>
    )
}

export default function UserHoldings() {
    return (
        <HoldingsProvider>
            <UserHoldingsComponent />
        </HoldingsProvider>
    )
}
