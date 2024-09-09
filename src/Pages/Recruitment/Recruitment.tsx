import Button1 from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import Input from '../../Components/Input/Index'
import logo from '/Images/recruitmentLogo.png'
import image from '/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png'
import Card from '../../Components/Card/Card'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { useRef, useState } from 'react'
import Toast from '@/Components/Toast/Toast'
import { useForm, ValidationError } from '@tanstack/react-form'
import Selecter from '@/Components/Input/components/Select/Selecter'
import style from './style/Recruitment.module.css'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import {
    array,
    check,
    email,
    isoDate,
    minLength,
    picklist,
    pipe,
    regex,
    string,
} from 'valibot'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import { AxiosError } from 'axios'

export default function Recruitment() {
    const form = useForm<{
        applicationMethod: string
        dob: string
        email: string
        experience: string
        file: FileList | null
        firstName: string
        lastName: string
        phoneNumber: string
        positionApplied: string
        salaryExpectations: string
        technologiesUsed: string[]
    }>({
        defaultValues: {
            applicationMethod: '',
            dob: new Date().toISOString().split('T')[0],
            email: '',
            experience: '',
            file: null,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            positionApplied: '',
            salaryExpectations: '',
            technologiesUsed: [],
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData()
                formData.append('applicationMethod', value.applicationMethod)
                formData.append('dob', value.dob)
                formData.append('email', value.email)
                formData.append('experience', value.experience)
                if (value.file && value.file.length > 0) {
                    formData.append('file', value.file[0])
                }
                formData.append('firstName', value.firstName)
                formData.append('lastName', value.lastName)
                formData.append('phoneNumber', value.phoneNumber)
                formData.append('positionApplied', value.positionApplied)
                formData.append('salaryExpectations', value.salaryExpectations)
                formData.append(
                    'technologiesUsed',
                    JSON.stringify(value.technologiesUsed),
                )

                const response = await AxiosInstance.post(
                    '/applicant',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )
                if ([200, 201].includes(response.status)) {
                    setShowModal(true)
                }
            } catch (err: unknown) {
                console.log(err)
                if (err instanceof AxiosError) {
                    if (err?.response?.data?.message) {
                        setError(err?.response?.data?.message)
                        return
                    }
                    if (err.code === 'ERR_NETWORK') {
                        setError(
                            'No internet connection. Please try again later.',
                        )
                        return
                    }
                    setError('An error occurred while creating your applicant')
                }
            }
        },
    })

    const technologies = [
        'Angular',
        'AWS',
        'Azure',
        'CSS',
        'Docker',
        'Express.js',
        'Google Cloud',
        'HTML',
        'Java',
        'JavaScript',
        'jQuery',
        'Kubernetes',
        'MongoDB',
        'Nestjs',
        'Node.js',
        'PHP',
        'Python',
        'React',
        'Ruby',
        'SASS',
        'TypeScript',
        'Vue.js',
    ]

    const foundMethod = [
        'LinkedIn',
        'Instagram',
        'Telegram',
        'Your Connections',
        'Other',
    ]

    const experience = [
        '0-1 year',
        '1-3 years',
        '3-5 years',
        '5-7 years',
        '7-10 years',
        '10+ years',
    ]

    const [showModal, setShowModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    return (
        <main className={style.background}>
            <Card
                gap="20px"
                padding="30px"
                borderRadius=".8rem"
                className={style.cardContainer}
            >
                <div className={style.header}>
                    <img className={style.companyLogo} alt="img" src={logo} />
                    <div className={style.title}>Apply to Codevider</div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <form.Field
                        name="firstName"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('First Name is required'),
                                minLength(
                                    2,
                                    'First Name needs to be at least 2 characters',
                                ),
                            ),
                        }}
                        children={({
                            handleChange,
                            state: {
                                value,
                                meta: { errors },
                            },
                        }) => (
                            <div>
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <form.Field
                        name="lastName"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Last Name is required'),
                                minLength(
                                    2,
                                    'Last Name needs to be at least 2 characters',
                                ),
                            ),
                        }}
                        children={({
                            handleChange,
                            state: {
                                value,
                                meta: { errors },
                            },
                        }) => (
                            <div>
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />
                    <form.Field
                        name="email"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Email is required'),
                                email('Invalid email format'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Input
                                    label="Email"
                                    name="Email"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <form.Field
                        name="dob"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Please enter a date'),
                                isoDate('Please enter a date.'),
                                check((input) => {
                                    const birthDate = dayjs(input)
                                    const currDate = dayjs()
                                    const age = currDate.diff(birthDate, 'year')
                                    return age >= 18 && age <= 65
                                }, 'You must be between 18-65 years old'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Input
                                    label="Date of birth"
                                    name="dob"
                                    IsUsername
                                    type="date"
                                    shrink={true}
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />
                    <form.Field
                        name="phoneNumber"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Phone Number is required'),
                                regex(
                                    /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/,
                                    'Invalid phone number format',
                                ),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Input
                                    label="Phone Number"
                                    name="phoneNumber"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <form.Field
                        name="applicationMethod"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Application Method is required'),
                                minLength(1, 'Enter an applying method'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Selecter
                                    label="Applying Method"
                                    name="applicationMethod"
                                    multiple={false}
                                    options={foundMethod}
                                    value={value}
                                    onChange={(newValue) =>
                                        handleChange(newValue as string)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <form.Field
                        name="positionApplied"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Position Applied is required'),
                                minLength(1, 'Write a work position'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Input
                                    label="Work position"
                                    name="positionApplied"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <form.Field
                        name="salaryExpectations"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                string('Salary Expectation is required'),
                                minLength(3, 'Enter a wage expectation'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div>
                                <Input
                                    label="Wage expectation"
                                    name="salaryExpectations"
                                    IsUsername
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />
                    <form.Field
                        name="experience"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: picklist(
                                experience,
                                'Please select your experience level',
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div className={style.spanTwoDiv}>
                                <Selecter
                                    multiple={false}
                                    label="Experience"
                                    name="experience"
                                    options={experience}
                                    value={value as string}
                                    onChange={(newValue) =>
                                        handleChange(newValue as string)
                                    }
                                />
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />
                    <form.Field
                        name="technologiesUsed"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: pipe(
                                array(
                                    picklist(
                                        technologies,
                                        'Please select your preferred technologies',
                                    ),
                                ),
                                minLength(1, 'Choose at least one technology'),
                            ),
                        }}
                        children={({
                            state: {
                                value,
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div className={style.spanTwoDiv}>
                                <Selecter
                                    options={technologies}
                                    multiple
                                    label="Technologies"
                                    name="technologiesUsed"
                                    onChange={(newValue) =>
                                        handleChange(newValue as [])
                                    }
                                    value={value}
                                />
                                <ErrorRenderer errors={errors} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="file"
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) {
                                    return 'File is required'
                                }
                                const name = value[0]?.name
                                if (!name) {
                                    return 'File cannot be null'
                                }
                                if (!name.match(/\.(pdf|docx|doc)$/i)) {
                                    return 'Please select a valid PDF, DOCX, or DOC file'
                                }
                            },
                        }}
                        children={({
                            state: {
                                meta: { errors },
                            },
                            handleChange,
                        }) => (
                            <div className={style.fileInput}>
                                <p>{fileName || 'No file selected'}</p>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    style={{
                                        backgroundColor: '#2469FF',
                                        color: '#FFFFFF',
                                        boxShadow: 'none',
                                        fontFamily: 'Outfit, sans-serif',
                                    }}
                                    fullWidth
                                >
                                    Upload CV
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null
                                            setFileName(file?.name || null)
                                            handleChange(e.target.files)
                                        }}
                                        accept=".pdf,.doc,.docx"
                                        ref={fileInputRef}
                                    />
                                </Button>
                                {<ErrorRenderer errors={errors} />}
                            </div>
                        )}
                    />

                    <Button1
                        type={ButtonTypes.SECONDARY}
                        btnText="Reset"
                        width="100%"
                        onClick={() => {
                            console.log('Resetting form')
                            form.reset()
                        }}
                    />
                    <Button1
                        type={ButtonTypes.TERTIARY}
                        btnText={
                            form.state.isSubmitting ? 'Submitting...' : 'Submit'
                        }
                        disabled={form.state.isSubmitting}
                        isSubmit
                    />
                </form>
                {error && <ErrorText>{error}</ErrorText>}
            </Card>
            <img alt="image" src={image} className={style.illustration} />
            {showModal && (
                <Toast
                    message="Please check your inbox or spam to confirm your identity."
                    onClose={() => setShowModal(false)}
                    open={showModal}
                    severity={'success'}
                />
            )}
        </main>
    )
}

const ErrorRenderer: React.FC<{ errors: ValidationError[] | null }> = ({
    errors,
}) => {
    return (
        <>
            {errors && errors.length > 0 ? (
                <ErrorText>{errors.map((error) => error).join(', ')}</ErrorText>
            ) : null}
        </>
    )
}
