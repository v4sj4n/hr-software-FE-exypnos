import Button1 from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import Input from '../../Components/Input/Index'
import style from './style/Recruitment.module.css'
import logo from '/Images/image_1-removebg-preview.png'
import image from '/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png'
import { useCreateAplicant } from './Context/Recruitment.Provider'
import Card from '../../Components/Card/Card'
import { VisuallyHiddenInput } from '@/Components/Input/Styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ModalComponent } from '@/Components/Modal/Modal'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
    RecruitmentFormFields,
    RecruitmentSchema,
} from '@/Schemas/Recruitment/Recruitment.schema'
import { AxiosError } from 'axios'
import AxiosInstance from '@/Helpers/Axios'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { Autocomplete, TextField } from '@mui/material'
import { valibotResolver } from '@hookform/resolvers/valibot'

export default function Recruitment() {
    const {
        // handleChange,
        aplicantFormData,
        // handleTechnologiesChange,
        // handleFileChange,
        // handleCreateAplicant,
        showModal,
        closeModal,
        resetForm,
    } = useCreateAplicant()

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RecruitmentFormFields>({
        resolver: valibotResolver(RecruitmentSchema),
    })
    const technologies = ['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js']

    const onSubmit: SubmitHandler<RecruitmentFormFields> = async (
        data: RecruitmentFormFields,
    ) => {
        console.log(data)
        try {
            const formData = new FormData()
            Object.keys(data).forEach((key) => {
              console.log(key, data[key])
              if (key === 'technologiesUsed') {
                  formData.append('technologiesUsed', JSON.stringify(data.technologiesUsed))
              } else if (key === 'file' && data.file instanceof FileList && data.file.length > 0) {
                  formData.append('file', data.file[0])
              } else {
                  formData.append(key, data[key as keyof RecruitmentFormFields] as string)
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
                                    // value={aplicantFormData.firstName}
                                    // onChange={handleChange}
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
                                    // value={aplicantFormData.lastName}
                                    // onChange={handleChange}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.age}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.phoneNumber}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.email}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.applicationMethod}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.positionApplied}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.salaryExpectations}
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
                                    // onChange={handleChange}
                                    // value={aplicantFormData.experience}
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
                                    rules={{
                                        required: 'This field is required',
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <Autocomplete
                                            sx={{
                                                width: '100%',
                                            }}
                                            {...field}
                                            multiple
                                            options={technologies}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Technologies Used"
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                            onChange={(_, data) =>
                                                field.onChange(data)
                                            }
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
                                {/* <input
                                    type="file"
                                    id=""
                                    {...register('file')}
                                /> */}
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
                                onClick={resetForm}
                            />
                            {/* <Button1
              type={ButtonTypes.TERTIARY}
              btnText="Apply"
              onClick={handleCreateAplicant}
            /> */}
                            <button type="submit">
                                {isSubmitting ? 'Submitting' : 'Submit'}
                            </button>
                        </div>
                        {errors.root && (
                                    <ErrorText>
                                        {errors.root.message }
                                    </ErrorText>
                                )}
                    </Card>
                </form>
            </div>
            <img
                alt="image"
                src={image}
                style={{ width: '600px', height: 'auto' }}
            />
            {showModal && (
                <ModalComponent open={showModal} handleClose={closeModal}>
                    <div>Your email was sent successfully</div>
                </ModalComponent>
            )}
        </div>
    )
}
