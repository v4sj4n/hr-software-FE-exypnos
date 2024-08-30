import { ModalComponent } from '@/Components/Modal/Modal'
import { useGetItem, useHandleItemReturner } from '../../Hook'
import style from '../../style/returnAssetModal.module.scss'
import { TitleCaser } from '@/Helpers/TitleCaser'
import dayjs from 'dayjs'
import { FormEvent, useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { HoldingsContext } from '../../HoldingsContext'

export const ReturnAssetModal = () => {
    const {
        searchParams,
        itemReturnConfigs,
        setItemReturnConfigs,
        handleCloseOnModal: handleClose,
        setToastConfigs,
    } = useContext(HoldingsContext)
    const itemGetter = useGetItem()

    const handleItemReturner = useHandleItemReturner()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleItemReturner.mutate({
            event: e,
            assetId: itemGetter.data._id as string,
            status: itemReturnConfigs.state as string,
            returnDate: itemReturnConfigs.date,
        })

        if (handleItemReturner.isError) {
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
        }

        handleClose()
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
                        onSubmit={handleSubmit}
                        className={style.formContainer}
                    >
                        <h3>Do you want to return the item?</h3>

                        <div className={style.inputContainer}>
                            <select
                                onChange={(e) => {
                                    setItemReturnConfigs((prev) => {
                                        return {
                                            ...prev,
                                            state: e.target.value,
                                        }
                                    })
                                }}
                                required
                                value={itemReturnConfigs.state}
                            >
                                <option value="" disabled selected>
                                    Select status
                                </option>
                                <option value="available">Available</option>
                                <option value="broken">Broken</option>
                            </select>
                            <Input
                                className={style.returnDateInput}
                                name="returnDate"
                                IsUsername
                                type="date"
                                label="Return Date"
                                shrink
                                value={itemReturnConfigs.date.split('T')[0]}
                                onChange={(e) =>
                                    setItemReturnConfigs((prev) => {
                                        return { ...prev, date: e.target.value }
                                    })
                                }
                            />
                        </div>
                        <div className={style.formButtonContainer}>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText="Return"
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
