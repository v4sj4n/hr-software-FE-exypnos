import AxiosInstance from '@/Helpers/Axios'
import { useEffect, useState } from 'react'
import { ProjectData } from '../Interface/Index'
import { AxiosError } from 'axios'

export const useGetProject = () => {
    const [projects, setProjects] = useState<ProjectData[]>([])

    const fetchProjects = () => {
        AxiosInstance.get<ProjectData[]>('/project/structure')
            .then((response) => {
                setProjects(response.data)
            })
            .catch((error: unknown) => {
                if (error instanceof AxiosError) {
                    console.error(
                        'Error fetching projects: ',
                        error.response?.data.message,
                    )
                }
            })
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return { projects, setProjects, fetchProjects }
}

export const useDeleteProject = (
    setProjects: React.Dispatch<React.SetStateAction<ProjectData[]>>,
) => {
    const [showModal, setShowModal] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [deleteToastOpen, setDeleteToastOpen] = useState(false)
    const [deleteToastSeverity, setDeleteToastSeverity] = useState<
        'success' | 'error'
    >('success')
    const [deleteToastMessage, setDeleteToastMessage] = useState('')

    const handleOpenModal = (projectId: string) => {
        setProjectToDelete(projectId)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setProjectToDelete(null)
    }

    const handleDelete = () => {
        if (projectToDelete === null) return

        AxiosInstance.delete(`/project/${projectToDelete}`)
            .then(() => {
                setProjects((prevProjects) =>
                    prevProjects.filter(
                        (project) => project._id !== projectToDelete,
                    ),
                )
                handleCloseModal()
            })
            .catch((error: unknown) => {
                if (error instanceof AxiosError) {
                    setDeleteToastOpen(true)
                    setDeleteToastMessage('Error occurred while deleting user.')
                    setDeleteToastSeverity('error')
                }
            })
    }
    return {
        handleOpenModal,
        handleCloseModal,
        handleDelete,
        showModal,
        deleteToastOpen,
        deleteToastSeverity,
        deleteToastMessage,
    }
}

export const useCreateProject = () => {
    const [description, setDescription] = useState('')
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )
    const [openDrawer, setOpenDrawer] = useState(false)
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [status, setStatus] = useState('')
    const [projectManager, setProjectManager] = useState('')
    const [teamMembers, setTeamMembers] = useState<string[]>([])

    const handleDecriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleOpenDrawer = () => {
        setOpenDrawer(true)
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false)
    }

    const handleCloseToast = () => {
        setToastOpen(false)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value)
    }

    const handleStatusChange = (value: string | string[]) => {
        setStatus(value as string)
    }

    const handleProjectManagerChange = (value: string | string[]) => {
        setProjectManager(value as string)
    }

    const handleTeamMembersChange = (value: string | string[]) => {
        setTeamMembers(value as string[])
    }

    const handleCreateProject = async () => {
        try {
            const res = await AxiosInstance.post('/project', {
                name,
                startDate,
                description,
                status,
                projectManager,
                teamMembers,
            })
            setToastMessage('Project created successfully')
            setToastOpen(true)
            setToastSeverity('success')
            setDescription('')
            setName('')
            setStartDate('')
            setTeamMembers([])
            setProjectManager('')
            setStartDate('')
            setStatus('')
            setOpenDrawer(false)

            return res.data
        } catch (error) {
            console.error('Error creating project:', error)
            setToastMessage('Error creating Project')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }
    return {
        handleCreateProject,
        handleDecriptionChange,
        handleNameChange,
        handleStartDateChange,
        handleStatusChange,
        handleProjectManagerChange,
        handleTeamMembersChange,
        handleOpenDrawer,
        handleCloseDrawer,
        openDrawer,
        handleCloseToast,
        toastOpen,
        toastMessage,
        toastSeverity,
        projectManager,
        name,
        startDate,
        status,
        teamMembers,
        description,
    }
}
