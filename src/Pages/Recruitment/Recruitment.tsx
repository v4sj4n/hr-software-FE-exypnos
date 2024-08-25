import Button1 from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import Input from '../../Components/Input/Index'
import style from './style/Recruitment.module.css'
import logo from '/Images/image_1-removebg-preview.png'
import image from '/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png'
// import { useCreateAplicant } from './Context/Recruitment.Provider'
import Card from '../../Components/Card/Card'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
    RecruitmentFormFields,
    RecruitmentFormFieldsDefaultValues,
    RecruitmentSchema,
} from '@/Schemas/Recruitment/Recruitment.schema'
import { AxiosError } from 'axios'
import AxiosInstance from '@/Helpers/Axios'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { Autocomplete, TextField } from '@mui/material'
import { valibotResolver } from '@hookform/resolvers/valibot'

export default function Recruitment() {
    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RecruitmentFormFields>({
        defaultValues: RecruitmentFormFieldsDefaultValues,
        resolver: valibotResolver(RecruitmentSchema),
    })
    const technologies = ['Angular', 'jQuery', 'Javascript', 'React', 'Vue.js','MongoDb', 'Node.js','Python','Ruby','Java']

    const onSubmit: SubmitHandler<RecruitmentFormFields> = async (
        data: RecruitmentFormFields,
    ) => {
        try {
            const formData = new FormData()
            Object.keys(data).forEach((key) => {
                if (key === 'technologiesUsed') {
                    formData.append(
                        'technologiesUsed',
                        JSON.stringify(data.technologiesUsed),
                    )
                } else if (
                    key === 'file' &&
                    data.file instanceof FileList &&
                    data.file.length > 0
                ) {
                    formData.append('file', data.file[0])
                } else {
                    formData.append(
                        key,
                        data[key as keyof RecruitmentFormFields] as string,
                    )
                }
            })

            const res = await AxiosInstance.post('/applicant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res)
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err?.response?.data?.message) {
                    setError('root', {
                        message: err?.response?.data?.message,
                    })
                    return
                }
                if (err.code === 'ERR_NETWORK') {
                    setError('root', {
                        message:
                            'No internet connection. Please try again later.',
                    })
                    return
                }
                setError('root', {
                    message: 'An error occurred while logging in',
                })
            } else {
                setError('root', {
                    message: 'An error occurred while creating the asset',
                })
            }
        }
    }

    return (
        <div className={style.background}>
            <div className={style.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card gap="20px" padding="30px">
                        <img className={style.img2} alt="img" src={logo} />
                        <div className={style.title}>Apply to Codevider</div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    register={register('firstName')}
                                    IsUsername
                                    width="300px"
                                />
                                {errors.firstName && (
                                    <ErrorText>
                                        {errors.firstName.message}
                                    </ErrorText>
                                )}
                            </div>
                            <div>
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    register={register('lastName')}
                                    IsUsername
                                    width="300px"
                                />
                                {errors.lastName && (
                                    <ErrorText>
                                        {errors.lastName.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <Input
                                    label="Date of birth"
                                    name="dob"
                                    register={register('dob')}
                                    IsUsername
                                    width="300px"
                                    type="date"
                                />
                                {errors.dob && (
                                    <ErrorText>{errors.dob.message}</ErrorText>
                                )}
                            </div>

                            <div>
                                <Input
                                    label="Phone Number"
                                    name="phoneNumber"
                                    IsUsername
                                    width="300px"
                                    register={register('phoneNumber')}
                                />
                                {errors.phoneNumber && (
                                    <ErrorText>
                                        {errors.phoneNumber.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <Input
                                    label="Email"
                                    name="email"
                                    register={register('email')}
                                    IsUsername
                                    width="300px"
                                />
                                {errors.email && (
                                    <ErrorText>
                                        {errors.email.message}
                                    </ErrorText>
                                )}
                            </div>
                            <div>
                                <Input
                                    label="Applying method"
                                    name="applicationMethod"
                                    IsUsername
                                    width="300px"
                                    register={register('applicationMethod')}
                                />
                                {errors.applicationMethod && (
                                    <ErrorText>
                                        {errors.applicationMethod.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <Input
                                    label="Work position"
                                    name="positionApplied"
                                    IsUsername
                                    width="300px"
                                    register={register('positionApplied')}
                                />
                                {errors.positionApplied && (
                                    <ErrorText>
                                        {errors.positionApplied.message}
                                    </ErrorText>
                                )}
                            </div>
                            <div>
                                <Input
                                    label="Wage expectation"
                                    name="salaryExpectations"
                                    IsUsername
                                    width="300px"
                                    register={register('salaryExpectations')}
                                />
                                {errors.salaryExpectations && (
                                    <ErrorText>
                                        {errors.salaryExpectations.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <Input
                                    label="Previous working experience"
                                    name="experience"
                                    IsUsername
                                    register={register('experience')}
                                    width="620px"
                                />
                                {errors.experience && (
                                    <ErrorText>
                                        {errors.experience.message}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Controller
                                    name="technologiesUsed"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            multiple
                                            options={technologies}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Technologies Used"
                                                    error={
                                                        !!errors.technologiesUsed
                                                    }
                                                    helperText={
                                                        errors.technologiesUsed
                                                            ?.message
                                                    }
                                                />
                                            )}
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
                                            value={field.value || []}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    style={{
                                        width: '620px',
                                        backgroundColor: '#2469FF',
                                        color: '#FFFFFF',
                                        boxShadow: 'none',
                                        fontFamily: 'Outfit, sans-serif',
                                    }}
                                >
                                    Upload CV
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".pdf,.doc,.docx"
                                        {...register('file')}
                                    />
                                </Button>
                                {errors.file && errors.file.message && (
                                    <ErrorText>
                                        {errors.file.message as string}
                                    </ErrorText>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Button1
                                type={ButtonTypes.SECONDARY}
                                btnText="Reset"
                                width="100%"
                                onClick={() => {
                                    console.log('Resetting form')
                                    reset()
                                }}
                            />
                            <Button1
                                type={ButtonTypes.TERTIARY}
                                btnText={
                                    isSubmitting ? 'Submitting...' : 'Submit'
                                }
                                disabled={isSubmitting}
                                onClick={() => console.log('Submitting form')}
                                isSubmit
                            />
                        </div>
                        {errors.root && (
                            <ErrorText>{errors.root.message}</ErrorText>
                        )}
                    </Card>
                </form>
            </div>
            <img
                alt="image"
                src={image}
                style={{ width: '600px', height: 'auto' }}
            />
        </div>
    )
}
