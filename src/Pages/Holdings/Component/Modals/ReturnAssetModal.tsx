import { ModalComponent } from '@/Components/Modal/Modal'
import { useReturnAssetForm } from '../../Hook'
import { TitleCaser } from '@/Helpers/TitleCaser'
import dayjs from 'dayjs'
import { useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { HoldingsContext } from '../../HoldingsContext'
import Selecter from '@/Components/Input/components/Select/Selecter'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { picklist } from 'valibot'
import style from '../../style/returnAssetModal.module.scss'

export const ReturnAssetModal = () => {
    const { searchParams, handleCloseOnModal: handleClose } =
        useContext(HoldingsContext)
    const { form, itemGetter } = useReturnAssetForm()

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
                <>
                    {itemGetter.data && (
                        <div className={style.modalMainDiv}>
                            <div className={style.generalInfo}>
                                <h3>{TitleCaser(itemGetter.data.type)}</h3>
                                <div>
                                    <p>{itemGetter.data.serialNumber}</p>
                                    <p style={{ fontSize: '.75rem' }}>
                                        {dayjs(
                                            itemGetter.data.takenDate,
                                        ).format('DD MMM YYYY')}
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    form.handleSubmit()
                                }}
                                className={style.formContainer}
                            >
                                <h3>Do you want to return the item?</h3>

                                <div className={style.inputContainer}>
                                    <form.Field
                                        name="status"
                                        validators={{
                                            onChange: picklist(
                                                ['available', 'broken'],
                                                "Please select an item status of 'available' or 'broken'",
                                            ),
                                        }}
                                        children={(field) => (
                                            <div>
                                                <Selecter
                                                    label="Status"
                                                    name="Status"
                                                    multiple={false}
                                                    options={[
                                                        'available',
                                                        'broken',
                                                    ]}
                                                    value={field.state.value}
                                                    onChange={(newValue) =>
                                                        field.handleChange(
                                                            newValue as string,
                                                        )
                                                    }
                                                />
                                                {field.state.meta.errors ? (
                                                    <ErrorText>
                                                        {field.state.meta.errors.join(
                                                            ', ',
                                                        )}
                                                    </ErrorText>
                                                ) : null}
                                            </div>
                                        )}
                                    />

                                    <form.Field
                                        name="returnDate"
                                        children={(field) => (
                                            <div>
                                                <Input
                                                    className={
                                                        style.returnDateInput
                                                    }
                                                    name="returnDate"
                                                    IsUsername
                                                    type="date"
                                                    label="Return Date"
                                                    value={field.state.value}
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                    shrink
                                                />
                                                {field.state.meta.errors ? (
                                                    <ErrorText>
                                                        {field.state.meta.errors.join(
                                                            ', ',
                                                        )}
                                                    </ErrorText>
                                                ) : null}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={style.formButtonContainer}>
                                    <Button
                                        type={ButtonTypes.PRIMARY}
                                        btnText={
                                            form.state.isSubmitting
                                                ? 'Returning...'
                                                : 'Return'
                                        }
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
                </>
            )}
        </ModalComponent>
    )
}
