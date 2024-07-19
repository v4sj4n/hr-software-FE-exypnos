import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Input from '../Components/Input/input';
import Card from '../Components/Card/Card';
import Button from '../Components/Button/Button';
import { ButtonTypes } from '../Components/Button/ButtonTypes';
import { Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AxiosInstance from '../Helpers/Axios';
import { useAuth } from '../Context/AuthProvider';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase/firebase';
import UploadStatus from '../Components/uploads/uploadStatus';

interface User {
    email: string;
    lastName: string;
    phone: string;
    firstName: string;
    image?: string; 
}

const UpdateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const navigate = useNavigate();
    const { userRole } = useAuth();

    const isAdmin = userRole === 'admin';

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file: File) => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                console.error("Error uploading image:", error);
                setFileUploadError(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                    setUser((prevUser) => prevUser ? { ...prevUser, image: downloadURL } : null);
                });
            }
        );
    };

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
        if (!isAdmin) return;
        const { name, value } = event.target;
        setUser(prevUser => prevUser ? ({ ...prevUser, [name]: value }) : null);
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
            email: user.email,
            image: user.image,
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: 'center' }}>
            <Card>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar src={user.image || image} sx={{ width: 100, height: 100 }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <Input IsUsername name="firstName" value={user.firstName} onChange={handleChange} />
                <Input IsUsername name="lastName" value={user.lastName} onChange={handleChange} />
                <Input IsUsername name="email" value={user.email} onChange={handleChange} />
                <Input IsUsername name="phone" value={user.phone} onChange={handleChange} />
               
                <UploadStatus fileUploadError={fileUploadError} filePerc={filePerc} />
                {isAdmin ? (
                    <Button onClick={handleUpdate} type={ButtonTypes.PRIMARY} btnText='Update' />
                ) : (
                    <Link to='/home'>Back to homepage</Link>
                )}
            </Card>
        </div>
    );
};

export default UpdateUser;
