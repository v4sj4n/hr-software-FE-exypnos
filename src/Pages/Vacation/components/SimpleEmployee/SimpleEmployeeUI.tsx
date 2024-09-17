import Card from '@/Components/Card/Card'
import style from './styles/simpleEmployeeUi.module.scss'
import { useGetMyVacations } from '../../Hook'
import { Calendar } from './components/Calendar'
import { UpcomingVacations } from './components/UpcomingVacations'

export default function SimpleEmployeeUI() {
    const { data } = useGetMyVacations()
    const vacations = data?.data.vacations || []
    console.log('Data:', data)
    console.log('Vacations:', vacations)

    return (
        <div className={style.parentContainer}>
            <Card flex="1">
                <h2>Calendar</h2>
                <Calendar vacations={vacations} />
            </Card>
            <Card flex="3">
                <h2>Upcoming Vacations</h2>
                <UpcomingVacations vacations={vacations} />
            </Card>
        </div>
    )
}
