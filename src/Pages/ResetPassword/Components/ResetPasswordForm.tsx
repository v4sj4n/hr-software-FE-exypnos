import { useContext, useEffect } from 'react'
import { useFormResetPassword } from '../Hook'
import { ResetPasswordContext } from '../ResetPasswordContext'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { useNavigate } from 'react-router-dom'
import style from '../Styles/ResetPassword.module.css'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { minLength, nonEmpty, pipe, regex, string } from 'valibot'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
} from '@mui/joy'
import { Password, Visibility, VisibilityOff } from '@mui/icons-material'

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
                    <FormControl error={field.state.meta.errors.length > 0}>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type={newPasswordShow ? 'text' : 'password'}
                            startDecorator={<Password />}
                            endDecorator={
                                <IconButton
                                    variant="plain"
                                    onClick={() =>
                                        setNewPasswordShow((prev) => !prev)
                                    }
                                >
                                    {newPasswordShow ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            }
                            placeholder="Enter your new Password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FormHelperText>
                            {field.state.meta.errors}
                        </FormHelperText>
                    </FormControl>
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
                    <FormControl error={field.state.meta.errors.length > 0}>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                            type={confirmNewPasswordShow ? 'text' : 'password'}
                            startDecorator={<Password />}
                            endDecorator={
                                <IconButton
                                    variant="plain"
                                    onClick={() =>
                                        setConfirmNewPasswordShow(
                                            (prev) => !prev,
                                        )
                                    }
                                >
                                    {confirmNewPasswordShow ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            }
                            placeholder="Confirm your new Password"
                            value={field.state.value}
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
        </form>
    )
}
