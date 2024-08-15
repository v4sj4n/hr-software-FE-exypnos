import { z } from 'zod'

export const VacationSchema = z
  .object({
    type: z
      .enum(['vacation', 'sick', 'personal', 'maternity'])
      .refine(
        (value) =>
          ['vacation', 'sick', 'personal', 'maternity'].includes(value),
        {
          message: `Vacations should be one of 'vacation', 'sick', 'personal', 'maternity'`,
        }
      ),
    status: z
      .enum(['pending', 'accepted', 'rejected'])
      .refine((value) => ['pending', 'accepted', 'rejected'].includes(value), {
        message: `Status should be one of 'pending', 'accepted', 'rejected'`,
      }),
    description: z.string().optional(),
    startDate: z.string().date(),
    endDate: z.string().date(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'End date should be after start date',
    path: ['endDate'],
  })
export type VacationFormFields = z.infer<typeof VacationSchema>
