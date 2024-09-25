import { OrganizationChart } from 'primereact/organizationchart'
import styles from './style/structure.module.css'
import Card from '@/Components/Card/Card'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import image from '/public/Images/ceo1.jpeg'
import { Avatar } from '@mui/material'
import HrImage from '/public/Images/Hr.jpeg'
import { CustomTreeNode, ProjectData } from './Interface/Index'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Button from '@/Components/Button/Button'
import DrawerComponent from '@/Components/Drawer/Drawer'
import Input from '@/Components/Input/Index'
import Selecter from '@/Components/Input/components/Select/Selecter'
import { useGetAllUsers } from '../Employees/Hook'
import CloseIcon from '@mui/icons-material/Close'
import Toast from '@/Components/Toast/Toast'
import { useCreateProject, useDeleteProject, useGetProject } from './Hook/Index'
import { ModalComponent } from '@/Components/Modal/Modal'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

function Structure() {
    const { projects, setProjects,fetchProjects } = useGetProject()
    const {currentUser } = useAuth()
    const hrOrAmin = currentUser?.role === 'hr' || currentUser?.role === 'admin' || currentUser?.role === 'pm'

    const transformProjectData = (
        projects: ProjectData[],
        handleOpenModal: (projectId: string) => void,
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
                        title: (
                            <>
                                {project.name}{' '}
                                <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleOpenModal(project._id)}
                                />
                            </>
                        ),
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

    const { handleOpenModal, handleCloseModal, handleDelete, showModal } =
        useDeleteProject(setProjects)
    const {
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
    } = useCreateProject()

    const handleCreateAndUpdateUI = async () => {
        const newProject = await handleCreateProject()
        if (newProject) {
           fetchProjects()
        }
    }

    const transformedData =
        projects && transformProjectData(projects, handleOpenModal)

    const { data: users = [] } = useGetAllUsers()
    const userOptions = users.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user._id.toString(),
    }))

    const statusOptions = ['in_progress', 'completed', 'planed']

    return (
        <div className={styles.container}>
            <Toast
                severity={toastSeverity}
                open={toastOpen}
                message={toastMessage}
                onClose={handleCloseToast}
            />
           { hrOrAmin && <div className={styles.search}>
                <Button
                    onClick={handleOpenDrawer}
                    btnText="Add Project"
                    type={ButtonTypes.PRIMARY}
                />
            </div>}
            <DrawerComponent open={openDrawer} onClose={handleCloseDrawer}>
                <div className={styles.create}>
                    Create New Project
                    <CloseIcon
                        onClick={handleCloseDrawer}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <Input
                    IsUsername
                    name="name"
                    onChange={handleNameChange}
                    value={name}
                    label="Project Name"
                />
                <Input
                    IsUsername
                    name="startDate"
                    label="Start date"
                    shrink={true}
                    type="date"
                    onChange={handleStartDateChange}
                    value={startDate}
                />
                <Input
                    IsUsername
                    name="description"
                    label="Description"
                    type="textarea"
                    rows={3}
                    multiline={true}
                    onChange={handleDecriptionChange}
                    value={description}
                />
                <Selecter
                    disabled={false}
                    width="100%"
                    name="status"
                    label="Status"
                    options={statusOptions}
                    onChange={handleStatusChange}
                    multiple={false}
                    value={status}
                />
                <Selecter
                    disabled={false}
                    width="100%"
                    name="projectManager"
                    label="Project Manager"
                    multiple={false}
                    onChange={handleProjectManagerChange}
                    value={projectManager}
                    options={userOptions}
                />
                <Selecter
                    disabled={false}
                    width="100%"
                    name="teamMembers"
                    label="Team Members"
                    onChange={handleTeamMembersChange}
                    value={teamMembers}
                    multiple
                    options={userOptions}
                />
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Create"
                    onClick={handleCreateAndUpdateUI}
                />
            </DrawerComponent>
            <Card
                borderRadius="5px"
                padding="32px"
                border="1px solid #ebebeb"
                height="400px"
                overflow="auto"
            >
                <div className={styles.organizationChart}>
                    <OrganizationChart
                        value={transformedData}
                        nodeTemplate={nodeTemplate}
                    />
                </div>
            </Card>
            {showModal && (
                <ModalComponent open={showModal} handleClose={handleCloseModal}>
                    <div className={styles.modal}>
                        <div className={styles.title}>Confirm Action.</div>
                        <div>
                            {' '}
                            Are you sure you want to delete this project?
                        </div>
                        <div className={styles.modalCnt}>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                backgroundColor="#D32F2F"
                                borderColor="#D32F2F"
                                btnText="Confirm"
                                width="100%"
                                onClick={() => {
                                    handleDelete()
                                    handleCloseModal()
                                }}
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Cancel"
                                width="100%"
                                onClick={handleCloseModal}
                            />
                        </div>
                    </div>
                </ModalComponent>
            )}
        </div>
    )
}

export default Structure
