import Card1 from '../../Components/Card/Card.tsx'
import style from '../Dashboard/style/dashboard.module.css'
import Calendar from './components/calendar.tsx'
import Card from './components/card.tsx'
import InfoSection from './components/infoSection.tsx'
import PieChartComponent from './components/piechart.tsx'
import { DashboardProvider, useDashboardContext } from './context/hook.tsx'
import { greeter } from '@/Helpers/Greeter.tsx'
import { useNavigate } from 'react-router-dom'
import EmployeeSection from './components/employeeSection.tsx'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext.tsx'
import Button from '@/Components/Button/Button.tsx'
import { ButtonTypes } from '@/Components/Button/ButtonTypes.tsx'
import { ModalComponent } from '@/Components/Modal/Modal.tsx'
import { useState } from 'react'

const DashboardContent: React.FC = () => {
    const { employeeData } = useDashboardContext()
    greeter()

    const { currentUser } = useAuth()
    const userName = currentUser ? currentUser.firstName : 'User'
    const isAdmin = currentUser?.role === 'hr'
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleNavigateToProfile = () => {
        if (currentUser) {
            navigate(`/profile/${currentUser._id}`)
        }
    }
    const navigate = useNavigate()

    return (
        <div className={style.dashboardContainer}>
            <div className={style.mainContent}>
                <div className={style.rightContent}>
                    <div className={style.welcome}>
                        <h2>
                            {greeter()}{' '}
                            <span
                                onClick={handleNavigateToProfile}
                                className={style.userNameClickable}
                             style={{ cursor: 'pointer' ,transform: 'scale(1.1)'  }}  
                            >
                                {userName}
                            </span>
                            !
                        </h2>
                        {isAdmin ? (
                            <p>Here's what's happening with your team today</p>
                        ) : (
                            ' Let’s achieve your goals today! '
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <h2>Notes</h2>
                                <Button
                                    btnText="Show all notes"
                                    type={ButtonTypes.SECONDARY}
                                    border={'none'}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                            <Calendar />

                            <ModalComponent
                                open={isModalOpen}
                                handleClose={() => setIsModalOpen(false)}
                            >
                                <h3>All notes</h3>
                            </ModalComponent>
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
                            <h2>Employ Status</h2>
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
