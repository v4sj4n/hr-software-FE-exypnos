import logo from '/Images/image_1-removebg-preview.png'
import style from './Styles/ResetPassword.module.css'

import { Link, useSearchParams } from 'react-router-dom'
import img from '/Images/HeroImage.png'
import Card from '@/Components/Card/Card'
import { ResetPasswordProvider } from './ResetPasswordContext'
import { ResetPasswordForm } from './Components/ResetPasswordForm'
import { ForgetPasswordForm } from './Components/ForgetPasswordForm'

const ResetPasswordComponent = () => {
    // SearchParams undestructured to not get ts errors :)
    const sP = useSearchParams()

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
                <div className={style.title}>Forgot Password</div>

                {sP[0].get('token') ? (
                    <ResetPasswordForm />
                ) : (
                    <ForgetPasswordForm />
                )}
                <Link to="/" style={{ textAlign: 'center', color: 'black' }}>
                    Back to Login
                </Link>
            </Card>
        </div>
    )
}

export default function ResetPassword() {
    return (
        <ResetPasswordProvider>
            <ResetPasswordComponent />
        </ResetPasswordProvider>
    )
}
