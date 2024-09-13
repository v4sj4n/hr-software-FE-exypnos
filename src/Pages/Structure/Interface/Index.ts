import { TreeNode } from 'primereact/treenode'

export interface ProjectData {
    _id: string
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