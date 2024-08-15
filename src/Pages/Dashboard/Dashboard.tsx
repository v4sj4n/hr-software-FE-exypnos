import { useAuth } from '@/Context/AuthProvider.tsx'
import Card1 from '../../Components/Card/Card.tsx'
import style from '../Dashboard/style/dashboard.module.css'
import Calendar from './components/calendar.tsx'
import Card from './components/card.tsx'
import InfoSection from './components/infoSection.tsx'
import PieChartComponent from './components/piechart.tsx'
import { DashboardProvider, useDashboardContext } from './context/hook.tsx'
import { greeter } from '@/Helpers/Greeter.tsx'

const DashboardContent: React.FC = () => {
  const { employeeData } = useDashboardContext()
  greeter()

  const data = [
    { name: 'Present', value: employeeData.present },
    { name: 'Absent', value: employeeData.absent },
    { name: 'On Leave', value: employeeData.onLeave },
    { name: 'Remote', value: employeeData.remote },
  ]
  const { currentUser } = useAuth()
  const userName = currentUser ? currentUser.firstName : 'User'
  const isAdmin = currentUser?.role === 'admin'

  return (
    <div className={style.dashboardContainer}>
      <div className={style.mainContent}>
        <div className={style.rightContent}>
          <div className={style.welcome}>
            <h2>
              {greeter()} {userName}!
            </h2>
            {isAdmin ? <p>Here's what's happening with your team today</p> : ''}
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
            <Card1 padding="20px" borderRadius="15px" flex="1">
              <h3>Calendar</h3>
              <Calendar />
            </Card1>
            <Card1 padding="20px" borderRadius="15px" flex="1">
              <div className={style.infoSection}>
                <InfoSection />
              </div>
            </Card1>
            <Card1 padding="20px" borderRadius="15px" flex="1">
              <div className={style.pieChartDiv}>
                <h3>Employee Status</h3>
                <PieChartComponent data={data} />
              </div>
            </Card1>
          </div>
          <div className={style.employeeProfile}>
            <h3>Employee Profiles</h3>
          </div>
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
