import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useInput, { InputHookReturn } from '../../../Hooks/use-inpute'
import { useAuth } from '../../../Context/AuthProvider'
import { LoginErrorType } from '../../../Helpers/AuthMessages'
import AxiosInstance from '../../../Helpers/Axios'

export const useLogin = () => {
    const { login } = useAuth()
    const [userRole, setUserRole] = useState<string | null>(null)
    const navigate = useNavigate()

    const {
        enteredValue: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        InputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isValid: emailInputIsValid,
    } = useInput((value: string) => value.includes('@')) as InputHookReturn

    const {
        enteredValue: enteredPassword,
        hasError: passwordInputHasError,
        isValid: passwordInputIsValid,
        valueChangeHandler: passwordChangeHandler,
        InputBlurHandler: passwordBlurHandler,
        showPassword,
        reset: resetPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
    } = useInput(
        (value: string) => value.trim().length >= 8 && /[A-Z0-9]/.test(value),
    ) as InputHookReturn

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const formIsValid = emailInputIsValid && passwordInputIsValid

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!formIsValid) {
            setError(LoginErrorType.InvalidCredentials)
            return
        }

        setIsLoading(true)
        setError(null)

        const formData = {
            email: enteredEmail,
            password: enteredPassword,
        }

        try {
            const res = await AxiosInstance.post('/auth/signin', formData)
            const user = res.data.data.user
            const role = user.role
            const access_token = res.data.data.access_token

            setUserRole(role)

            login(access_token, role, user)
            navigate('/dashboard')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                    setError(LoginErrorType.EmailNotFound)
                } else if (error.response.status === 401) {
                    setError(LoginErrorType.IncorrectPassword)
                } else {
                    setError(LoginErrorType.UnexpectedError)
                }
            } else {
                setError(LoginErrorType.UnexpectedError)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        showPassword,
        emailInputHasError,
        enteredEmail,
        emailChangeHandler,
        emailBlurHandler,
        emailInputIsValid,
        passwordInputHasError,
        passwordChangeHandler,
        passwordBlurHandler,
        passwordInputIsValid,
        handleClickShowPassword,
        handleMouseDownPassword,
        enteredPassword,
        resetEmail,
        resetPassword,
        formIsValid,
        handleSubmit,
        error,
        userRole,
    }
}
