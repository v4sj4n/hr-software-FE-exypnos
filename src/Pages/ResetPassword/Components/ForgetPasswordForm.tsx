import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { email, nonEmpty, pipe, string } from 'valibot'
import { useFormForgetPassword } from '../Hook'
import style from '../Styles/ResetPassword.module.css'
import Toast from '@/NewComponents/Toast'
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { Email } from '@mui/icons-material'

export const ForgetPasswordForm = () => {
    const { form, error, isError, isSuccess } = useFormForgetPassword()
    return (
        <form
            className={style.formStyle}
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <form.Field
                name="email"
                validators={{
                    onChange: pipe(
                        string('Email is required'),
                        nonEmpty('Please type your email'),
                        email('Invalid email format'),
                    ),
                }}
                children={(field) => (
                    <FormControl error={field.state.meta.errors.length > 0}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            startDecorator={<Email />}
                            placeholder="Enter your email"
                            value={field.state.value}
                            fullWidth
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FormHelperText>
                            {field.state.meta.errors}
                        </FormHelperText>
                    </FormControl>
                )}
            />
            <Button type="submit" loading={form.state.isSubmitting}>
                Reset
            </Button>
            {isError && <ErrorText>{error?.message}</ErrorText>}
            <Toast
                severity="success"
                open={isSuccess}
                message="Please check your email inbox or spam for your password reset link"
                onClose={() => {}}
            />
        </form>
    )
}
