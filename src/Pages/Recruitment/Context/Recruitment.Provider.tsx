import { useState } from "react"
import AxiosInstance from "../../../Helpers/Axios";

export const useCreateAplicant = () => {
    const [aplicantFormData, setAplicatFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "",
        applicationMethod: "",
        age: '',
        positionApplied: '',
        technologiesUsed: [] as string[],
        individualProjects: '',
        salaryExpectations: '',
        cv: null as File | null, // Add this line for CV file
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAplicatFormData({...aplicantFormData, [event.target.name]: event.target.value });
        console.log(aplicantFormData);
    };

    const handleTechnologiesChange = (newTechnologies: string[]) => {
        setAplicatFormData({...aplicantFormData, technologiesUsed: newTechnologies });
        console.log(aplicantFormData);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAplicatFormData({...aplicantFormData, cv: event.target.files[0]});
        }
    };

    const handleCreateAplicant = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const formData = new FormData();
        Object.keys(aplicantFormData).forEach(key => {
            if (key === 'cv' && aplicantFormData.cv) {
                formData.append('cv', aplicantFormData.cv);
            } else if (key === 'technologiesUsed') {
                formData.append('technologiesUsed', JSON.stringify(aplicantFormData.technologiesUsed));
            } else {
                formData.append(key, aplicantFormData[key as keyof typeof aplicantFormData] as string);
            }
        });

        try {
            await AxiosInstance.post("/applicants", formData);
            console.log("Applicant created successfully!");

            setAplicatFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                experience: "",
                applicationMethod: "",
                age: '',
                positionApplied: '',
                technologiesUsed: [],
                individualProjects: '',
                salaryExpectations: '',
                cv: null,
            });
        } catch (error) {
            console.error("Error creating applicant:", error);
        }
    }

    return {
        handleChange, 
        handleTechnologiesChange, 
        handleFileChange, 
        aplicantFormData, 
        handleCreateAplicant
    }
}