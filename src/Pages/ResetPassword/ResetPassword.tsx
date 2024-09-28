import logo from '/Images/image_1-removebg-preview.png'
import style from './Styles/ResetPassword.module.css'

import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import img from '/Images/HeroImage.png'
import Card from '@/Components/Card/Card'
import { ResetPasswordProvider } from './ResetPasswordContext'
import { ResetPasswordForm } from './Components/ResetPasswordForm'
import { ForgetPasswordForm } from './Components/ForgetPasswordForm'
import { Link, Typography } from '@mui/joy'

const ResetPasswordComponent = () => {
    const sP = useSearchParams()

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
                <Typography level="title-lg">Forgot Password</Typography>

                {sP[0].get('token') ? (
                    <ResetPasswordForm />
                ) : (
                    <ForgetPasswordForm />
                )}
                <Link
                    component={RouterLink}
                    to="/"
                    color="neutral"
                    style={{ alignSelf: 'center' }}
                >
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
