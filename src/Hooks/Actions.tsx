import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useInput, { InputHookReturn } from "../Hooks/use-inpute"
import { useAuth } from '../Context/AuthProvider';
import { LoginErrorType, LoginSuccessType } from '../Helpers/AuthMessages';
import AxiosInstance from '../Helpers/Axios';


export interface UserProfileData {
    auth: {
        email: string;
    };
    lastName: string;
    phone: string;
    pob: string;
    dob: string;
    gender: string;
    role: string;
    firstName: string;
    imageUrl: string;
    file: string;
    _id: number;
}

export const useLogin = () => {
    const { login } = useAuth();
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
 
    const formIsValid = emailInputIsValid && passwordInputIsValid;

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
            const user = res.data.data.user;
            const role = user.role;
            const access_token = res.data.data.access_token;

            setUserRole(role);

            login(access_token, role, user);
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
        error,
        userRole,
    };
};



export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserProfileData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        AxiosInstance.get<UserProfileData[]>('/user')
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


export const useFileUpload = () => {

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userImage, setUserImage] = useState<UserProfileData | null>(null);

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setError('No file selected');
            return;
        }
    
        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
    
        const formData = new FormData();
        formData.append('file', file);
    
        setIsLoading(true);
        try {
            const response = await AxiosInstance.post('/user/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded successfully:', response.data);
            if (response.data.file && userImage) {
                setUserImage({...userImage, file: response.data.file});
            }
            setError(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    return {uploadImage, previewImage, error, isLoading, userImage}
}




