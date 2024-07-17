import React, { useState } from 'react';
import Input from '../Components/Input/input';
import AxiosInstance from '../Helpers/Axios';

interface User {
    email: string;
    lastName: string;
    phone: string;
    firstName: string;
    [key: string]: string;
}

const Signup: React.FC = () => {

    const [user, setUser] = useState<User>({
        email: '',
        lastName: '',
        phone: '',
        firstName: '',
        role: 'dev'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
event.preventDefault();
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        AxiosInstance.post('/auth/signup', user)
            .then(() => {
                console.log('User created successfully');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div>
            <form style={{maxWidth:"450px"}} onSubmit={handleSignUp}>
                <Input IsUsername label='First Name' name='firstName' onChange={handleChange} value={user.firstName} />
                <Input IsUsername label='Last Name' name='lastName' onChange={handleChange} value={user.lastName} />
                <Input IsUsername label='Email' name='email' onChange={handleChange} value={user.email} />
                <Input IsUsername label='Phone' name='phone' onChange={handleChange} value={user.phone} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
