import { Link, useNavigate } from 'react-router-dom'
import Card from '../../Components/Card/Card'
import Input from '../../Components/Input/Index'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import { useLogin } from './Hook'
import style from './styles/Login.module.css'
import { LoginFormFields, LoginSchema } from '@/Schemas/Login/Login.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/Context/AuthProvider'
import { AxiosError } from 'axios'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { valibotResolver } from '@hookform/resolvers/valibot'

const Login: React.FC = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const { showPassword, handleClickShowPassword } = useLogin()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormFields>({
        resolver: valibotResolver(LoginSchema),
    })

    const onSubmit: SubmitHandler<LoginFormFields> = async (
        data: LoginFormFields,
    ) => {
        try {
            const res = await AxiosInstance.post('/auth/signin', data)
            const user = res.data.data.user
            const role = user.role
            const access_token = res.data.data.access_token
            login(access_token, role, user)
            navigate('/dashboard')
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err?.response?.data?.message) {
                    setError('root', {
                        message: err?.response?.data?.message,
                    })
                    return
                }
                if (err.code === 'ERR_NETWORK') {
                    setError('root', {
                        message:
                            'No internet connection. Please try again later.',
                    })
                    return
                }
                setError('root', {
                    message: 'An error occurred while logging in',
                })
            } else {
                setError('root', {
                    message: 'An error occurred while creating the asset',
                })
            }
        }
    }

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
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <Input
                            label="Email"
                            name="email"
                            register={register('email')}
                            IsUsername
                            width="350px"
                            type="email"
                        />
                        {errors.email && (
                            <ErrorText>{errors.email.message}</ErrorText>
                        )}
                    </div>
                    <div>
                        <Input
                            label={'Password'}
                            register={register('password')}
                            id="outlined-adornment-password"
                            name="password"
                            type={showPassword}
                            onClick={handleClickShowPassword}
                            width="350px"
                            isPassword
                        />
                        {errors.password && (
                            <ErrorText>{errors.password.message}</ErrorText>
                        )}
                    </div>
                    <Button
                        type={
                            !isSubmitting
                                ? ButtonTypes.PRIMARY
                                : ButtonTypes.DISABLED
                        }
                        isSubmit
                        btnText={!isSubmitting ? 'Login' : 'Logging in...'}
                    />
                    {errors.root && (
                        <ErrorText>{errors.root.message}</ErrorText>
                    )}
                </form>

                <Link to="/forgot-password" className={style.forgotPassword}>
                    Forgot your password?
                </Link>
            </Card>
        </div>
    )
}

export default Login
