import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Ui/Crad/Crard';
import Input from '../Components/input';
import Button from '../Ui/Button/Button';
import { ButtonTypes } from '../Ui/Button/ButtonTypes';
import img from '../Assets/10-Functions-of-Human-Resource-Management-banner2 1 (1).png'
import logo from "../Assets/image_1-removebg-preview.png"
import useInput, { InputHookReturn } from '../Hooks/use-inpute'
import ClipLoader from "react-spinners/ClipLoader";

import style from './Login.module.css';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const navigate = useNavigate();
    const {
        enteredValue: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        InputBlurHandler: emailBlurHandler,
        isValid: emailInputIsValid,
    } = useInput((value: string) => value.includes("@")) as InputHookReturn;

    const {
        enteredValue: enteredPassword,
        hasError: passwordInputHasError,
        isValid: passwordInputIsValid,
        valueChangeHandler: passwordChangeHandler,
        InputBlurHandler: passwordBlurHandler,
    } = useInput((value: string) => value.trim().length >= 8) as InputHookReturn;

    const [isLoading, setIsLoading] = useState(false);

    const formIsValid = emailInputIsValid && passwordInputIsValid;

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            navigate('/')
            setIsLoading(false);
            console.log("Form submitted!");
        }, 2000);
    };

    return (
        <div className={style.container}>
            <div className={style.left}>
                <img style={{ height: 'auto', width: '510px' }} alt="img" src={img} />
                <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to='/'>System tagline here</Link>
            </div>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'center' }}><img style={{ height: "auto", width: "150px" }} alt="img" src={logo} /></div>

                <div style={{ color: "#000000",fontWeight:"bolder", fontSize:"20px"  }}>Login</div>
                <Input
                    label="Email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    error={emailInputHasError}
                    onBlur={emailBlurHandler}
                    variant="filled"
                    type="email"
                    errortext="Email includes '@!"
                />

                <Input
                    label="Password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    error={passwordInputHasError}
                    onBlur={passwordBlurHandler}
                    variant="filled"
                    type="password"
                    errortext="Password must be 8 characters long."
                />
                <Button
                    type={formIsValid ? ButtonTypes.PRIMARY : ButtonTypes.DISABLED}
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
                <Link to="/forgot-password" style={{ textAlign: "center", color: "#000000", marginTop: '10px' }}>Forgot your password?</Link>
            </Card>
        </div>
    );
};

export default Login;