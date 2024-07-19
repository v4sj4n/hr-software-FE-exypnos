import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../Components/Card/Card';
import Input from '../../../Components/Input/input';
import Button from '../../../Components/Button/Button';
import { ButtonTypes } from '../../../Components/Button/ButtonTypes';
import img from '../../../Assets/10-Functions-of-Human-Resource-Management-banner2 1 (1).png'
import logo from "../../../Assets/image_1-removebg-preview.png"
import { useLogin } from '../../../Hooks/Actions';
import ClipLoader from "react-spinners/ClipLoader";
import style from '../Login.module.css'

const ResetPass: React.FC = () => {
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isLoading, error } = useLogin();

    const handleEmailResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('reset');
    };

    const handleResetPassSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Password reset:', newPassword);
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img className={style.img} alt="img" src={img} />
                <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to='/'>System tagline here</Link>
            </div>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'center' }}><img className={style.img2} alt="img" src={logo} /></div>
                <div className={style.title}>
                    {step === 'email' ? 'Forgot Password' : 'Reset Password'}
                </div>

                {step === 'email' ? (
                    <form className={style.form} onSubmit={handleEmailResetSubmit}>
                        <Input
                            label="Email"
                            name='email'
                            IsUsername
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText={
                                isLoading ? (
                                    <ClipLoader
                                        color={"white"}
                                        size={15}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ) : (
                                    "Send"
                                )
                            }
                        />
                    </form>
                ) : (
                    <form className={style.form} onSubmit={handleResetPassSubmit}>
                        <Input
                            label="New Password"
                            name='newPassword'
                            isPassword
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            label="Confirm Password"
                            name='confirmPassword'
                            isPassword
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText={
                                isLoading ? (
                                    <ClipLoader
                                        color={"white"}
                                        size={15}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ) : (
                                    "Reset Password"
                                )
                            }
                        />
                    </form>
                )}

                {error && (<div className={style.error}> {error}</div>)}
                <Link
                    to="/login"
                    style={{ textAlign: "center", color: "#000000", marginTop: '10px' }}
                >
                    Back to Login
                </Link>
            </Card>
        </div>
    );
}

export default ResetPass;