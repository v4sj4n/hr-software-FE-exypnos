import { useState } from "react"
import { StructureContext } from "../Interface/Index"
import AxiosInstance from "@/Helpers/Axios"

export const StructureProvider: React.FC<{children: any}> = ({children}) => {
    const [description, setDescription] = useState('')
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success')
    const [openDrawer, setOpenDrawer] = useState(false)
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [status, setStatus] = useState('')
    const [projectManager, setProjectManager] = useState('')
    const [teamMembers, setTeamMembers] = useState<string[]>([]) 
    const statusOptions = ['in_progress', 'completed', 'planed']

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
        setStatus(value as string);
      };
      
      const handleProjectManagerChange = (value: string | string[]) => {
        setProjectManager(value as string);
      };

      const handleTeamMembersChange = (value: string | string[]) => {
        setTeamMembers(value as string[]);
      };

    const handleCreateProject = async() => {
        try {
            const res = await AxiosInstance.post('/project', {
                name,
                startDate,
                description,
                status,
                projectManager,
                teamMembers
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


   const contextValue = {
    handleDecriptionChange,
    description,
    handleCloseDrawer,
    handleCloseToast,
    handleOpenDrawer,
    openDrawer,
    toastOpen,
    toastMessage,
    toastSeverity,
    setToastOpen,
    setToastMessage,
    setToastSeverity,
    handleCreateProject,
    handleTeamMembersChange,
    handleProjectManagerChange,
    handleNameChange,
    handleStartDateChange,
    handleStatusChange,
    name,
    startDate,
    status, 
    projectManager,
    statusOptions,
    teamMembers,
   }

    return (
        <StructureContext.Provider value={contextValue}>
            {children}
        </StructureContext.Provider>
    )
}