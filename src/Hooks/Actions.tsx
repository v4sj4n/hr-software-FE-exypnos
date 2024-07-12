import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput, { InputHookReturn } from "../Hooks/use-inpute"
import { useAuth } from '../Context/AuthContext';
import { LoginErrorType, LoginSuccessType } from '../Helpers/AuthMessages';
import AxiosInstance from '../Helpers/Axios';

interface User {
    email: string;
    _id: number;
    name: string;
}

export const useLogin = () => {
    const { login } = useAuth()
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();
    const {
        enteredValue: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        InputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isValid: emailInputIsValid,
    } = useInput((value: string) => value.includes("@")) as InputHookReturn;

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
    } = useInput((value: string) => value.trim().length >= 8 && /[A-Z0-9]/.test(value)) as InputHookReturn;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const confirmPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleForgotPasswordClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsForgotPassword(true);
    };

    const passwordsMatch = enteredPassword === confirmPassword;
    const formIsValid = emailInputIsValid && passwordInputIsValid && (!isForgotPassword || passwordsMatch);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            setError(LoginErrorType.InvalidCredentials);
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = {
            email: enteredEmail,
            password: enteredPassword
        };

        try {
            const res = await AxiosInstance.post('/auth/signin', formData);
            const role = res.data.data.user.role;
            setUserRole(role);

            login(res.data.data.access_token, role);
            alert(LoginSuccessType.Success);
            navigate("/home");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                    setError(LoginErrorType.EmailNotFound);
                } else if (error.response.status === 401) {
                    setError(LoginErrorType.IncorrectPassword);
                } else {
                    setError(LoginErrorType.UnexpectedError);
                }
            } else {
                setError(LoginErrorType.UnexpectedError);
            }
        } finally {
            setIsLoading(false);
        }
    };

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
        isForgotPassword,
        confirmPassword,
        confirmPasswordChangeHandler,
        handleForgotPasswordClick,
        passwordsMatch,
        setIsForgotPassword,
        error,
        userRole,
    };
};

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        AxiosInstance.get<User[]>('/user')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Failed to fetch users. Please try again later.");
            });
    }, [API_URL]);

    return { users, error };
}
