import { ModalComponent } from '@/Components/Modal/Modal'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import AxiosInstance from '@/Helpers/Axios'
import { Asset } from '../TAsset'
import { useParams } from 'react-router-dom'
import { useHandleItemAssigner } from '../Hook'

import style from '../style/userHoldings.module.scss'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { inputStyles } from '@/Components/Input/Styles'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'

export default function AssignAssetModal() {
    const {
        searchParams,
        handleCloseOnModal: handleClose,
        setToastConfigs,
    } = useContext(HoldingsContext)

    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<Asset[]>([])
    const [autocompleteLoading, setAutocompleteLoading] = useState(false)
    const [assetId, setAssetId] = useState<string | null>(null)
    const [autocompleteValue, setAutocompleteValue] = useState<Asset | null>(
        null,
    )
    const [date, setDate] = useState<string>(new Date().toISOString())

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
    return (
        <ModalComponent
            open={!!searchParams.get('assignItem')}
            handleClose={handleClose}
        >
            <form
                onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault()
                    itemAssigner.mutate({
                        assetId: assetId as string,
                        userId: userId as string,
                        date,
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
                        handleClose()
                    }
                    setAssetId(null)
                    setAutocompleteValue(null)
                }}
                className={style.itemAssigner}
            >
                <h3>Assign Item</h3>
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
                            setAutocompleteValue(newValue)
                        }
                    }}
                    value={autocompleteValue}
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
                            label="Item"
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
                <Input
                    IsUsername
                    name="Date"
                    shrink
                    label="Date"
                    type="date"
                    value={date.split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                />

                <div className={style.buttonContainer}>
                    <Button
                        btnText={'Cancel'}
                        type={ButtonTypes.SECONDARY}
                        onClick={handleClose}
                    />
                    <Button
                        btnText={'Assign'}
                        isSubmit
                        type={ButtonTypes.PRIMARY}
                    />
                </div>
            </form>
        </ModalComponent>
    )
}
