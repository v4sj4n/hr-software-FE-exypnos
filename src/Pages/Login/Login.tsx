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
        isForgotPassword,
        confirmPassword,
        confirmPasswordChangeHandler,
        handleForgotPasswordClick,
        passwordsMatch,
        setIsForgotPassword,
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
                    {isForgotPassword ? "Reset Password" : "Login"}
                </div>

                {!isForgotPassword && (
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
                )}

                <Input
                    label={isForgotPassword ? "New Password" : "Password"}
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

                {isForgotPassword && (
                    <Input
                        label="Confirm Password"
                        name="Confirm Password"
                        id="outlined-adornment-confirm-password"
                        variant="filled"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        error={!passwordsMatch}
                        errortext="Passwords do not match."
                        type={showPassword}
                        isPassword
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    />
                )}

                <Button
                    type={isForgotPassword ?
                        (passwordsMatch ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED) :
                        (formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED)}
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
                            isForgotPassword ? "Reset Password" : "Login"
                        )
                    }
                />
                {error && (
                    <div
                        style={{
                            color: "#d32f2f",
                            fontSize: "13px",
                            padding: "0",
                            margin: "0",
                            top: "0"
                        }}
                    >
                        {error}
                    </div>
                )}
                {!isForgotPassword ? (
                    <Link
                        to="/forgot-password"
                        style={{ textAlign: "center", color: "#000000", marginTop: '10px' }}
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot your password?
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        style={{ textAlign: "center", color: "#000000", marginTop: '10px' }}
                        onClick={() => setIsForgotPassword(false)}
                    >
                        Back to Login
                    </Link>
                )}
            </Card>
        </div>
    );
}

export default Login;