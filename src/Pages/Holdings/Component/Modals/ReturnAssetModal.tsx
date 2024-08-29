import { ModalComponent } from '@/Components/Modal/Modal'
import { useGetItem, useHandleItemReturner } from '../../Hook'
import style from '../../style/returnAssetModal.module.scss'
import { TitleCaser } from '@/Helpers/TitleCaser'
import dayjs from 'dayjs'
import { FormEvent, useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import WarningIcon from '@mui/icons-material/Warning'
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
                    <div>
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

                    {!itemReturnConfigs.state ? (
                        <div className={style.returnItemTypes}>
                            <h3>Return item:</h3>
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Broken"
                                onClick={() =>
                                    setItemReturnConfigs((prev) => ({
                                        ...prev,
                                        state: 'broken',
                                    }))
                                }
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Available"
                                onClick={() =>
                                    setItemReturnConfigs((prev) => ({
                                        ...prev,
                                        state: 'available',
                                    }))
                                }
                            />
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className={style.handleItemReturner}
                        >
                            <div>
                                <WarningIcon />
                                <h3>
                                    Are you sure you want to return the item?
                                </h3>
                            </div>
                            <Input
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
                            <div>
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
                    )}
                </div>
            )}
        </ModalComponent>
    )
}
