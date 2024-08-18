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

    technologiesUsed: pipe(
        array(string('Technologies Used is required')),
        minLength(1, 'Choose at least one technology'),
    ),
})
export type RecruitmentFormFields = InferInput<typeof RecruitmentSchema>

export const RecruitmentFormFieldsDefaultValues = {
    applicationMethod: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    experience: '',
    positionApplied: '',
    technologiesUsed: [],
    salaryExpectations: '',
    file: undefined,
}
