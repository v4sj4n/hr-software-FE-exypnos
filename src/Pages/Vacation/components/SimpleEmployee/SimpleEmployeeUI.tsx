import Card from '@/Components/Card/Card'
import style from './styles/simpleEmployeeUi.module.scss'
import { useGetMyVacations } from '../../Hook'
import { Calendar } from './components/Calendar'

export default function SimpleEmployeeUI() {
    const { data } = useGetMyVacations()
    const vacations = data?.data.vacations || []
    console.log('Data:', data)
    console.log('Vacations:', vacations)

    return (
        <div className={style.parentContainer}>
            <Card flex="1">
                <h3>Calendar</h3>
                <Calendar vacations={vacations} />
            </Card>
            <Card flex="1">
                <h3>Upcoming Vacations</h3>
            </Card>
        </div>
    )
}
