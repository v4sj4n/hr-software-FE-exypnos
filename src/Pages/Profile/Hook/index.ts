import { useEffect, useState } from "react";
import { UserProfileData } from "../../Employees/Hook";
import AxiosInstance from "../../../Helpers/Axios";

export const useFileUpload = () => {

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userImage, setUserImage] = useState<UserProfileData | null>(null);

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setError('No file selected');
            return;
        }
    
        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
    
        const formData = new FormData();
        formData.append('file', file);
    
        setIsLoading(true);
        try {
            const response = await AxiosInstance.post('/user/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded successfully:', response.data);
            if (response.data.file && userImage) {
                setUserImage({...userImage, file: response.data.file});
            }
            setError(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    return {uploadImage, previewImage, error, isLoading, userImage}
}