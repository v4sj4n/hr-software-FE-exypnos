import { ModalComponent } from '@/Components/Modal/Modal'
import { useSearchParams } from 'react-router-dom'
import { useGetItem, useHandleItemReturner } from '../Hook'
import style from '../style/assetModal.module.scss'
import { TitleCaser } from '@/Helpers/TitleCaser'
import dayjs from 'dayjs'
import { FormEvent, useState } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import WarningIcon from '@mui/icons-material/Warning'

export const AssetModal = () => {
    const { error, isError, isLoading, data } = useGetItem()
    const [searchParams, setSearchParams] = useSearchParams()
    const [returnState, setReturnState] = useState<string | null>(null)
    const [returnDate, setReturnDate] = useState<string>(
        new Date().toISOString(),
    )
    const handleClose = () => {
        setReturnState(null)
        setSearchParams(new URLSearchParams())
    }

    const handleItemAssigner = useHandleItemReturner()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleItemAssigner.mutate({
            event: e,
            assetId: data._id as string,
            status: returnState as string,
            returnDate,
        })
        handleClose()
    }

    return (
        <ModalComponent
            open={!!searchParams.get('selectedOwnedItem')}
            handleClose={handleClose}
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div className={style.modalMainDiv}>
                    <div>
                        <h3>{TitleCaser(data.type)}</h3>
                        <div>
                            <p>{data.serialNumber}</p>
                            <p style={{ fontSize: '.75rem' }}>
                                {dayjs(data.takenDate).format('DD MMM YYYY')}
                            </p>
                        </div>
                    </div>

                    {!returnState ? (
                        <div className={style.returnItemTypes}>
                            <h3>Return item:</h3>
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Broken"
                                onClick={() => setReturnState('broken')}
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Available"
                                onClick={() => setReturnState('available')}
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
                                value={returnDate.split('T')[0]}
                                onChange={(e) => setReturnDate(e.target.value)}
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
