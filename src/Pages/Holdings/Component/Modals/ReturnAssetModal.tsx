import { ModalComponent } from '@/Components/Modal/Modal'
import { useGetItem, useHandleItemReturner } from '../../Hook'
import style from '../../style/returnAssetModal.module.scss'
import { TitleCaser } from '@/Helpers/TitleCaser'
import dayjs from 'dayjs'
import { useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { HoldingsContext } from '../../HoldingsContext'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
    ReturnAssetFormFields,
    ReturnAssetSchema,
} from '@/Schemas/Holdings/ReturnAsset.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Selecter from '@/Components/Input/components/Select/Selecter'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { AxiosError } from 'axios'

export const ReturnAssetModal = () => {
    const {
        searchParams,
        itemReturnConfigs,
        handleCloseOnModal: handleClose,
        setToastConfigs,
    } = useContext(HoldingsContext)
    const itemGetter = useGetItem()

    const { mutate, isError, error } = useHandleItemReturner()

    const {
        setError,
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ReturnAssetFormFields>({
        resolver: valibotResolver(ReturnAssetSchema),
        defaultValues: {
            status: 'available',
            returnDate: new Date().toISOString().split('T')[0],
        },
    })
    const onSubmit: SubmitHandler<ReturnAssetFormFields> = async (
        data: ReturnAssetFormFields,
    ) => {
        mutate({
            assetId: itemGetter.data._id,
            status: data.status,
            returnDate: data.returnDate,
        })
        if (isError) {
            if (error instanceof AxiosError)
                setError('root', { message: error.response?.data?.message })
            else {
                setError('root', { message: 'something happened' })
            }

            setToastConfigs({
                isOpen: true,
                message: 'Error returning item',
                severity: 'error',
            })
        } else {
            setToastConfigs({
                isOpen: true,
                message: 'Item returned successfully',
                severity: 'success',
            })
            setTimeout(() => {
                handleClose()
            }, 2500)
        }
    }

    return (
        <ModalComponent
            open={!!searchParams.get('ownedItem')}
            handleClose={handleClose}
        >
            {itemGetter.isLoading ? (
                <div>Loading...</div>
            ) : itemGetter.isError ? (
                <div>Error: {itemGetter.error.message}</div>
            ) : (
                <div className={style.modalMainDiv}>
                    <div className={style.generalInfo}>
                        <h3>{TitleCaser(itemGetter.data.type)}</h3>
                        <div>
                            <p>{itemGetter.data.serialNumber}</p>
                            <p style={{ fontSize: '.75rem' }}>
                                {dayjs(itemGetter.data.takenDate).format(
                                    'DD MMM YYYY',
                                )}
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={style.formContainer}
                    >
                        <h3>Do you want to return the item?</h3>

                        <div className={style.inputContainer}>
                            <div>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Selecter
                                            label="Status"
                                            name="Status"
                                            multiple={false}
                                            options={['available', 'broken']}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {errors.status && (
                                    <ErrorText>
                                        {errors.status.message}
                                    </ErrorText>
                                )}
                            </div>
                            <div>
                                <Input
                                    className={style.returnDateInput}
                                    name="returnDate"
                                    IsUsername
                                    type="date"
                                    label="Return Date"
                                    shrink
                                    register={register('returnDate')}
                                    value={itemReturnConfigs.date.split('T')[0]}
                                />
                                {errors.returnDate && (
                                    <ErrorText>
                                        {errors.returnDate.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div className={style.formButtonContainer}>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText={
                                    isSubmitting ? 'Returning...' : 'Return'
                                }
                                disabled={isSubmitting}
                                isSubmit
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Cancel"
                                onClick={handleClose}
                            />
                        </div>
                    </form>
                </div>
            )}
        </ModalComponent>
    )
}
