import { Link, useNavigate } from 'react-router-dom'
import Card from '@/Components/Card/Card'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import { useLogin } from './Hook'
import ClipLoader from 'react-spinners/ClipLoader'
import style from './Login.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormFields, loginSchema } from '@/Schemas/Login/Login.schema'
import AxiosInstance from '@/Helpers/Axios'
import { AxiosError } from 'axios'
import { useAuth } from '@/Context/AuthProvider'
import { ErrorText } from '@/Components/Error/ErrorTextForm'

const Login: React.FC = () => {
  const {
    isLoading,
    showPassword,
    emailInputHasError,
    emailChangeHandler,
    emailBlurHandler,
    passwordInputHasError,
    passwordChangeHandler,
    passwordBlurHandler,
    enteredPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    // handleSubmit,
    enteredEmail,
    formIsValid,
    error,
  } = useLogin()
  const { login } = useAuth();
  const navigate = useNavigate();



  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
        const res = await AxiosInstance.post('/auth/signin', data);
        const user = res.data.data.user;
        const role = user.role;
        const access_token = res.data.data.access_token;
        login(access_token, role, user);
        navigate("/dashboard")
      
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError('root', {
          message: err?.response?.data?.message,
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
        <Link
          style={{ textDecoration: 'none', color: '#FFFFFF', fontSize: '18px' }}
          to="/"
        >
          Code With Love
        </Link>
      </div>
      <Card padding="30px" gap="20px">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className={style.img2} alt="img" src={logo} />
        </div>
        <div className={style.title}>Login</div>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }} 
        onSubmit={handleSubmit(onSubmit)}
        >

       <div>
       <Input
          label="Email"
          name="email"
          value={enteredEmail}
          register={register("email")}
          IsUsername
          width="350px"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
          error={emailInputHasError}
          helperText={emailInputHasError ? "Email must include '@'" : ''}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
       </div>
        <Input
          label={'Password'}
          register={register("password")}
          id="outlined-adornment-password"
          name="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          error={passwordInputHasError}
          onBlur={passwordBlurHandler}
          errortext="Password must be 8  and contain at least one number or one uppercase letter."
          type={showPassword}
          width="350px"
          isPassword
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Button
          type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
          // onClick={handleSubmit}
          
          disabled={isSubmitting}
          btnText={
            isLoading ? (
              <ClipLoader
                color={'white'}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Login'
            )
          }
        />
        {error && <div className={style.error}> {error} </div>}
        </form>

        <Link
          to="/forgot-password"
          style={{
            textAlign: 'center',
            color: '#000000',
            marginTop: '10px',
            fontFamily: '"Outfit", sans-serif',
          }}
        >
          Forgot your password?
        </Link>
      </Card>
    </div>
  )
}

export default Login
