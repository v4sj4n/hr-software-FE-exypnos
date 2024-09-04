import { ModalComponent } from '@/Components/Modal/Modal'
import { useContext, useEffect, useState } from 'react'
import { HoldingsContext } from '../../HoldingsContext'
import AxiosInstance from '@/Helpers/Axios'
import { Asset } from '../../TAsset'
import { useHandleItemAssigner } from '../../Hook'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { inputStyles } from '@/Components/Input/Styles'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { useForm } from '@tanstack/react-form'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { minLength, nonEmpty, pipe, string } from 'valibot'
import style from '../../style/assignAssetModal.module.scss'

export const AssignAssetModal = () => {
    const {
        searchParams,
        handleCloseOnModal: handleClose,
        setToastConfigs,
    } = useContext(HoldingsContext)

    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<Asset[]>([])
    const [autocompleteLoading, setAutocompleteLoading] = useState(false)
    const [autocompleteValue, setAutocompleteValue] = useState<Asset | null>(
        null,
    )

    const { mutateAsync, error } = useHandleItemAssigner()

    const form = useForm({
        defaultValues: {
            assetId: '',
            date: new Date().toISOString().split('T')[0],
        },
        onSubmit: async ({ value }) => {
            await mutateAsync({
                assetId: value.assetId as string,
                userId: searchParams.get('selectedUser') as string,
                date: value.date,
            })
            if (error) {
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
        },
        validatorAdapter: valibotValidator(),
    })

    useEffect(() => {
        let active = true

        if (!isOpen) {
            return undefined
        }
        console.log(options)

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
            <h3 className={style.modalTitle}>Assign Item</h3>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className={style.itemAssigner}
            >
                <form.Field
                    name="assetId"
                    validators={{
                        onChange: pipe(
                            string('Serial Number is required'),
                            nonEmpty('Please type your serial number'),
                            minLength(
                                10,
                                'Serial Number should be at least 10 characters long',
                            ),
                        ),
                    }}
                    children={(field) => (
                        <div>
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
                                        setAutocompleteValue(newValue)
                                        field.handleChange(newValue._id)
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
                                                fontFamily:
                                                    '"Outfit", sans-serif',
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
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {field.state.meta.errors ? (
                                <ErrorText>
                                    {field.state.meta.errors.join(', ')}
                                </ErrorText>
                            ) : null}
                        </div>
                    )}
                />
                <form.Field
                    name="date"
                    children={(field) => (
                        <>
                            <Input
                                IsUsername
                                name="Date"
                                shrink
                                label="Date"
                                type="date"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            {field.state.meta.errors ? (
                                <ErrorText>
                                    {field.state.meta.errors.join(', ')}
                                </ErrorText>
                            ) : null}
                        </>
                    )}
                />

                <div className={style.buttonsContainer}>
                    <Button
                        btnText="Assign"
                        isSubmit
                        type={ButtonTypes.PRIMARY}
                    />
                    <Button
                        btnText="Cancel"
                        type={ButtonTypes.SECONDARY}
                        onClick={handleClose}
                    />
                </div>
            </form>
        </ModalComponent>
    )
}
