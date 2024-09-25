import Card1 from '../../Components/Card/Card.tsx'
import style from '../Dashboard/style/dashboard.module.css'
import Card from './components/card.tsx'
import InfoSection from './components/infoSection.tsx'
import PieChartComponent from './components/piechart.tsx'
import { DashboardProvider, useDashboardContext } from './context/hook.tsx'
import { greeter } from '@/Helpers/Greeter.tsx'
import { useNavigate } from 'react-router-dom'
import EmployeeSection from './components/employeeSection.tsx'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext.tsx'
import { useEffect, useState } from 'react'
import Weather from './components/Weather.tsx'
import { Notes } from './components/notes.tsx'

const DashboardContent: React.FC = () => {
    const { employeeData, isLoading, error } = useDashboardContext()
    greeter()
    const navigate = useNavigate()

    const [animateOnLogin, setAnimateOnLogin] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimateOnLogin(false)
        }, 10000)

        return () => clearTimeout(timeout)
    }, [])

    const { currentUser } = useAuth()
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    const userName = currentUser ? currentUser.firstName : 'User'
    const isAdmin = currentUser?.role === 'hr'

    const handleNavigateToProfile = () => {
        if (currentUser) {
            navigate(`/profile/${currentUser._id}`)
        }
    }

    return (
        <div className={style.dashboardContainer}>
            <div className={style.mainContent}>
                <div className={style.rightContent}>
                    <div className={style.welcomeContainer}>
                        <div
                            className={`${style.welcome} ${animateOnLogin ? style.animate : ''}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <h1>
                                    {greeter()}{' '}
                                    <span
                                        onClick={handleNavigateToProfile}
                                        className={style.userNameClickable}
                                        style={{
                                            cursor: 'pointer',
                                            transform: 'scale(1.1)',
                                        }}
                                    >
                                        {userName}
                                    </span>
                                    !
                                </h1>
                                {isAdmin ? (
                                    <p>
                                        Here's what's happening with your team
                                        today
                                    </p>
                                ) : (
                                    <p>Let’s achieve your goals today!</p>
                                )}
                            </div>
                            <div style={{ flex: 'none' }}>
                                <Weather />
                            </div>
                        </div>
                    </div>

                    <div className={style.cardContainer}>
                        <div className={style.cardBlue}>
                            <Card
                                title="All"
                                content={String(employeeData.all)}
                                icon="All"
                            />
                        </div>
                        <div className={style.cardGreen}>
                            <Card
                                title="Present "
                                content={String(employeeData.present)}
                                icon="Present"
                            />
                        </div>

                        <div className={style.cardYellow}>
                            <Card
                                title=" On Leave"
                                content={String(employeeData.onLeave)}
                                icon="On Leave"
                            />
                        </div>
                        <div className={style.cardPurple}>
                            <Card
                                title="Remote
                                "
                                content={String(employeeData.remote)}
                                icon="Remote"
                            />
                        </div>
                    </div>

                    <div className={style.middleRow}>
                        <Card1
                            padding="20px"
                            borderRadius="10px"
                            flex="0.8"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <Notes />
                        </Card1>
                        <Card1
                            padding="20px"
                            borderRadius="10px"
                            flex="1.2"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <InfoSection />
                        </Card1>

                        <Card1
                            borderRadius="10px"
                            flex="1"
                            padding="20px"
                            backgroundColor="rgba(255, 255, 255, 0.7)"
                        >
                            <h2>Employee Status</h2>
                            <PieChartComponent />
                        </Card1>
                    </div>
                    <Card1
                        backgroundColor="rgba(255, 255, 255, 0.7)"
                        border="15px"
                        marginTop="20px"
                        borderRadius="10px"
                        flex="1"
                    >
                        <EmployeeSection />
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
