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

const UserHoldingsComponent = () => {
    const { error, isError, isLoading, data } = useGetUserHoldings()
    console.log(error, isError, isLoading, data)
    const { searchParams, setSearchParams } = useContext(HoldingsContext)

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
    const { mutate } = useHandleItemAssigner()
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

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>
    return (
        <Card
            border="1px solid gray"
            padding="1.5rem"
            className={style.userCard}
        >
            <div className={style.userImageNameRole}>
                <img src={data.imageUrl} alt="" />
                <div>
                    <h3>
                        {data.firstName} {data.lastName}
                    </h3>
                    <p>{data.role}</p>
                </div>
            </div>
            <div className={style.generalInfo}>
                <div>
                    <h4>Email</h4>
                    <p>{data.email}</p>
                </div>
                <div>
                    <h4>Phone</h4>
                    <p>{data.phone}</p>
                </div>
            </div>

            <div className={style.itemsDiv}>
                <h4>Assigned items</h4>
                <div className={style.itemsListingContainer}>
                    {data.assets.map((item: Asset) => {
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
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        mutate({
                            event,
                            assetId: assetId as string,
                            userId: userId as string,
                        })
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
