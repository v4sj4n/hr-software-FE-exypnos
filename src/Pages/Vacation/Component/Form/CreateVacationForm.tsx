import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useContext } from 'react'
import { AxiosError } from 'axios'
import { VacationContext } from '../../VacationContext'
import AxiosInstance from '../../../../Helpers/Axios'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Input from '../../../../Components/Input/Index'
import Button from '../../../../Components/Button/Button'
import { ErrorText } from '../ErrorText'


// TO FIX
const vacationSchema = z
  .object({
    type: z.enum(['vacation', 'sick', 'personal', 'maternity'], {
      message: `Vacations should be one of 'vacation', 'sick', 'personal', 'maternity'`,
    }),
    description: z.string().optional(),
    startDate: z
      .string()
      .min(Date.parse(new Date().toISOString().split('T')[0]), { message: 'Start date should be in the future' }),
    endDate: z.coerce.date(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: 'End date should be after start date',
    path: ['endDate'],
  })


type FormFields = z.infer<typeof vacationSchema>

export const CreateVacationForm = () => {
  const { setVacations, handleCloseModal } = useContext(VacationContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(vacationSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await AxiosInstance.post('/asset', data)
      console.log('Asset created successfully:', res.data)
      if (res.status === 201) {
        setVacations((prevVacations) => [...prevVacations, res.data])
        handleCloseModal()
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError('root', {
          message: err?.response?.data?.message,
        })
      } else {
        setError('root', {
          message: 'An error occurred while creating the asset',
        })
      }
    }
  }

  return (
    <>
      <h3>Create a vacation</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '1.5rem',
        }}
      >
        <div>
          <select
            {...register('type')}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '0.5rem',
            }}
          >
            <option value="" disabled selected>
              Select a vacation type
            </option>
            <option value="vacation">Vacation</option>
            <option value="sick">Sick</option>
            <option value="personal">Personal</option>
            <option value="maternity">Maternity</option>
          </select>
          {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
        </div>

        <div>
          <Input
            IsUsername
            name="description"
            width={'100%'}
            label="description"
            register={register('description')}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>

        <div>
        <div style={{ display: 'flex', gap: '0.3rem', justifyContent: "space-between" }}>
            <input type="date" {...register('startDate')} />
            <input type="date" {...register('endDate')} />
          </div>

          {errors.startDate && (
            <ErrorText>{errors.startDate.message}</ErrorText>
          )}
          {errors.endDate && <ErrorText>{errors.endDate.message}</ErrorText>}
        </div>

        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <Button
            type={ButtonTypes.PRIMARY}
            btnText={isSubmitting ? 'Submitting' : 'Submit'}
            width={'100%'}
            isSubmit
          />
          <Button
            type={ButtonTypes.SECONDARY}
            btnText="Cancel"
            onClick={handleCloseModal}
            width={'100%'}
          />
        </div>

        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
      </form>
    </>
  )
}
