import { useState } from "react"
import Input from "../../../../Components/Input/input"
import Button from "../../../../Components/Button/Button"
import { ButtonTypes } from "../../../../Components/Button/ButtonTypes"
import AxiosInstance from "../../../../Helpers/Axios"
import { AxiosError } from 'axios'

export default function ChangePass() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target;
        switch (name) {
            case "currentPassword":
                setCurrentPassword(value)
                break
            case "newPassword":
                setNewPassword(value)
                break
            case "confirmPassword":
                setConfirmPassword(value)
                break
            default:
                break
        }
    }

    const validatePasswords = () => {
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match")
            return false
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long")
            return false
        }
        setError("")
        return true
    }

    const handleUpdatePassword = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (!validatePasswords()) {
            return
        }

        try {
            const response = await AxiosInstance.post("/auth/updatepassword", {
                currentPassword,
                newPassword
            })

            if (response.status === 200) {
                setSuccess("Password updated successfully")
                console.log("Success message set:", "Password updated successfully");
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.data) {
                const errorData = error.response.data
                setError(errorData.message || "An error occurred while updating the password")
            } else {
                setError("An error occurred while updating the password")
            }
        }
    }

    return (
        <>
            <div>To change your password add your current password then your new password.</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "350px" }}>
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <Input
                    label="Current Password"
                    name='currentPassword'
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={currentPassword}
                />
                <Input
                    label="New Password"
                    name='newPassword'
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={newPassword}
                />
                <Input
                    label="Confirm Password"
                    name='confirmPassword'
                    isPassword
                    type="password"
                    onChange={handleChange}
                    value={confirmPassword}
                />
                {error && <div style={{ color: '#d32f2f' }}>{error}</div>}
                <Button type={ButtonTypes.PRIMARY} btnText='Update Pass' onClick={handleUpdatePassword} />
            </div>   </>
    )
}