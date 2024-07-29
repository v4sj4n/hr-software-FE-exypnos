import { Link } from 'react-router-dom'
import Card from '../../Components/Card/Card'
import Input from '../../Components/Input/Index'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import img from '/Images/HeroImage.png'
import logo from '/Images/image_1-removebg-preview.png'
import { useLogin } from './Hook'
import ClipLoader from 'react-spinners/ClipLoader'
import style from './styles/Login.module.css'

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
    handleSubmit,
    enteredEmail,
    formIsValid,
    error,
  } = useLogin()

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
        <Input
          label="Email"
          name="email"
          value={enteredEmail}
          IsUsername
          width="350px"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
          error={emailInputHasError}
          helperText={emailInputHasError ? "Email must include '@'" : ''}
        />
        <Input
          label={'Password'}
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
        <Button
          type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
          onClick={handleSubmit}
          width="350px"
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
