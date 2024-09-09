import { Link, useNavigate } from 'react-router-dom'
import Card from '../../Components/Card/Card'
import Input from '../../Components/Input/Index'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import { useLogin } from './Hook'
import style from './styles/Login.module.css'
import { LoginSchema } from '@/Schemas/Login/Login.schema'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/Context/AuthProvider'
import { AxiosError } from 'axios'
import { ErrorText } from '@/Components/Error/ErrorTextForm'

import { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'

const Login: React.FC = () => {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const { showPassword, handleClickShowPassword } = useLogin()
    const [error, setError] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validatorAdapter: valibotValidator(),
        onSubmit: async ({ value }) => {
            try {
                const res = await AxiosInstance.post('/auth/signin', value)
                const user = res.data.data.user
                const role = user.role
                const access_token = res.data.data.access_token
                login(access_token, role, user)
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    if (err?.response?.data?.message) {
                        setError(err?.response?.data?.message)
                        return
                    }
                    if (err.code === 'ERR_NETWORK') {
                        setError(
                            'No internet connection. Please try again later.',
                        )
                        return
                    }
                }
                setError('An error occurred. Please try again later.')
            }
        },
    })

    const [checkingIsAuthenticated, setCheckingIsAuthenticated] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setCheckingIsAuthenticated(false)
            navigate('/dashboard')
        } else {
            setCheckingIsAuthenticated(false)
        }
    }, [isAuthenticated, navigate])

    if (checkingIsAuthenticated)
        return (
            <div
                style={{
                    height: '50vw',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <RingLoader />
            </div>
        )

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img className={style.img} alt="img" src={img} />
                <Link className={style.slogan} to="/">
                    Code With Love
                </Link>
            </div>
            <Card padding="30px" gap="20px">
                <div className={style.cardLogoStyle}>
                    <img className={style.img2} alt="img" src={logo} />
                </div>
                <div className={style.title}>Login</div>
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
                            onChange: LoginSchema.entries.email,
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
                                    name="email"
                                    IsUsername
                                    width="350px"
                                    type="email"
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />

                                {errors && (
                                    <ErrorText>{errors.join(', ')}</ErrorText>
                                )}
                            </div>
                        )}
                    />

                    <form.Field
                        name="password"
                        validators={{
                            onChange: LoginSchema.entries.password,
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
                                    label={'Password'}
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={showPassword}
                                    onClick={handleClickShowPassword}
                                    width="350px"
                                    isPassword
                                    value={value}
                                    onChange={(e) =>
                                        handleChange(e.target.value)
                                    }
                                />
                                {errors && <ErrorText>{errors}</ErrorText>}
                            </div>
                        )}
                    />
                    <Button
                        type={
                            !form.state.isSubmitting
                                ? ButtonTypes.PRIMARY
                                : ButtonTypes.DISABLED
                        }
                        isSubmit
                        btnText={
                            !form.state.isSubmitting ? 'Login' : 'Logging in...'
                        }
                    />
                    {error && <ErrorText>{error}</ErrorText>}
                </form>

                <Link to="/forgot-password" className={style.forgotPassword}>
                    Forgot your password?
                </Link>
            </Card>
        </div>
    )
}

export default Login
