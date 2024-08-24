import { useRef, useState } from 'react'
import AxiosInstance from '../../../Helpers/Axios'

export const useCreateAplicant = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleFileIconClick = () => {
        fileInputRef.current?.click()
    }
    const [showModal, setShowModal] = useState<boolean>(false)
    const [aplicantFormData, setAplicantFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        experience: '',
        applicationMethod: '',
        dob: new Date().toISOString().split('T')[0],
        positionApplied: '',
        technologiesUsed: [] as string[],
        salaryExpectations: '',
        file: null as File | null,
    })

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAplicantFormData({
            ...aplicantFormData,
            [event.target.name]: event.target.value,
        })
    }

    const handleTechnologiesChange = (newTechnologies: string[]) => {
        setAplicantFormData({
            ...aplicantFormData,
            technologiesUsed: newTechnologies,
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("File uploaded:", event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            setAplicantFormData({
                ...aplicantFormData,
                file: event.target.files[0],
            })
        }
    }

    const resetForm = () => {
        setAplicantFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            experience: '',
            applicationMethod: '',
            dob: new Date().toISOString().split('T')[0],
            positionApplied: '',
            technologiesUsed: [],
            salaryExpectations: '',
            file: null,
        })
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleCreateAplicant = async (
        event: React.FormEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
        console.log('Creating new applicant with data:', aplicantFormData)
        const formData = new FormData()
        Object.keys(aplicantFormData).forEach((key) => {
            if (key === 'file' && aplicantFormData.file) {
                formData.append('file', aplicantFormData.file)
                console.log('Appending file:', aplicantFormData.file)
            } else if (key === 'technologiesUsed') {
                formData.append(
                    'technologiesUsed',
                    JSON.stringify(aplicantFormData.technologiesUsed),
                )
            } else {
                formData.append(
                    key,
                    aplicantFormData[
                        key as keyof typeof aplicantFormData
                    ] as string,
                )
            }
        })
        console.log(aplicantFormData)
        setIsLoading(true)
        setError(null)
        try {
            const response = await AxiosInstance.post('/applicant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Applicant created successfully!', response.data)
            resetForm()
            setShowModal(true)
        } catch (error) {
            console.error('Error creating applicant:', error)
            setError('Failed to create applicant')
        } finally {
            setIsLoading(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

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
        showModal,
        closeModal,
        resetForm,
    }
}
