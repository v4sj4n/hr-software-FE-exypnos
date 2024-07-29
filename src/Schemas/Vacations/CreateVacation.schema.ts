import z from 'zod'
export const createVacationSchema = z.object({
  type: z.enum(['vacation', 'sick', 'personal', 'maternity'], {
    message: `Vacations should be one of 'vacation', 'sick', 'personal', 'maternity'`,
  }),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  userId: z.string(),
})

export type CreateVacationFormFields = z.infer<typeof createVacationSchema>
