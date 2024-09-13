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

export default function ColoredDemo() {
    const { data, isLoading, error } = useQuery<ProjectData[], Error>({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await AxiosInstance.get<ProjectData[]>('/project/structure')
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
                        title: 'Project Manager',
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
                            {node.data.name}
                        </span>
                        <span style={{ fontSize: '12px' }}>
                            {node.data.title}
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

    return (
        <div className={styles.container}>
            <Card borderRadius="5px" padding="32px" border="1px solid #ebebeb">
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