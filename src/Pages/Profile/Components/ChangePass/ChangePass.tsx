import Input from '../../../../Components/Input/Index'
import Button from '../../../../Components/Button/Button'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import { usePassword } from './Context/Hook'

export default function ChangePass() {
    const {
        currentPassword,
        newPassword,
        confirmPassword,
        error,
        success,
        handleChange,
        handleUpdatePassword,
    } = usePassword()

    return (
        <>
            <div style={{margin:'20px 0'}}>
                To change your password add your current password then your new
                password.
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
    
                }}
            >
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div style={{display:"flex", gap:"16px" }}>
                <Input
                    label="Current Password"
                    name="currentPassword"
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={currentPassword}
                />
                <Input
                    label="New Password"
                    name="newPassword"
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={newPassword}
                />
                </div>
                
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={confirmPassword}
                    width='260px'
                />
                {error && <div style={{ color: '#d32f2f' }}>{error}</div>}
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Update Pass"
                    onClick={handleUpdatePassword}
                    width='260px'
                />
            </div>
        </>
    )
}
