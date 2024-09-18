import Input from '../../../../Components/Input/Index'
import Button from '../../../../Components/Button/Button'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import { usePassword } from './Context/PasswordContext'
import { PasswordProvider } from './Context/PasswordProvider'
import Toast from '@/Components/Toast/Toast'
import style from "./style/ChangePass.module.css"

function ChangePassContent() {
    const {
        currentPassword,
        newPassword,
        confirmPassword,
        error,
        handleChange,
        handleUpdatePassword,
        toastMessage,
        toastOpen,
        toastSeverity,
        handleToastClose,
        handleShowEye,
        showPassword
    } = usePassword()

    return (
        <>
            <div className={style.container}>
                <h1>Change Password </h1>
                <Toast
                    severity={toastSeverity}
                    open={toastOpen}
                    message={toastMessage}
                    onClose={handleToastClose}
                />
                <div style={{display:'flex',alignItems:'center',padding:'20px'}}>
                    To change your password add your current password then your
                    new password.
                </div>
                <Input
                    label="Current Password"
                    name="currentPassword"
                    isPassword
                    type={showPassword}
                    onClick={handleShowEye}
                    onChange={handleChange}
                    value={currentPassword}
                    width="350px"
                />
                <Input
                    label="New Password"
                    name="newPassword"
                    isPassword
                    type={showPassword}
                    onClick={handleShowEye}
                    onChange={handleChange}
                    value={newPassword}
                    width="350px"
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    isPassword
                    type={showPassword}
                    onClick={handleShowEye}
                    onChange={handleChange}
                    value={confirmPassword}
                    width="350px"
                />
                {error && <div style={{ color: '#d32f2f' }}>{error}</div>}
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Update Pass"
                    onClick={handleUpdatePassword}
                    width="350px"
                    marginTop="9px"
                />
            </div>
        </>
    )
}

const ChangePass: React.FC = () => {
    return (
        <PasswordProvider>
            <ChangePassContent />
        </PasswordProvider>
    )
}

export default ChangePass
