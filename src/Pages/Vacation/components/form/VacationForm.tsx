import {
    VacationFormFields,
    VacationSchema,
} from '@/Schemas/Vacations/Vacation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseQueryResult } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../../style/vacationForm.module.scss'
import dayjs from 'dayjs'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useUpdateVacation } from '../../Hook'
import { useContext } from 'react'
import { VacationContext } from '../../VacationContext'
import { AxiosError } from 'axios'

type MyComponentProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: UseQueryResult<any, Error>
}

export const VacationForm: React.FC<MyComponentProps> = ({
    data: vacation,
}) => {
    const updater = useUpdateVacation()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<VacationFormFields>({
        defaultValues: {
            status: vacation.data.status,
            type: vacation.data.type,
            startDate: dayjs(vacation.data.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(vacation.data.endDate).format('YYYY-MM-DD'),
        },
        resolver: zodResolver(VacationSchema),
    })

    const onSubmit: SubmitHandler<VacationFormFields> = async (
        data: VacationFormFields,
    ) => {
        data.endDate = dayjs(data.endDate).toISOString()
        data.startDate = dayjs(data.startDate).toISOString()

        updater.mutate({ vacation: data })
        if (updater.isError) {
            if (updater.error instanceof AxiosError)
                setError('root', { message: updater.error.response?.data })
        } else {
            setError('root', { message: 'something happened' })
        }
    }

    const vacationTypes = [
        { value: 'vacation', label: 'Vacation' },
        { value: 'sick', label: 'Sick' },
        { value: 'personal', label: 'Personal' },
        { value: 'maternity', label: 'Maternity' },
    ]

    const statusTypes = [
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' },
    ]

    const { handleCloseVacationModalOpen } = useContext(VacationContext)

    return (
        <div>
            <h3 className={style.fullName}>
                {vacation.data.userId.firstName} {vacation.data.userId.lastName}
            </h3>
            <form
                className={style.selectedForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <select id="type" {...register('type')}>
                        {vacationTypes.map((type) => (
                            <option value={type.value}>{type.label}</option>
                        ))}
                    </select>
                    <select id="status" {...register('status')}>
                        {statusTypes.map((status) => (
                            <option value={status.value}>{status.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className={style.oneElement}>
                        <input
                            type="date"
                            {...register('startDate')}
                            placeholder="Start Date"
                        />
                        {errors.startDate && (
                            <ErrorText>{errors.startDate.message}</ErrorText>
                        )}
                    </div>
                    <div className={style.oneElement}>
                        <input
                            type="date"
                            {...register('endDate')}
                            placeholder="End Date"
                        />
                        {errors.endDate && (
                            <ErrorText>{errors.endDate.message}</ErrorText>
                        )}
                    </div>
                </div>
                <div className={style.buttonGroups}>
                    <Button
                        type={ButtonTypes.SECONDARY}
                        btnText={'cancel'}
                        onClick={handleCloseVacationModalOpen}
                    />{' '}
                    <Button
                        type={ButtonTypes.PRIMARY}
                        btnText={`${isSubmitting ? 'Submitting' : 'Submit'}`}
                        disabled={isSubmitting}
                        isSubmit
                    />
                </div>
                {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
            </form>
        </div>
    )
}
