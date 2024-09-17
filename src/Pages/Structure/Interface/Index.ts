import { TreeNode } from 'primereact/treenode'
import React, { ChangeEvent } from 'react'

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
        title?: string
        teamMembers?: Array<{ firstName: string; lastName: string }>
        image?: string
    }
    children?: CustomTreeNode[]
}


export interface StructureContextTypes  {
    handleOpenDrawer: () => void
    handleCloseDrawer: () => void
    handleCloseToast: () => void
    openDrawer: boolean
    handleDecriptionChange:  (e: React.ChangeEvent<HTMLInputElement>) => void
    handleStatusChange:(e: React.ChangeEvent<HTMLInputElement>) => void
    handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleProjectManagerChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleTeamMembersChange: (teamMembers: string[]) => void
    name: string
    description: string
    startDate: string
    status: string
    projectManager: string
    teamMembers: string[]
    toastOpen: boolean
    toastMessage: string
    toastSeverity: 'success' | 'error' 
    statusOptions: string[]
    handleCreateProject: (e: React.FormEvent<HTMLFormElement>) => void
}



export const StructureContext = React.createContext<
StructureContextTypes | undefined
>(undefined)