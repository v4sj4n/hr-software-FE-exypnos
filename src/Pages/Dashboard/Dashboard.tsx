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
import { Loader } from '@/Components/Loader/Loader.tsx'
import { Card as JoyCard, Stack, Typography } from '@mui/joy'

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
    if (isLoading)
        return (
            <p>
                <Loader />
            </p>
        )
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
                            className={`flex justify-between items-center w-full ${style.welcome} ${animateOnLogin ? style.animate : ''} `}
                        >
                            <div className="flex-1">
                                <Typography color="primary" level="h2">
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
                                </Typography>
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
                        <div>
                            <Card
                                title="All"
                                content={String(employeeData.all)}
                                icon="All"
                            />
                        </div>
                        <div>
                            <Card
                                title="Present "
                                content={String(employeeData.present)}
                                icon="Present"
                            />
                        </div>

                        <div>
                            <Card
                                title=" On Leave"
                                content={String(employeeData.onLeave)}
                                icon="On Leave"
                            />
                        </div>
                        <div>
                            <Card
                                title="Remote
                                "
                                content={String(employeeData.remote)}
                                icon="Remote"
                            />
                        </div>
                    </div>

                    <Stack direction="row" spacing={2.0}>
                        <JoyCard
                            className="flex-1"
                        >
                            <Notes />
                        </JoyCard>
                        <JoyCard className="flex-[2]">
                            <InfoSection />
                        </JoyCard>

                        <JoyCard className="flex-1">
                            <PieChartComponent />
                        </JoyCard>
                    </Stack>

                    <JoyCard className="mt-5">
                        <EmployeeSection />
                    </JoyCard>
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
