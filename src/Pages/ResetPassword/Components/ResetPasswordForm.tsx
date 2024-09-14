import { useContext, useEffect } from 'react'
import { useFormResetPassword } from '../Hook'
import { ResetPasswordContext } from '../ResetPasswordContext'
import Input from '@/Components/Input/Index'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useNavigate } from 'react-router-dom'
import style from '../Styles/ResetPassword.module.css'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { minLength, nonEmpty, pipe, regex, string } from 'valibot'

export const ResetPasswordForm = () => {
    const { form, error, isError, isSuccess } = useFormResetPassword()
    const {
        newPasswordShow,
        confirmNewPasswordShow,
        setNewPasswordShow,
        setConfirmNewPasswordShow,
    } = useContext(ResetPasswordContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate('/?reset=success')
        }
    }, [isSuccess, navigate])
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
                name="password"
                validatorAdapter={valibotValidator()}
                validators={{
                    onChange: pipe(
                        string('Password is required'),
                        nonEmpty('Please type your password'),
                        minLength(
                            8,
                            'Password must be at least 8 characters long',
                        ),
                        regex(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                        ),
                    ),
                }}
                children={(field) => (
                    <div>
                        <Input
                            isPassword
                            type={newPasswordShow}
                            onClick={() => setNewPasswordShow((prev) => !prev)}
                            label="New Password"
                            name="password"
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
            <form.Field
                name="confirmPassword"
                validators={{
                    onChangeListenTo: ['password'],
                    onChange: ({ value, fieldApi }) => {
                        if (value !== fieldApi.form.getFieldValue('password')) {
                            return 'Passwords do not match'
                        }
                        return undefined
                    },
                }}
                children={(field) => (
                    <div>
                        <Input
                            isPassword
                            type={confirmNewPasswordShow}
                            onClick={() =>
                                setConfirmNewPasswordShow((prev) => !prev)
                            }
                            label="Confirm Password"
                            name="confirmPassword"
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
        </form>
    )
}
