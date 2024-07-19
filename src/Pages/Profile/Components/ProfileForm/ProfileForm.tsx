import { Avatar, FormControlLabel, Checkbox } from "@mui/material";
import Input from "../../../../Components/Input/input";
import { ButtonTypes } from "../../../../Components/Button/ButtonTypes";
import Button from "../../../../Components/Button/Button";
import style from "./ProfileForm.module.css"
import { chekboxStyles } from '../../../../Components/Input/Styles'
import img from "../../../../Assets/gerti.jpg"
import AxiosInstance from "../../../../Helpers/Axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

interface User {
    userId: {
        email: string;
    };
    lastName: string;
    phone: string;
    pob: string;
    dob: string;
    gender: string;
    role: string;
    firstName: string;
}

const ProfileForm = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { userRole } = useAuth();

    const isAdmin = userRole === 'admin';

    useEffect(() => {
        AxiosInstance.get<User>(`/user/${id}`)
            .then(response => {
                setUser(response.data);
                console.log('User fetched:', response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch user data');
                setUser(null);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAdmin) return;
        const { name, value } = event.target;
        setUser(prevUser => {
            if (!prevUser) return null;
            if (name === 'email') {
                return {
                    ...prevUser,
                    userId: {
                        ...prevUser.userId,
                        email: value
                    }
                };
            } else {
                return {
                    ...prevUser,
                    [name]: value
                };
            }
        });
    };

    const handleUpdate = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isAdmin) {
            setError('Only admins can update user information');
            return;
        }
        const userToUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.userId.email,
            pob: user.pob,
            dob: user.dob,
            gender: user.gender,
        };
        AxiosInstance.patch(`/user/${id}`, userToUpdate)
            .then(() => {
                console.log('User updated successfully');
                navigate('/home');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setError('Failed to update user');
            });
    };

    return (
        <div className={style.container}>
            <div className={style.title}>Personal Information</div>

            <div className={style.forms}>
            <div className={style.profile}>
            <Avatar src={img} style={{ width: "50px", height: "50px" }} />
            <div>Upload picture</div>
            </div>
                <div className={style.inputWidth}>
                    <Input IsUsername label="firstName" name="firstName" onChange={handleChange} value={user.firstName} />
                </div>
           
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername type="email" label="Email" name="email" onChange={handleChange} value={user.userId.email} />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername name="phone" label="PhoneNumber" onChange={handleChange} value={user.phone} />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="BirthDate" name="dob" onChange={handleChange} value={user.dob} />
                </div>
                <div className={style.inputWidth}>
                    <Input IsUsername label="CountryOfBirth" name="pob" onChange={handleChange} value={user.pob} />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input IsUsername label="Gender" name="gender" onChange={handleChange} value={user.gender} />
                </div>
            </div>

            <div className={style.checkboxDiv}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Public Holidays" sx={{ ...chekboxStyles }}
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
                <Button onClick={handleUpdate} type={ButtonTypes.PRIMARY} btnText='Save Changes' />
            </div>
        </div>
    )
}

export default ProfileForm;