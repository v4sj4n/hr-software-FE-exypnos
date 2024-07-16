import { Link } from 'react-router-dom';
import Card from '../../Ui/Crad/Crard';
import Input from '../../Components/input';
import Button from '../../Ui/Button/Button';
import { ButtonTypes } from '../../Ui/Button/ButtonTypes';
import img from '../../Assets/10-Functions-of-Human-Resource-Management-banner2 1 (1).png'
import logo from "../../Assets/image_1-removebg-preview.png"
import { useLogin } from '../../Hooks/Actions';
import ClipLoader from "react-spinners/ClipLoader";
import style from './Login.module.css'

const Login: React.FC = () => {

    const { isLoading,
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
        error
    } = useLogin();

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img className={style.img} alt="img" src={img} />
                <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to='/'>System tagline here</Link>
            </div>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'center' }}><img className={style.img2} alt="img" src={logo} /></div>
                <div className={style.title}>
                    Login
                </div>
                <Input
                    label="Email"
                    name='email'
                    value={enteredEmail}
                    IsUsername
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    variant="filled"
                    type="email"
                    error={emailInputHasError}
                    helperText={emailInputHasError ? "Email must include '@'" : ""}
                />
                <Input
                    label={"Password"}
                    id="outlined-adornment-password"
                    variant="filled"
                    name='password'
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    error={passwordInputHasError}
                    onBlur={passwordBlurHandler}
                    errortext="Password must be 8  and contain at least one number or one uppercase letter."
                    type={showPassword}
                    isPassword
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                />
                <Button
                    type={
                        formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
                    onClick={handleSubmit}
                    btnText={
                        isLoading ? (
                            <ClipLoader
                                color={"white"}
                                size={15}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        ) : (
                            "Login"
                        )
                    }
                />
                {error && ( <div className={style.error}> {error} </div> ) }
                <Link
                    to="/forgot-password"
                    style={{ textAlign: "center", color: "#000000", marginTop: '10px' }}
                >
                    Forgot your password?
                </Link>

            </Card>
        </div>
    );
}

export default Login;