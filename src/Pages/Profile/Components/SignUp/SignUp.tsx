import { Avatar, FormControlLabel, Checkbox } from '@mui/material'
import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/ProfileForm.module.css'
import { chekboxStyles } from '../../../../Components/Input/Styles'
import img from '../../../../Assets/gerti.jpg'
import AxiosInstance from '../../../../Helpers/Axios'
import { useState } from 'react'

interface User {
    email: string
    lastName: string
    phone: string
    pob: string
    dob: string
    gender: string
    role: string
    firstName: string
    [key: string]: string
}

const SignUp = () => {
    const [user, setUser] = useState<User>({
        email: '',
        lastName: '',
        phone: '',
        firstName: '',
        gender: '',
        pob: '',
        dob: '',
        role: 'dev',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handleSignUp = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()

        AxiosInstance.post('/auth/signup', user)
            .then(() => {
                console.log('User created successfully')
            })
            .catch((error) => {
                console.error('Error updating user:', error)
            })
    }

    return (
        <div className={style.container}>
            <div className={style.profile}>
                <Avatar src={img} style={{ width: '94px', height: '94px' }} />
                <div>
                    <div className={style.name}>Elisabeta Guri</div>
                    <div className={style.position}>
                        Head of Human Resources
                    </div>
                    <div className={style.hr}>HR Department</div>
                </div>
            </div>
            <div className={style.border}></div>
            <div className={style.title}>Personal Information</div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={user.lastName}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        name="phone"
                        label="PhoneNumber"
                        onChange={handleChange}
                        value={user.phone}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="BirthDate"
                        name="dob"
                        onChange={handleChange}
                        value={user.dob}
                    />
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="CountryOfBirth"
                        name="pob"
                        onChange={handleChange}
                        value={user.pob}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        value={user.gender}
                    />
                </div>
            </div>

            <div className={style.checkboxDiv}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Public Holidays"
                    sx={{ ...chekboxStyles }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Remote"
                    sx={{ ...chekboxStyles }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="External"
                    sx={{ ...chekboxStyles }}
                />
            </div>
            <div className={style.border}></div>
            <div className={style.inputWidth}>
                <Button
                    onClick={handleSignUp}
                    type={ButtonTypes.PRIMARY}
                    btnText="Save Changes"
                />
            </div>
        </div>
    )
}

export default SignUp
