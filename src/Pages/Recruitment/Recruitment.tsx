import logo from '/Images/recruitmentLogo.png'
import image from '/Images/Vector-illustration-of-communication-Graphics-69695603-1-removebg-preview.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { useContext } from 'react'
import style from './style/Recruitment.module.css'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import {
    experience,
    foundMethod,
    technologies,
} from './Component/RecruitmentData'
import {
    RecruitmentContext,
    RecruitmentProvider,
} from './Context/RecruitmentContext'
import { useRecruitmentForm } from './Hook'
import { RecruitmentSchema } from '@/Schemas/Recruitment/Recruitment.schema'
import {
    Input,
    Card,
    Stack,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    Option,
    Button,
} from '@mui/joy'
import Toast from '@/NewComponents/Toast'

function RecruitmentBase() {
    const {
        error,
        setError,
        showModal,
        setShowModal,
        fileInputRef,
        fileName,
        setFileName,
    } = useContext(RecruitmentContext)

    const { form } = useRecruitmentForm()

    return (
        <main className={style.background}>
            <Card className={style.cardContainer}>
                <Stack className={style.header}>
                    <img className={style.companyLogo} alt="img" src={logo} />
                    <div className={style.title}>Apply to Codevider</div>
                </Stack>
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
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <form.Field
                        name="lastName"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.lastName,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter your last name"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <form.Field
                        name="email"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.email,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) => {
                                        field.handleChange(e.target.value)
                                        setError(null)
                                    }}
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <form.Field
                        name="dob"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.dob,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Date of birth</FormLabel>
                                <Input
                                    type="date"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <form.Field
                        name="phoneNumber"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.phoneNumber,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Phone number</FormLabel>
                                <Input
                                    type="number"
                                    startDecorator={'+355'}
                                    placeholder="Enter your last name"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) => {
                                        setError(null)
                                        field.handleChange(e.target.value)
                                    }}
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <form.Field
                        name="applicationMethod"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange:
                                RecruitmentSchema.entries.applicationMethod,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>How did you found out?</FormLabel>
                                <Select
                                    value={field.state.value}
                                    onChange={(e, newValue) => {
                                        e?.preventDefault()
                                        field.handleChange(newValue as string)
                                    }}
                                >
                                    {foundMethod.map((method) => {
                                        return (
                                            <Option value={method}>
                                                {method}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <form.Field
                        name="positionApplied"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.positionApplied,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Work Position</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter your work position"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <form.Field
                        name="salaryExpectations"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange:
                                RecruitmentSchema.entries.salaryExpectations,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Salary Expectations</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter your salary expectations"
                                    value={field.state.value}
                                    fullWidth
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <form.Field
                        name="experience"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange: RecruitmentSchema.entries.experience,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Experience</FormLabel>
                                <Select
                                    placeholder="Enter your experience"
                                    value={field.state.value}
                                    onChange={(e, newValue) => {
                                        e?.preventDefault()
                                        field.handleChange(newValue as string)
                                    }}
                                >
                                    {experience.map((method) => {
                                        return (
                                            <Option value={method}>
                                                {method}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <form.Field
                        name="technologiesUsed"
                        validatorAdapter={valibotValidator()}
                        validators={{
                            onChange:
                                RecruitmentSchema.entries.technologiesUsed,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Technologies</FormLabel>
                                <Select
                                    multiple
                                    placeholder="Enter your technologies"
                                    value={field.state.value}
                                    onChange={(e, newValue) => {
                                        e?.preventDefault()
                                        field.handleChange(newValue)
                                    }}
                                >
                                    {technologies.map((method) => {
                                        return (
                                            <Option value={method}>
                                                {method}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>
                                    {field.state.meta.errors}
                                </FormHelperText>
                            </FormControl>
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
                        children={(field) => (
                            <div className={style.fileInput}>
                                <p>{fileName || 'No file selected'}</p>
                                <Button
                                    color="primary"
                                    variant="soft"
                                    startDecorator={<CloudUploadIcon />}
                                    sx={{ marginBottom: 2 }}
                                    fullWidth
                                    onClick={() => {
                                        const el = fileInputRef.current
                                        if (el) {
                                            el.click()
                                        }
                                    }}
                                >
                                    Upload CV
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null
                                            setFileName(file?.name || null)
                                            field.handleChange(e.target.files)
                                        }}
                                        accept=".pdf,.doc,.docx"
                                        ref={fileInputRef}
                                    />
                                </Button>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorText>
                                        {field.state.meta.errors}
                                    </ErrorText>
                                )}
                            </div>
                        )}
                    />
                    <Button
                        variant="soft"
                        type="button"
                        onClick={() => {
                            form.reset()
                            setFileName(null)
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        loading={form.state.isSubmitting}
                        disabled={form.state.isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
                {error && <ErrorText>{error}</ErrorText>}
            </Card>
            <img alt="image" src={image} className={style.illustration} />

            <Toast
                message="Please check your inbox or spam to confirm your identity."
                onClose={() => setShowModal(false)}
                open={showModal}
                severity={'success'}
            />
        </main>
    )
}

export default function Recruitment() {
    return (
        <RecruitmentProvider>
            <RecruitmentBase />
        </RecruitmentProvider>
    )
}
