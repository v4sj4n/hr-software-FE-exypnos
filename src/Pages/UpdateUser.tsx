import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../Components/input';
import Card from '../Ui/Crad/Crard';
import Button from '../Ui/Button/Button';
import { ButtonTypes } from '../Ui/Button/ButtonTypes';
import { Avatar } from "@mui/material";
import AxiosInstance from '../Helpers/Axios';

interface User {
    email: string;
    lastName: string;
    phone: string;
    firstName: string;
    createdAt: Date;
}

const UpdateUser: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get<User>(`/user/${id}`)
            .then(response => {
                setUser(response.data);
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
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser!,
            [name]: value
        }));
    }

    const handleUpdate = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const userToUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
        }
        AxiosInstance.patch(`/user/${id}`, userToUpdate)
            .then(() => {
                console.log('User updated successfully');
                navigate('/home')
            })
            .catch(error => {
                console.error('Error updating user:', error);
                console.log(user)
                setError('Failed to update user');
            });
    };

    return (
        <div style={{display:"flex", justifyContent:'center'}}>
            <Card>
                <Avatar/>
                <Input IsUsername name="firstName" value={user.firstName} onChange={handleChange}/>
                <Input IsUsername name="lastName" value={user.lastName} onChange={handleChange}/>
                <Input IsUsername name="email" value={user.email} onChange={handleChange}/>
                <Input IsUsername name="phone" value={user.phone} onChange={handleChange}/>
                <Button onClick={handleUpdate} type={ButtonTypes.PRIMARY} btnText='Update' />
            </Card>
        </div>
    );
};

export default UpdateUser;