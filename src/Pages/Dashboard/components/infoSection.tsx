import style from '../style/infoSection.module.css'
import { EventsData } from '../../Events/Interface/Events'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { EventsProvider } from '@/Pages/Events/Context/EventsProvider'
import { useEvents } from '@/Pages/Events/Context/EventsContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { Typography } from '@mui/joy'
const InfoSectionContent = () => {
    const { currentUser } = useAuth()
    const id = currentUser?._id

    const fetchEventsDashboard = async () => {
        const response = await AxiosInstance.get(`/event/user/${id}`)

        console.log('Fetched eventsDahboardddd:', response.data)
        return response.data
    }

    const { data: events } = useQuery({
        queryKey: ['event'],
        queryFn: () => fetchEventsDashboard(),
    })

    console.log('events', events)
    const { formatDate } = useEvents()
    const navigate = useNavigate()
    return (
        <div className={style.infoSection}>
            <Typography level="h3" color="primary" gutterBottom>
                Upcoming Events
            </Typography>

            <ul className="p-0">
                {events?.slice(0, 4).map((event: EventsData) => (
                    <li className={style.eventContainer} key={event._id}>
                        <span className={style.blueDot}></span>
                        <div className={style.eventData}>
                            <div className="flex justify-between items-center w-full">
                                <Typography
                                    level="h4"
                                    color="primary"
                                    onClick={() =>
                                        navigate(`/events?event=${event._id}`)
                                    }
                                    className="pointer"
                                >
                                    {event.title}
                                </Typography>
                                <Typography>
                                    {formatDate(event.startDate)}
                                </Typography>
                            </div>

                            <Typography
                                color="neutral"
                                className={style.description}
                            >
                                {event.description}
                            </Typography>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const InfoSection: React.FC = () => {
    return (
        <EventsProvider>
            <InfoSectionContent />
        </EventsProvider>
    )
}

export default InfoSection
