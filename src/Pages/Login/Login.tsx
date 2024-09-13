import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/Context/AuthProvider'
import { LoginContext, LoginProvider } from './LoginContext'
import { useFormLogin } from './Hook'
import { LoginSchema } from '@/Schemas/Login/Login.schema'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import Card from '@/Components/Card/Card'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { RingLoader } from 'react-spinners'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import style from './styles/Login.module.css'

const LoginComponent = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const {
        checkingIsAuthenticated,
        setCheckingIsAuthenticated,
        error,
        setError,
        setShowPassword,
        showPassword,
    } = useContext(LoginContext)

    const { form } = useFormLogin(setError)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setCheckingIsAuthenticated(false)
            navigate('/dashboard')
        } else {
            setCheckingIsAuthenticated(false)
        }
    }, [isAuthenticated, navigate, setCheckingIsAuthenticated])

    if (checkingIsAuthenticated)
        return (
            <div className={style.checkIsAuthenticated}>
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
                        children={(field) => (
                            <div>
                                <Input
                                    label="Email"
                                    name="email"
                                    IsUsername
                                    width="350px"
                                    type="email"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />

                                {field.state.meta.errors && (
                                    <ErrorText>
                                        {field.state.meta.errors.join(', ')}
                                    </ErrorText>
                                )}
                            </div>
                        )}
                    />

                    <form.Field
                        name="password"
                        validators={{
                            onChange: LoginSchema.entries.password,
                        }}
                        children={(field) => (
                            <div>
                                <Input
                                    label={'Password'}
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={showPassword}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    width="350px"
                                    isPassword
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                {field.state.meta.errors && (
                                    <ErrorText>
                                        {field.state.meta.errors}
                                    </ErrorText>
                                )}
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

export default function Login() {
    return (
        <LoginProvider>
            <LoginComponent />
        </LoginProvider>
    )
}