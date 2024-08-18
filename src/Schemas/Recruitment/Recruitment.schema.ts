import {
    array,
    check,
    email,
    InferInput,
    instance,
    isoDate,
    maxSize,
    mimeType,
    minLength,
    object,
    pipe,
    regex,
    string,
    transform,
} from 'valibot'
import dayjs from 'dayjs'

export const RecruitmentSchema = object({
    applicationMethod: pipe(
        string('Application Method is required'),
        minLength(1, 'Enter an applying method'),
    ),
    dob: pipe(
        string('Please enter a date'),
        isoDate('Please enter a date.'),
        check((input) => {
            const birthDate = dayjs(input)
            const currDate = dayjs()
            const age = currDate.diff(birthDate, 'year')

            return age >= 18 && age <= 65
        }, 'You must be between 18-65 years old'),
    ),
    email: pipe(string('Email is required'), email('Invalid email format')),
    experience: pipe(
        string('Previous Working Experience is required'),
        minLength(1, 'Select a previous working experience'),
    ),
    file: pipe(
        instance(FileList, 'Please enter a file'),
        check((input) => input.length > 0),
        transform((input) => input[0]),
        mimeType(['application/pdf']),
        maxSize(1024 * 1024 * 10),
    ),

    firstName: pipe(
        string('First Name is required'),
        minLength(2, 'First Name needs to be at least 2 characters'),
    ),
    lastName: pipe(
        string('Last Name is required'),
        minLength(2, 'Last Name needs to be at least 2 characters'),
    ),

    phoneNumber: pipe(
        string('Phone Number is required'),
        regex(
            /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/,
            'Invalid phone number format',
        ),
    ),

    positionApplied: pipe(
        string('Position Applied is required'),
        minLength(1, 'Write a work position'),
    ),
    salaryExpectations: pipe(
        string('Salary Expectation is required'),
        minLength(3, 'Enter a wage expectation'),
    ),

    technologiesUsed: array(string('Technologies Used is required')),
})
export type RecruitmentFormFields = InferInput<typeof RecruitmentSchema>

// import z from 'zod'
// function checkFileType(file: File) {
//     if (file?.name) {
//         const fileType = file.name.split('.').pop()
//         if (fileType === 'docx' || fileType === 'pdf') return true
//     }
//     return false
// }

// export const recruitmentSchema = z.object({
//     firstName: z
//         .string()
//         .min(2, { message: 'First name must be at least 2 characters long' })
//         .max(50, {
//             message: 'First name must not exceed 50 characters',
//         }),
//     lastName: z
//         .string()
//         .min(2, { message: 'Last name must be at least 2 characters long' })
//         .max(50, {
//             message: 'Last name must not exceed 50 characters',
//         }),
//     age: z
//         .string()
//         .refine((val) => !Number.isNaN(parseInt(val, 10)), {
//             message: 'Expected number, received a string',
//         })
//         .refine((val) => Number(val) >= 18 && Number(val) <= 65, {
//             message: 'Age must be between 18 and 65',
//         }),
//     phoneNumber: z
//         .string()
//         .regex(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/, {
//             message: 'Invalid phone number format',
//         }),
//     email: z
//         .string()
//         .email({ message: 'This field must be a valid email address' }),

//     applicationMethod: z
//         .string()
//         .min(1, { message: 'Select an applying method' }),
//     positionApplied: z.string().min(1, { message: 'Select a work position' }),
//     salaryExpectation: z
//         .string()
//         .min(3, { message: 'Enter a wage expectation' }),
//     experience: z.string().min(1, {
//         message: 'Select a previous working experience',
//     }),
//     technologiesUsed: z.array(z.string()).min(1, {
//         message: 'Select at least one technology',
//     }),
//     file: z
//         .instanceof(FileList)
//         .refine((fileList) => fileList.length > 0, {
//             message: 'File is required',
//         })
//         .transform((fileList) => fileList[0])
//         .refine(
//             (file) => file instanceof File && checkFileType(file),
//             'Only .pdf, .docx formats are supported.',
//         ),
// })
