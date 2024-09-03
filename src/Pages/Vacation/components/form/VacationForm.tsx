import {
    VacationFormFields,
    VacationSchema,
} from '@/Schemas/Vacations/Vacation.schema'
import { UseQueryResult } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useUpdateVacation } from '../../Hook'
import { useContext } from 'react'
import { VacationContext } from '../../VacationContext'
import { AxiosError } from 'axios'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Input from '@/Components/Input/Index'
import style from '../../style/vacationForm.module.scss'

type MyComponentProps = {
    data: UseQueryResult<any, Error>
}

export const VacationForm: React.FC<MyComponentProps> = ({
    data: vacation,
}) => {
    const { handleCloseVacationModalOpen, setToastConfigs } =
        useContext(VacationContext)
    const updater = useUpdateVacation()
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<VacationFormFields>({
        defaultValues: {
            status: vacation.data.status,
            type: vacation.data.type,
            startDate: dayjs(vacation.data.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(vacation.data.endDate).format('YYYY-MM-DD'),
        },
        resolver: valibotResolver(VacationSchema),
    })

    const onSubmit: SubmitHandler<VacationFormFields> = async (
        data: VacationFormFields,
    ) => {
        data.endDate = dayjs(data.endDate).toISOString()
        data.startDate = dayjs(data.startDate).toISOString()

        updater.mutate({ vacation: data })
        if (updater.isError) {
            setToastConfigs({
                isOpen: true,
                message: updater.error?.message || 'Failed to update vacation',
                severity: 'error',
            })
            if (updater.error instanceof AxiosError)
                setError('root', { message: updater.error.response?.data })
            else {
                setError('root', { message: 'something happened' })
            }
        } else {
            setToastConfigs({
                isOpen: true,
                message: 'Vacation updated successfully',
                severity: 'success',
            })
            handleCloseVacationModalOpen()
        }
    }

    return (
        <>
            <h3 className={style.fullName}>
                {vacation.data.userId.firstName} {vacation.data.userId.lastName}
            </h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={style.formContainer}
            >
                <div>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Selecter
                                label="Vacation Type"
                                name="Vacation Type"
                                multiple={false}
                                options={[
                                    'vacation',
                                    'sick',
                                    'personal',
                                    'maternity',
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Selecter
                                label="Status"
                                name="Status"
                                multiple={false}
                                options={['pending', 'accepted', 'rejected']}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                <div>
                    <Input
                        IsUsername
                        name="Start Date"
                        label="Start Date"
                        type="date"
                        register={register('startDate')}
                        placeholder="Start Date"
                        shrink
                    />
                    {errors.startDate && (
                        <ErrorText>{errors.startDate.message}</ErrorText>
                    )}
                </div>
                <div>
                    <Input
                        IsUsername
                        label="End Date"
                        name="End Date"
                        shrink
                        register={register('endDate')}
                        type="date"
                        placeholder="End Date"
                    />
                    {errors.endDate && (
                        <ErrorText>{errors.endDate.message}</ErrorText>
                    )}
                </div>
                <div className={style.buttonsContainer}>
                    <Button
                        type={ButtonTypes.PRIMARY}
                        btnText={`${isSubmitting ? 'Submitting' : 'Submit'}`}
                        disabled={isSubmitting}
                        isSubmit
                    />
                    <Button
                        type={ButtonTypes.SECONDARY}
                        btnText="Cancel"
                        onClick={handleCloseVacationModalOpen}
                    />
                </div>
                {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
            </form>
        </>
    )
}
