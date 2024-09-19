import { Vacation } from '@/Pages/Vacation/types'
import { Start, KeyboardTab } from '@mui/icons-material'
import dayjs from 'dayjs'
import style from '../styles/upcomingVacation.module.scss'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'
import { TitleCaser } from '@/Helpers/TitleCaser'

export const UpcomingVacations = ({ vacations }: { vacations: Vacation[] }) => {
    return (
        <div className={style.vacationsContainer}>
            {vacations.map(({ _id, endDate, startDate, status, type }) => {
                return (
                    <div className={style.vacationContainer} key={_id}>
                        <div>
                            <p>
                                <StatusBadge
                                    color={
                                        status === 'pending'
                                            ? 'orange'
                                            : status === 'accepted'
                                              ? 'green'
                                              : 'red'
                                    }
                                    status={TitleCaser(status)}
                                    key={_id}
                                />
                            </p>
                            <p>{TitleCaser(type)}</p>
                        </div>
                        <div className={style.datesContainer}>
                            <p>
                                <TooltipImproved
                                    children={<Start />}
                                    text="Starting date"
                                />
                                {dayjs(startDate).format('MMMM Do, YYYY')}
                            </p>
                            <p>
                                {dayjs(endDate).format('MMMM Do, YYYY')}
                                <TooltipImproved
                                    children={<KeyboardTab />}
                                    text="Ending date"
                                />
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
