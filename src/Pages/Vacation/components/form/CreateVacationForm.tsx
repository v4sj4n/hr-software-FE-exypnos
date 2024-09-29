import { VacationContext } from '../../VacationContext'
import { useContext } from 'react'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import style from '../../style/vacationForm.module.scss'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { CreateVacationSchema } from '@/Schemas/Vacations/CreateVacation.schema'
import { useCreateVacationForm } from '../../Hook'
import { Modal } from '@/NewComponents/Modal'
import { VacationType } from '../../types'
import { Input } from '@/NewComponents/Inputs/Input'
import { Select } from '@/NewComponents/Inputs/Select'
import { Typography } from '@mui/joy'

export const CreateVacationForm = () => {
    const {
        searchParams,
        createVacationToggler,
        errors: { createError: error },
    } = useContext(VacationContext)

    const { form } = useCreateVacationForm()

    return (
        <Modal
            open={searchParams.get('createVacation') === 'true'}
            onClose={createVacationToggler}
        >
            <>
                <Typography level="h3" className="pb-4">
                    Leave Request
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className={style.formContainer}
                >
                    <form.Field
                        name="type"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: CreateVacationSchema.entries.type,
                        }}
                        children={(field) => (
                            <Select
                                label="Type"
                                options={[
                                    { value: 'vacation', label: 'Vacation' },
                                    { value: 'sick', label: 'Sick' },
                                    { value: 'personal', label: 'Personal' },
                                    { value: 'maternity', label: 'Maternity' },
                                ]}
                                value={field.state.value}
                                onChange={(e, newValue) => {
                                    e?.preventDefault()
                                    field.handleChange(newValue as VacationType)
                                }}
                                error={field.state.meta.errors.join(', ')}
                            />
                        )}
                    />

                    <form.Field
                        name="description"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: CreateVacationSchema.entries.description,
                        }}
                        children={(field) => (
                            <Input
                                type="text"
                                label="Description"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                error={field.state.meta.errors.join(', ')}
                            />
                        )}
                    />

                    <form.Field
                        name="startDate"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: CreateVacationSchema.entries.startDate,
                        }}
                        children={(field) => (
                            <Input
                                label="Start Date"
                                type="date"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                error={field.state.meta.errors.join(', ')}
                            />
                        )}
                    />

                    <form.Field
                        name="endDate"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: CreateVacationSchema.entries.endDate,
                        }}
                        children={(field) => (
                            <div>
                                <Input
                                    label="End Date"
                                    type="date"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    error={field.state.meta.errors.join(', ')}
                                />
                            </div>
                        )}
                    />

                    <div className={style.buttonsContainer}>
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText={`${form.state.isSubmitting ? 'Submitting' : 'Submit'}`}
                            disabled={form.state.isSubmitting}
                            isSubmit
                        />
                        <Button
                            type={ButtonTypes.SECONDARY}
                            btnText="Cancel"
                            onClick={createVacationToggler}
                        />
                    </div>
                    {error && <ErrorText>{error}</ErrorText>}
                </form>
            </>
        </Modal>
    )
}
