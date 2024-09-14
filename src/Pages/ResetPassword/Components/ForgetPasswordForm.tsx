import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { email, nonEmpty, pipe, string } from 'valibot'
import { useFormForgetPassword } from '../Hook'
import Input from '@/Components/Input/Index'
import style from '../Styles/ResetPassword.module.css'
import Toast from '@/Components/Toast/Toast'

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
                    <div>
                        <Input
                            IsUsername
                            type="email"
                            label={'Email'}
                            name="email"
                            width="350px"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors && (
                            <ErrorText>{field.state.meta.errors}</ErrorText>
                        )}
                    </div>
                )}
            />
            <Button
                type={ButtonTypes.PRIMARY}
                isSubmit
                disabled={form.state.isSubmitting}
                btnText={form.state.isSubmitting ? 'Submitting...' : 'Submit'}
            />
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
