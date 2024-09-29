import { useContext, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { LoginContext, LoginProvider } from './LoginContext'
import { useFormLogin } from './Hook'
import { LoginSchema } from '@/Schemas/Login/Login.schema'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import Card from '@/Components/Card/Card'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import style from './styles/Login.module.css'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { Loader } from '@/Components/Loader/Loader'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Link,
} from '@mui/joy'
import { Email, Password, Visibility, VisibilityOff } from '@mui/icons-material'
import {Toast} from '@/NewComponents/Toast'

const LoginComponent = () => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const {
        checkingIsAuthenticated,
        setCheckingIsAuthenticated,
        error,
        setShowPassword,
        showPassword,
        setError,
        searchParams,
        comeFromPasswordReset,
        setComeFromPasswordReset,
        setSearchParams,
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

    useEffect(() => {
        if (searchParams.get('reset') === 'success') {
            setComeFromPasswordReset(true)
        }
    })

    if (checkingIsAuthenticated) return <Loader />

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img className={style.img} alt="img" src={img} />
                <Link component={RouterLink} className={style.slogan} to="/">
                    Code With Love
                </Link>
            </div>
            <Card padding="30px" gap="20px">
                <div className={style.cardLogoStyle}>
                    <img className={style.img2} alt="img" src={logo} />
                </div>
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
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Email</FormLabel>
                                <Input
                                    startDecorator={<Email />}
                                    placeholder="Enter your email"
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
                        name="password"
                        validators={{
                            onChange: LoginSchema.entries.password,
                        }}
                        children={(field) => (
                            <FormControl
                                error={field.state.meta.errors.length > 0}
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    startDecorator={<Password />}
                                    endDecorator={
                                        <IconButton
                                            variant="plain"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    }
                                    placeholder="Enter your Password"
                                    value={field.state.value}
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
                    <Button type="submit" loading={form.state.isSubmitting}>
                        Login
                    </Button>
                    {error && <ErrorText>{error}</ErrorText>}
                </form>

                <Link
                    component={RouterLink}
                    to="/reset-password"
                    color="neutral"
                    alignSelf={'center'}
                >
                    Forgot your password?
                </Link>

                <Toast
                    open={comeFromPasswordReset}
                    severity="success"
                    message="Your password was updated successfully please login to
                    access your account"
                    onClose={() => {
                        setComeFromPasswordReset(false)
                        setSearchParams((prev) => {
                            const newParams = new URLSearchParams(prev)
                            newParams.delete('reset')
                            return newParams
                        })
                    }}
                />
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
