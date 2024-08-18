import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import {
    CreateInventoryItemFormFields,
    CreateInventoryItemSchema,
} from '@/Schemas/Inventory/CreateInventoryItem.schema'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { InventoryContext } from '../../InventoryContext'
import { AxiosError } from 'axios'
import { useCreateInventoryItem } from '../../Hook/hook'
import { valibotResolver } from '@hookform/resolvers/valibot'
import style from '../../style/createItemForm.module.scss'

export const CreateItemForm = () => {
    const { handleCloseCreateModalOpen } = useContext(InventoryContext)
    const { mutate, isError, error } = useCreateInventoryItem()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateInventoryItemFormFields>({
        resolver: valibotResolver(CreateInventoryItemSchema),
    })

    const onSubmit: SubmitHandler<CreateInventoryItemFormFields> = async (
        data: CreateInventoryItemFormFields,
    ) => {
        mutate({ item: data })
        if (isError) {
            if (error instanceof AxiosError)
                setError('root', { message: error.response?.data?.message })
            else {
                setError('root', { message: 'something happened' })
            }
        }
    }

    return (
        <>
            <h3 className={style.heading}>Create an asset</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <div>
                    <select {...register('type')} className={style.selector}>
                        <option value="" disabled selected>
                            Select an item
                        </option>
                        <option value="laptop">Laptop</option>
                        <option value="monitor">Monitor</option>
                    </select>
                    {errors.type && (
                        <ErrorText>{errors.type.message}</ErrorText>
                    )}
                </div>

                <div>
                    <Input
                        IsUsername
                        name="serialNumber"
                        width={'100%'}
                        label="Serial Number"
                        register={register('serialNumber')}
                    />
                    {errors.serialNumber && (
                        <ErrorText>{errors.serialNumber.message}</ErrorText>
                    )}
                </div>
                {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

                <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <Button
                        type={ButtonTypes.SECONDARY}
                        btnText="Cancel"
                        border="none"
                        onClick={handleCloseCreateModalOpen}
                        width={'100%'}
                    />
                    <Button
                        type={ButtonTypes.PRIMARY}
                        btnText={isSubmitting ? 'Submitting' : 'Submit'}
                        width={'100%'}
                        isSubmit
                    />
                </div>
            </form>
        </>
    )
}
