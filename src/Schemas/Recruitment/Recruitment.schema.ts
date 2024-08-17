import z from 'zod'

export const recruitmentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, {
      message: 'First name must not exceed 50 characters',
    }),
  lastName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, {
      message: 'First name must not exceed 50 characters',
    }),
  age: z.number().min(18, { message: 'Age must be at least 18' }).max(100, {
    message: 'Age must not exceed 100',
  }),
  phoneNumber: z
    .string()
    .regex(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/, {
      message: 'Invalid phone number format',
    }),
  email: z
    .string()
    .email({ message: 'This field must be a valid email address' }),

  applicationMethod: z
    .string()
    .min(1, { message: 'Select an applying method' }),
  positionApplied: z.string().min(1, { message: 'Select a work position' }),
  salaryExpectation: z.string().min(3, { message: 'Enter a wage expectation' }),
  experience: z.string().min(1, {
    message: 'Select a previous working experience',
  }),
  technologiesUsed: z.array(z.string()).min(1, {
    message: 'Select at least one technology',
  }),
  file: z
    .any()
    .refine((file: File) => file.size < 5000000, {
      message: 'File size should not exceed 5MB',
    })

    .refine(
      (file: File) => {
        if (file?.name) {
          const fileType = file.name.split('.').pop()
          if (fileType === 'docx' || fileType === 'pdf' || fileType === 'doc')
            return true
        }
        return false
      },
      {
        message: 'Only.docx, .doc or .pdf or  files are allowed',
      }
    ),
})

export type RecruitmentFormFields = z.infer<typeof recruitmentSchema>