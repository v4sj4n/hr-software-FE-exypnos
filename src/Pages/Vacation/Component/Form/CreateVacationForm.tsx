import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { RefObject, useContext, useRef, useState } from 'react'
import { AxiosError } from 'axios'
import { VacationContext } from '../../VacationContext'
import AxiosInstance from '@/Helpers/Axios'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ErrorText } from '../ErrorText'

// ICONS
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

const vacationSchema = z.object({
  type: z.enum(['vacation', 'sick', 'personal', 'maternity'], {
    message: `Vacations should be one of 'vacation', 'sick', 'personal', 'maternity'`,
  }),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  userId: z.string(),
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
      const res = await AxiosInstance.post('/vacation', data)
      console.log('Vacation created successfully:', res.data)
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
          message: 'An error occurred while creating the vacation',
        })
      }
    }
  }

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)

  const handleClick = (element: RefObject<HTMLInputElement>) => {
    element.current?.showPicker()
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
          <div
            style={{
              display: 'flex',
              gap: '0.3rem',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                border: '1px #999999 solid',
                borderRadius: '5px',
                width: '100%',
              }}
            >
              <input
                type="date"
                {...register('startDate')}
                style={{ display: 'none' }}
                onChange={(e) => setStartDate(e.target.value)}
                ref={startDateRef}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: ' 0.5rem 1rem',
                }}
              >
                <label htmlFor="startDate">
                  {startDateRef.current?.value ? startDate : 'Start Date:'}
                </label>
                <span onClick={() => handleClick(startDateRef)}>
                  <CalendarTodayIcon />
                </span>
              </div>
              {errors.startDate && (
                <ErrorText>{errors.startDate.message}</ErrorText>
              )}
            </div>
            <div
              style={{
                border: '1px #999999 solid',
                borderRadius: '5px',
                width: '100%',
              }}
            >
              <input
                type="date"
                {...register('endDate')}
                style={{ display: 'none' }}
                ref={endDateRef}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: ' 0.5rem 1rem',
                }}
              >
                <label htmlFor="endDate">
                  {endDateRef.current?.value ? endDate : 'End Date:'}
                </label>
                <span onClick={() => handleClick(endDateRef)}>
                  <CalendarTodayIcon />
                </span>
              </div>
              {errors.endDate && (
                <ErrorText>{errors.endDate.message}</ErrorText>
              )}
            </div>
          </div>
        </div>
        <div>
          <Input
            IsUsername
            name="userId"
            width={'100%'}
            label="User ID"
            register={register('userId')}
          />
          {errors.userId && <ErrorText>{errors.userId.message}</ErrorText>}
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
