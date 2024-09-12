import Button1 from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import Input from '../../Components/Input/Index'
import logo from '/Images/recruitmentLogo.png'
import image from '/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png'
import Card from '../../Components/Card/Card'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { useContext } from 'react'
import Toast from '@/Components/Toast/Toast'
import { ValidationError } from '@tanstack/react-form'
import Selecter from '@/Components/Input/components/Select/Selecter'
import style from './style/Recruitment.module.css'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import {
    experience,
    foundMethod,
    technologies,
} from './Component/RecruitmentData'
import { RecruitmentContext } from './Context/RecruitmentContext'
import { useRecruitmentForm } from './Hook'
import { RecruitmentSchema } from '@/Schemas/Recruitment/Recruitment.schema'

export default function Recruitment() {
    const { error, showModal, setShowModal, fileInputRef } =
        useContext(RecruitmentContext)
    const { form } = useRecruitmentForm()
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
                            onChange: RecruitmentSchema.entries.firstName,
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
                            onChange: RecruitmentSchema.entries.lastName,
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
                            onChange: RecruitmentSchema.entries.email,
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
                            onChange: RecruitmentSchema.entries.dob,
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
                            onChange: RecruitmentSchema.entries.phoneNumber,
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
                                    icon={
                                        <p className={style.numberPrefix}>
                                            +355
                                        </p>
                                    }
                                    iconPosition="start"
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
                            onChange:
                                RecruitmentSchema.entries.applicationMethod,
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
                            onChange: RecruitmentSchema.entries.positionApplied,
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
                            onChange:
                                RecruitmentSchema.entries.salaryExpectations,
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
                            onChange: RecruitmentSchema.entries.experience,
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
                            onChange:
                                RecruitmentSchema.entries.technologiesUsed,
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
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    className={style.uploadButton}
                                    fullWidth
                                >
                                    Upload CV
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
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
