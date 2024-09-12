import { ModalComponent } from '@/Components/Modal/Modal'
import { useContext, useEffect, useCallback } from 'react'
import { HoldingsContext } from '../../HoldingsContext'
import AxiosInstance from '@/Helpers/Axios'
import { Asset } from '../../TAsset'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { inputStyles } from '@/Components/Input/Styles'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { minLength, nonEmpty, pipe, string } from 'valibot'
import style from '../../style/assignAssetModal.module.scss'
import { useAssignAssetForm } from '../../Hook'

export const AssignAssetModal = () => {
    const {
        searchParams,
        handleCloseOnModal: handleClose,
        isOpenAssignAsset: isOpen,
        setIsOpenAssignAsset: setIsOpen,
        optionsAssignAsset: options,
        setOptionsAssignAsset: setOptions,
        autocompleteLoadingAssignAsset: autocompleteLoading,
        setAutocompleteLoadingAssignAsset: setAutocompleteLoading,
        autocompleteValueAssignAsset: autocompleteValue,
        setAutocompleteValueAssignAsset: setAutocompleteValue,
    } = useContext(HoldingsContext)

    const { form } = useAssignAssetForm()

    const fetchAssets = useCallback(async () => {
        const { data } = await AxiosInstance.get<Asset[]>(
            '/asset?availability=available',
        )
        setOptions(data)
    }, [setOptions])

    useEffect(() => {
        let active = true

        if (!isOpen) {
            return undefined
        }

        setAutocompleteLoading(true)
        fetchAssets().then(() => {
            if (active) {
                setAutocompleteLoading(false)
            }
        })

        return () => {
            active = false
        }
    }, [isOpen, fetchAssets, setAutocompleteLoading])

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
