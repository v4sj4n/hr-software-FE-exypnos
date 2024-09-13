import { useAuth } from '@/Context/AuthProvider.tsx'
import Card1 from '../../Components/Card/Card.tsx'
import style from '../Dashboard/style/dashboard.module.css'
import Calendar from './components/calendar.tsx'
import Card from './components/card.tsx'
import InfoSection from './components/infoSection.tsx'
import PieChartComponent from './components/piechart.tsx'
import { DashboardProvider, useDashboardContext } from './context/hook.tsx'
import { greeter } from '@/Helpers/Greeter.tsx'
import { UserProfileData } from '../Employees/interfaces/Employe.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/Helpers/Axios.tsx'
import { useNavigate } from 'react-router-dom'

const DashboardContent: React.FC = () => {
    const { employeeData } = useDashboardContext()
    greeter()

    const { currentUser } = useAuth()
    const userName = currentUser ? currentUser.firstName : 'User'
    const isAdmin = currentUser?.role === 'hr'

    const fetchUserProfile = async () => {
        const response = await AxiosInstance.get('/user')
        console.log('Fetched user profile:', response.data)
        return response.data
    }

    const { data: UserProfileData } = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
    })

    console.log('UserProfileData', UserProfileData)
    const navigate = useNavigate()
    return (
        <div className={style.dashboardContainer}>
            <div className={style.mainContent}>
                <div className={style.rightContent}>
                    <div className={style.welcome}>
                        <h2>
                            {greeter()} {userName}!
                        </h2>
                        {isAdmin ? (
                            <p>Here's what's happening with your team today</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={style.cardContainer}>
                        <div className={style.cardGreen}>
                            <Card
                                title="Present"
                                content={employeeData.present.toString()}
                                icon="Present"
                            />
                        </div>
                        <div className={style.cardBlue}>
                            <Card
                                title="Absent"
                                content={employeeData.absent.toString()}
                                icon="Absent"
                            />
                        </div>
                        <div className={style.cardYellow}>
                            <Card
                                title="On Leave"
                                content={employeeData.onLeave.toString()}
                                icon="On Leave"
                            />
                        </div>
                        <div className={style.cardPurple}>
                            <Card
                                title="Remote"
                                content={employeeData.remote.toString()}
                                icon="Remote"
                            />
                        </div>
                    </div>
                    <div className={style.middleRow}>
                        <Card1
                            padding="20px"
                            borderRadius="15px"
                            flex="1"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <h2 style={{ justifyContent: 'flex-start' }}>
                                Calendar
                            </h2>
                            <Calendar />
                        </Card1>
                        <Card1
                            padding="20px"
                            borderRadius="15px"
                            flex="2"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <InfoSection />
                        </Card1>
                        <Card1
                            padding="20px"
                            borderRadius="15px"
                            flex="2"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <h2>Employee Status</h2>
                            <PieChartComponent />
                        </Card1>
                    </div>
                    <Card1
                        backgroundColor="rgba(255, 255, 255, 0.7)"
                        padding="20px"
                        border="15px"
                        marginTop="20px"
                        borderRadius="15px"
                        flex="1"
                    >
                        <h2>Team</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {UserProfileData?.map(
                                (employee: UserProfileData) => (
                                    <div
                                        key={employee._id}
                                        style={{
                                            margin: '10px',
                                            padding: '10px',
                                            backgroundColor: 'transparent',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <img
                                            src={employee.imageUrl}
                                            alt={`${employee.firstName} ${employee.lastName}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/profile/${employee._id}`,
                                                )
                                            }
                                        />
                                        <p>
                                            {employee.firstName}{' '}
                                            {employee.lastName}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </Card1>
                </div>
            </div>
        </div>
    )
}

const Dashboard: React.FC = () => {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    )
}

export default Dashboard
