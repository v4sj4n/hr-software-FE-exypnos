import { useRef, useState } from "react";
import AxiosInstance from "../../../Helpers/Axios";

export const useCreateAplicant = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileIconClick = () => {
        fileInputRef.current?.click();
    };
    const [aplicantFormData, setAplicantFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        experience: "",
        applicationMethod: "",
        age: '',
        positionApplied: '',
        technologiesUsed: [] as string[],
        salaryExpectations: '',
        file: null as File | null, 
        status: 'pending',
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationToken, setConfirmationToken] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAplicantFormData({...aplicantFormData, [event.target.name]: event.target.value });
    };

    const handleTechnologiesChange = (newTechnologies: string[]) => {
        setAplicantFormData({...aplicantFormData, technologiesUsed: newTechnologies });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAplicantFormData({...aplicantFormData, file: event.target.files[0]});
        }
    };

    const handleCreateAplicant = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formData = new FormData();
        Object.keys(aplicantFormData).forEach(key => {
            if (key === 'file' && aplicantFormData.file) {
                formData.append('file', aplicantFormData.file);
            } else if (key === 'technologiesUsed') {
                formData.append('technologiesUsed', JSON.stringify(aplicantFormData.technologiesUsed));
            } else {
                formData.append(key, aplicantFormData[key as keyof typeof aplicantFormData] as string);
            }
        });

        setIsLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.post("/applicants", formData);
            console.log("Applicant created successfully!", response.data);

            if (response.data.confirmationToken) {
                setConfirmationToken(response.data.confirmationToken);
                setShowConfirmationModal(true);
            }

            setAplicantFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                experience: "",
                applicationMethod: "",
                age: '',
                positionApplied: '',
                technologiesUsed: [],
                salaryExpectations: '',
                file: null,
                status: 'pending',
            });
        } catch (error) {
            console.error("Error creating applicant:", error);
            setError('Failed to create applicant');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleChange, 
        handleTechnologiesChange, 
        handleFileChange, 
        aplicantFormData, 
        handleCreateAplicant,
        error,
        isLoading,
        fileInputRef,
        handleFileIconClick,
        showConfirmationModal,
        setShowConfirmationModal,
        confirmationToken
    };
};