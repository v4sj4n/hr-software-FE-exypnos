import { TreeNode } from 'primereact/treenode'
import React, { ReactNode } from 'react'

export interface ProjectData {
    _id: string
    name: string
    projectManager: {
        _id: string
        firstName: string
        lastName: string
    }
    teamMembers: Array<{
        _id: string
        firstName: string
        lastName: string
    }>
}

export interface CustomTreeNode extends TreeNode {
    type?: string
    data: {
        name?: string
        title?: string | ReactNode;
        teamMembers?: Array<{ firstName: string; lastName: string }>
        image?: string
        projectId?: string;  
    }
    children?: CustomTreeNode[]
}

export interface StructureContextTypes {
    handleDecriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    description: string
    handleCloseDrawer: () => void
    handleCloseToast: () => void
    handleOpenDrawer: () => void
    openDrawer: boolean
    toastOpen: boolean
    toastMessage: string
    toastSeverity: 'success' | 'error'
    setToastOpen: React.Dispatch<React.SetStateAction<boolean>>
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
    setToastSeverity: React.Dispatch<React.SetStateAction<'success' | 'error'>>
    handleCreateProject: () => Promise<any>
    handleTeamMembersChange: (value: string | string[]) => void
    handleProjectManagerChange: (value: string | string[]) => void
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleStatusChange: (value: string | string[]) => void
    name: string
    startDate: string
    status: string
    projectManager: string
    teamMembers: string[]
}

export const StructureContext = React.createContext<
    StructureContextTypes | undefined
>(undefined)
