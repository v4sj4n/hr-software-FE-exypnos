import { useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import { useForm } from '@tanstack/react-form'
import { InventoryContext } from '../../InventoryContext'
import { useCreateInventoryItem } from '../../Hook/hook'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import style from '../../style/createItemForm.module.scss'
import Selecter from '@/Components/Input/components/Select/Selecter'
import { minLength, nonEmpty, picklist, pipe, string } from 'valibot'
import { ErrorText } from '@/Components/Error/ErrorTextForm'

export const CreateItemForm = () => {
    const { handleCloseCreateModalOpen } = useContext(InventoryContext)
    const { mutate, isError, error } = useCreateInventoryItem()

    const form = useForm({
        defaultValues: {
            type: 'laptop',
            serialNumber: '',
        },
        onSubmit: async ({ value }) => {
            mutate({
                type: value.type as 'laptop' | 'monitor',
                serialNumber: value.serialNumber,
            })
            if (isError) {
                console.log(error)
            }
        },
        validatorAdapter: valibotValidator(),
    })

    return (
        <>
            <h3 className={style.heading}>Create an asset</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className={style.form}
            >
                <div>
                    <form.Field
                        validators={{
                            onChange: picklist(
                                ['laptop', 'monitor'],
                                "Please select an item type of 'laptop' or'monitor'",
                            ),
                        }}
                        name="type"
                        children={(field) => (
                            <div>
                                <Selecter
                                    label="Item Type"
                                    name="Item Type"
                                    multiple={false}
                                    options={['monitor', 'laptop']}
                                    value={field.state.value}
                                    onChange={(newValue) =>
                                        field.handleChange(newValue as string)
                                    }
                                />
                                {field.state.meta.errors ? (
                                    <ErrorText>
                                        {field.state.meta.errors.join(', ')}
                                    </ErrorText>
                                ) : null}
                            </div>
                        )}
                    />
                </div>

                <div>
                    <form.Field
                        name="serialNumber"
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
                                <Input
                                    IsUsername
                                    name="serialNumber"
                                    width={'100%'}
                                    label="Serial Number"
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
                            </div>
                        )}
                    />
                </div>

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
                        btnText={
                            form.state.isSubmitting ? 'Submitting' : 'Submit'
                        }
                        disabled={form.state.isSubmitting}
                        width={'100%'}
                        isSubmit
                    />
                </div>
            </form>
        </>
    )
}
