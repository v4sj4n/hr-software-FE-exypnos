import { VacationSchema } from '@/Schemas/Vacations/Vacation.schema'
import { UseQueryResult } from '@tanstack/react-query'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useUpdateVacationForm } from '../../Hook'
import { useContext } from 'react'
import { VacationContext } from '../../VacationContext'
import { Vacation, VacationStatus, VacationType } from '../../types'
import style from '../../style/vacationForm.module.scss'
import { Typography } from '@mui/joy'
import { Input } from '@/NewComponents/Inputs/Input'
import { Select } from '@/NewComponents/Inputs/Select'

export const UpdateVacationForm: React.FC<{
    data: UseQueryResult<Vacation>
}> = ({ data: vacation }) => {
    const {
        handleCloseVacationModalOpen,
        errors: { updateError: error },
    } = useContext(VacationContext)

    const { form } = useUpdateVacationForm(vacation)

    return (
        vacation.data && (
            <>
                <Typography level="h3" className="pb-4">
                    {vacation.data.userId.firstName}{' '}
                    {vacation.data.userId.lastName}
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
                        validators={{
                            onChange: VacationSchema.entries.type,
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
                        name="status"
                        validators={{
                            onChange: VacationSchema.entries.status,
                        }}
                        children={(field) => (
                            <Select
                                label="Status"
                                options={[
                                    { value: 'accepted', label: 'Accepted' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'rejected', label: 'Rejected' },
                                ]}
                                value={field.state.value}
                                onChange={(e, newValue) => {
                                    e?.preventDefault()
                                    field.handleChange(
                                        newValue as VacationStatus,
                                    )
                                }}
                                error={field.state.meta.errors.join(', ')}
                            />
                        )}
                    />

                    <form.Field
                        name="startDate"
                        validators={{
                            onChange: VacationSchema.entries.startDate,
                        }}
                        children={(field) => (
                            <Input
                                type="date"
                                label="Start Date"
                                value={field.state.value}
                                onChange={(e) => {
                                    field.handleChange(e.target.value)
                                }}
                                error={field.state.meta.errors.join(', ')}
                            />
                        )}
                    />

                    <form.Field
                        name="endDate"
                        validators={{
                            onChange: VacationSchema.entries.endDate,
                        }}
                        children={(field) => (
                            <Input
                                type="date"
                                label="End Date"
                                value={field.state.value}
                                onChange={(e) => {
                                    field.handleChange(e.target.value)
                                }}
                                error={field.state.meta.errors.join(', ')}
                            />
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
                            onClick={handleCloseVacationModalOpen}
                        />
                    </div>
                    {error && <ErrorText>{error}</ErrorText>}
                </form>
            </>
        )
    )
}
