import { OrganizationChart } from 'primereact/organizationchart'
import styles from './style/structure.module.css'
import Card from '@/Components/Card/Card'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import AxiosInstance from '@/Helpers/Axios'
import image from '/public/Images/ceo1.jpeg'
import { Avatar } from '@mui/material'
import HrImage from '/public/Images/Hr.jpeg'
import { useQuery } from '@tanstack/react-query'
import { CustomTreeNode, ProjectData } from './Interface/Index'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Button from '@/Components/Button/Button'
import DrawerComponent from '@/Components/Drawer/Drawer'
import Input from '@/Components/Input/Index'
import Selecter from '@/Components/Input/components/Select/Selecter'
import { useGetAllUsers } from '../Employees/Hook'
import CloseIcon from '@mui/icons-material/Close'
import Toast from '@/Components/Toast/Toast'
import { useStructureContext } from './Context/StructureProvider'
import { StructureProvider } from './Context/StruxtureContext'

function StructureContent() {
    const { data, isLoading, error } = useQuery<ProjectData[], Error>({
        queryKey: ['projects'],
        queryFn: async () => {
            const response =
                await AxiosInstance.get<ProjectData[]>('/project/structure')
            return response.data
        },
    })

    const transformProjectData = (
        projects: ProjectData[],
    ): CustomTreeNode[] => {
        const rootNode: CustomTreeNode = {
            expanded: true,
            type: 'person',
            className: styles.bgIndigo500,
            data: {
                name: 'Pasho Toska',
                image: image,
                title: 'CEO',
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: styles.bgPurple500,
                    data: {
                        name: 'Elisabeta Guri',
                        image: HrImage,
                        title: 'HR',
                    },
                },
                ...projects.map((project) => ({
                    expanded: true,
                    type: 'person',
                    className: styles.bgPurple500,
                    data: {
                        name: `${project.projectManager.firstName} ${project.projectManager.lastName}`,
                        title: project.name,
                        teamMembers: project.teamMembers,
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'team',
                            className: styles.bgTeal500,
                            data: {
                                teamMembers: project.teamMembers,
                            },
                        },
                    ],
                })),
            ],
        }

        return [rootNode]
    }

    const nodeTemplate = (node: CustomTreeNode) => {
        if (node.type === 'person') {
            return (
                <div className={styles.flexColumn}>
                    <div
                        className={`${styles.flexColumn} ${styles.alignItemsCenter}`}
                    >
                        {node.data.image && (
                            <Avatar
                                src={node.data.image}
                                alt={node.data.name}
                                sx={{ width: 40, height: 40, mb: 1 }}
                            />
                        )}
                        <span className={styles.nodeName}>
                            {node.data.title}
                        </span>
                        <span style={{ fontSize: '12px' }}>
                            {node.data.name}
                        </span>
                    </div>
                </div>
            )
        } else if (node.type === 'team') {
            return (
                <div className={styles.flexColumn}>
                    <div className={styles.alignItemsCenter}>
                        <strong style={{ fontSize: '14px' }}>
                            Team Members:
                        </strong>
                        <ul className={styles.verticalList}>
                            {node.data.teamMembers?.map((member, index) => (
                                <li
                                    key={index}
                                >{`${member.firstName} ${member.lastName}`}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return node.label
    }

    const transformedData = data ? transformProjectData(data) : []

    const {  handleDecriptionChange,
        description,
        handleCloseDrawer,
        handleCloseToast,
        handleOpenDrawer,
        openDrawer,
        toastOpen,
        toastMessage,
        toastSeverity,
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
        teamMembers,
        statusOptions,
    } = useStructureContext()
    
    const { data: users = [] } = useGetAllUsers()
    const TeamMembers = users.map((user) => user._id)

    return (
        <div className={styles.container}>
             <Toast
                severity={toastSeverity}
                open={toastOpen}
                message={toastMessage}
                onClose={handleCloseToast}
            />
            <div className={styles.search}>
            <Button onClick={handleOpenDrawer} btnText='Add Project' type={ButtonTypes.PRIMARY}/>
            </div>
            <DrawerComponent open={openDrawer} onClose={handleCloseDrawer}>
                <div className={styles.create}>
                   Create New Project
                   <CloseIcon
                        onClick={handleCloseDrawer}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                 <Input IsUsername name='name' onChange={handleNameChange} value={name}  label='Project Name'/>
                 <Input IsUsername name='startDate' label='Start date' shrink={true}  type="datetime-local" onChange={handleStartDateChange} value={startDate}/>
                 <Input IsUsername name='description' label='Description' type='textarea' rows={3} multiline={true} onChange={handleDecriptionChange} value={description} />
                 <Selecter name='status' label='Status' options={statusOptions} onChange={handleStatusChange} multiple={false} value={status}/>
                 <Selecter name='projectManager' label='Project Manager' multiple={false} onChange={handleProjectManagerChange} value={projectManager} options={TeamMembers}/>
                 <Selecter name='teamMembers' label='Team Members' onChange={handleTeamMembersChange} value={teamMembers} multiple options={TeamMembers}/>
                 <Button type={ButtonTypes.PRIMARY} btnText='Create' onClick={handleCreateProject}  />
            </DrawerComponent>
            <Card borderRadius="5px" padding="32px" border="1px solid #ebebeb" height='400px' overflow='auto'>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error.message}</div>
                ) : (
                    <div className={styles.organizationChart}>
                        <OrganizationChart
                            value={transformedData}
                            nodeTemplate={nodeTemplate}
                        />
                    </div>
                )}
            </Card>
        </div>
    )
}


const Structure: React.FC = () => {
    return (
        <StructureProvider>
            <StructureContent />
        </StructureProvider>
    )
}

export default Structure